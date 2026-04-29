import { supabase } from './supabaseClient';

// Bu obyekt köhnə `mockDbInline.js`-in tam əvəzedicisidir.
// Bütün React komponentləri eyni köhnə `db.entities.Sifaris.create()` məntiqi ilə işləyəcək,
// lakin arxa planda real Supabase verilənlər bazasına qoşulacaq.

const buildMethods = (entityName) => ({
  list: async () => {
    const { data, error } = await supabase
      .from('app_data')
      .select('*')
      .eq('entity_type', entityName)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error(`[Supabase] ${entityName} list error:`, error);
      return [];
    }
    
    // JSONB strukturundan birbaşa Obyektlərə çeviririk
    return data.map(row => ({ id: row.id, ...row.data, created_date: row.created_at }));
  },
  
  get: async (id) => {
    const { data, error } = await supabase
      .from('app_data')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error || !data) return null;
    return { id: data.id, ...data.data, created_date: data.created_at };
  },
  
  filter: async (filters) => {
    // Çox bəsit filter imitasiyası
    const all = await buildMethods(entityName).list();
    return all.filter(item => {
      let matches = true;
      for (const key in filters) {
        if (item[key] !== filters[key]) matches = false;
      }
      return matches;
    });
  },
  
  create: async (dataObj) => {
    const { data, error } = await supabase
      .from('app_data')
      .insert({
        entity_type: entityName,
        data: dataObj
      })
      .select()
      .single();
      
    if (error) throw error;
    return { id: data.id, ...data.data, created_date: data.created_at };
  },
  
  update: async (id, dataObj) => {
    // Mövcud datanı tapıb üstünə yazırıq
    const current = await buildMethods(entityName).get(id);
    if (!current) throw new Error("Entity not found");
    
    const mergedData = { ...current };
    delete mergedData.id;
    delete mergedData.created_date;
    const newData = { ...mergedData, ...dataObj };
    
    const { data, error } = await supabase
      .from('app_data')
      .update({ data: newData })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { id: data.id, ...data.data, created_date: data.created_at };
  },
  
  delete: async (id) => {
    const { error } = await supabase
      .from('app_data')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { success: true };
  }
});

const entitiesProxy = new Proxy({}, {
  get: function(target, prop) {
    if (typeof prop !== 'string' || prop === 'then') return undefined;
    return buildMethods(prop);
  }
});

// Authentication Adapter (Supabase Auth ilə inteqrasiya)
const authAdapter = {
  isAuthenticated: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },
  me: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    // İstifadəçinin sistemdəki (app_data) məlumatını tap
    const { data } = await supabase
      .from('app_data')
      .select('*')
      .eq('entity_type', 'DavetEdilmisIstifadeci')
      .eq('data->>email', user.email)
      .single();
      
    if (data) {
      return { id: user.id, ...data.data, email: user.email };
    }
    
    // Əgər tapılmasa (məsələn ilk qurucudursa)
    return { id: user.id, email: user.email, full_name: user.user_metadata?.full_name || 'Admin', role: 'Super Admin' };
  },
  logout: async () => {
    await supabase.auth.signOut();
    window.location.reload();
  },
  redirectToLogin: () => {
    window.location.href = '/';
  }
};

const usersAdapter = {
  inviteUser: async (email, role) => {
    // Supabase Auth invite (Admin xüsusiyyəti tələb edir, ona görə default şifrə ilə qeydiyyat da edilə bilər)
    // Sadəlik üçün: Vercel-də birbaşa signUp istifadə edirik ki real email getsin.
    // Əgər istifadəçi mövcuddursa bu xəta verəcək, amma problem deyil.
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: "GmsUser2026!" // Müvəqqəti şifrə
    });
    
    if (error && !error.message.includes('already registered')) {
      console.error("Invite error:", error);
      throw error;
    }
    return true;
  }
};

export const SupabaseDB = {
  auth: authAdapter,
  users: usersAdapter,
  entities: entitiesProxy,
  asServiceRole: { entities: entitiesProxy },
  integrations: {
    Core: { 
      UploadFile: async () => { 
        // Gələcəkdə Supabase Storage-ə bağlana bilər
        return { file_url: '' }; 
      } 
    }
  }
};
