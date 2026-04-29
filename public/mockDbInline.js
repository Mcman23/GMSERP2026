// Bu fayl ES modullardan ƏVVƏL yüklənir (index.html-dəki normal <script> tagi ilə)
// Buna görə globalThis.__B44_DB__ bütün komponentlər üçün hazır olur
(function() {
  'use strict';

  var now = Date.now();
  function d(daysAgo) { return new Date(now - daysAgo * 86400000).toISOString(); }
  function fmt(daysAgo) { return d(daysAgo).slice(0, 10); }

  var MUSTERILER = [
    { id: 'm1', ad_soyad: 'Davəli MMC', telefon: '050-111-2233', email: 'daveli@mail.az', voen: '1234567890', unvan: 'Bakı, Nərimanov r.', edv_odeyicisi: true, status: 'Aktiv', created_date: d(120) },
    { id: 'm2', ad_soyad: 'ASBC Şirkəti', telefon: '055-222-3344', email: 'asbc@mail.az', voen: '1403779711', unvan: 'Bakı, Sabunçu r.', edv_odeyicisi: false, status: 'Aktiv', created_date: d(90) },
    { id: 'm3', ad_soyad: 'Elit Group', telefon: '070-333-4455', email: 'elit@mail.az', voen: '9988776655', unvan: 'Bakı, Xətai r.', edv_odeyicisi: true, status: 'Aktiv', created_date: d(60) },
    { id: 'm4', ad_soyad: 'Azər Tikinti', telefon: '077-444-5566', email: 'azer@mail.az', voen: '', unvan: 'Bakı, Binəqədi r.', edv_odeyicisi: false, status: 'Aktiv', created_date: d(45) },
  ];

  var SIFARISLER = [
    { id: 's1', sifaris_no: 'SIF-001', musteri_id: 'm1', musteri_adi: 'Davəli MMC', sirket: 'GMS (Ümumi)', xidmet_tipi: 'Ofis təmizliyi', unvan: 'Nərimanov 45', tarix: d(40), qiymet: 8000, edv_meblegi: 0, umumi_mebleg: 8000, odenis_statusu: 'Ödənilməyib', odenilmis_mebleg: 0, status: 'Tamamlandı', created_date: d(40) },
    { id: 's2', sifaris_no: 'SIF-002', musteri_id: 'm2', musteri_adi: 'ASBC Şirkəti', sirket: 'Mərməri', xidmet_tipi: 'Mərməri üzlük', unvan: 'Sabunçu 12', tarix: d(30), qiymet: 0, edv_meblegi: 0, umumi_mebleg: 0, odenis_statusu: 'Ödənilib', odenilmis_mebleg: 0, status: 'Tamamlandı', created_date: d(30) },
    { id: 's3', sifaris_no: 'SIF-003', musteri_id: 'm3', musteri_adi: 'Elit Group', sirket: 'Service Plus', xidmet_tipi: 'Texniki xidmət', unvan: 'Xətai 78', tarix: d(20), qiymet: 3500, edv_meblegi: 630, umumi_mebleg: 4130, odenis_statusu: 'Qismən ödənilib', odenilmis_mebleg: 2000, status: 'İcrada', created_date: d(20) },
    { id: 's4', sifaris_no: 'SIF-004', musteri_id: 'm4', musteri_adi: 'Azər Tikinti', sirket: 'GMS (Ümumi)', xidmet_tipi: 'Ev təmizliyi', unvan: 'Binəqədi 33', tarix: d(10), qiymet: 1200, edv_meblegi: 0, umumi_mebleg: 1200, odenis_statusu: 'Ödənilib', odenilmis_mebleg: 1200, status: 'Tamamlandı', created_date: d(10) },
    { id: 's5', sifaris_no: 'SIF-005', musteri_id: 'm1', musteri_adi: 'Davəli MMC', sirket: 'GMS (Ümumi)', xidmet_tipi: 'Ofis təmizliyi', unvan: 'Nərimanov 45', tarix: d(5), qiymet: 4000, edv_meblegi: 0, umumi_mebleg: 4000, odenis_statusu: 'Ödənilməyib', odenilmis_mebleg: 0, status: 'Yeni', created_date: d(5) },
    { id: 's6', sifaris_no: 'SIF-006', musteri_id: 'm3', musteri_adi: 'Elit Group', sirket: 'Qanbaroğlu', xidmet_tipi: 'Fasad işləri', unvan: 'Xətai 90', tarix: d(2), qiymet: 6000, edv_meblegi: 1080, umumi_mebleg: 7080, odenis_statusu: 'Qismən ödənilib', odenilmis_mebleg: 3000, status: 'İcrada', created_date: d(2) },
  ];

  var KASSALAR = [
    { id: 'k1', ad: 'Əsas Kassa', valyuta: 'AZN', balans: 15750, status: 'Aktiv', created_date: d(200) },
    { id: 'k2', ad: 'Bank Hesabı', valyuta: 'AZN', balans: 48200, status: 'Aktiv', created_date: d(200) },
  ];

  var KASSA_EMELIYYATLARI = [
    { id: 'ke1', kassa_id: 'k1', tip: 'Mədaxil', kateqoriya: 'Xidmət ödənişi', mebleg: 1200, valyuta: 'AZN', odenis_metodu: 'Nağd', tarix: d(10), sifaris_id: 's4', musteri_id: 'm4', aciklama: 'SIF-004 ödənişi', status: 'Təsdiqləndi', created_date: d(10) },
    { id: 'ke2', kassa_id: 'k1', tip: 'Mədaxil', kateqoriya: 'Xidmət ödənişi', mebleg: 2000, valyuta: 'AZN', odenis_metodu: 'Bank köçürməsi', tarix: d(18), sifaris_id: 's3', musteri_id: 'm3', aciklama: 'SIF-003 qismən ödəniş', status: 'Təsdiqləndi', created_date: d(18) },
    { id: 'ke3', kassa_id: 'k1', tip: 'Mədaxil', kateqoriya: 'Xidmət ödənişi', mebleg: 3000, valyuta: 'AZN', odenis_metodu: 'Bank köçürməsi', tarix: d(1), sifaris_id: 's6', musteri_id: 'm3', aciklama: 'SIF-006 qismən ödəniş', status: 'Təsdiqləndi', created_date: d(1) },
    { id: 'ke4', kassa_id: 'k1', tip: 'Məxaric', kateqoriya: 'Maaş', mebleg: 3200, valyuta: 'AZN', odenis_metodu: 'Nağd', tarix: d(15), aciklama: 'Aprel maaşları', status: 'Təsdiqləndi', created_date: d(15) },
    { id: 'ke5', kassa_id: 'k1', tip: 'Məxaric', kateqoriya: 'Kommunal', mebleg: 450, valyuta: 'AZN', odenis_metodu: 'Bank köçürməsi', tarix: d(12), aciklama: 'İşıq, su', status: 'Təsdiqləndi', created_date: d(12) },
    { id: 'ke6', kassa_id: 'k1', tip: 'Mədaxil', kateqoriya: 'Digər mədaxil', mebleg: 800, valyuta: 'AZN', odenis_metodu: 'Nağd', tarix: d(8), aciklama: 'Avadanlıq icarəsi', status: 'Təsdiqləndi', created_date: d(8) },
  ];

  var FAKTURALAR = [
    { id: 'f1', faktura_no: 'FAK-001', musteri_id: 'm3', musteri_adi: 'Elit Group', tarix: fmt(20), son_odenis_tarixi: fmt(5), ara_cem: 3500, edv_faizi: 18, edv_meblegi: 630, umumi_mebleg: 4130, odenilmis_mebleg: 2000, odenis_statusu: 'Qismən', created_date: d(20) },
    { id: 'f2', faktura_no: 'FAK-002', musteri_id: 'm4', musteri_adi: 'Azər Tikinti', tarix: fmt(10), son_odenis_tarixi: fmt(3), ara_cem: 1200, edv_faizi: 0, edv_meblegi: 0, umumi_mebleg: 1200, odenilmis_mebleg: 1200, odenis_statusu: 'Ödənilib', created_date: d(10) },
    { id: 'f3', faktura_no: 'FAK-003', musteri_id: 'm1', musteri_adi: 'Davəli MMC', tarix: fmt(40), son_odenis_tarixi: fmt(10), ara_cem: 8000, edv_faizi: 0, edv_meblegi: 0, umumi_mebleg: 8000, odenilmis_mebleg: 0, odenis_statusu: 'Ödənilməyib', created_date: d(40) },
  ];

  var ISCILAR = [
    { id: 'i1', ad_soyad: 'Əli Məmmədov', vezife: 'Menecer', telefon: '050-100-0001', email: 'eli@gms.az', maas: 1500, ise_baslama: fmt(300), status: 'Aktiv', created_date: d(300) },
    { id: 'i2', ad_soyad: 'Leyla Həsənova', vezife: 'Mühasib', telefon: '055-100-0002', email: 'leyla@gms.az', maas: 1200, ise_baslama: fmt(250), status: 'Aktiv', created_date: d(250) },
    { id: 'i3', ad_soyad: 'Rauf Quliyev', vezife: 'Operator', telefon: '070-100-0003', email: 'rauf@gms.az', maas: 900, ise_baslama: fmt(180), status: 'Aktiv', created_date: d(180) },
    { id: 'i4', ad_soyad: 'Nigar Əliyeva', vezife: 'Koordinator', telefon: '077-100-0004', email: 'nigar@gms.az', maas: 1100, ise_baslama: fmt(120), status: 'Aktiv', created_date: d(120) },
  ];

  var HESAB_PLANI = [
    { id: 'hp1', hesab_kodu: '1000', hesab_adi: 'Əsas vəsaitlər', sinif: '1 - Aktivlər', tip: 'Ana hesab', qalan: 48200, aktiv: true, created_date: d(200) },
    { id: 'hp2', hesab_kodu: '1010', hesab_adi: 'Kassa', sinif: '1 - Aktivlər', tip: 'Alt hesab', ana_hesab_kodu: '1000', qalan: 15750, aktiv: true, created_date: d(200) },
    { id: 'hp3', hesab_kodu: '1200', hesab_adi: 'Debitor borclar', sinif: '1 - Aktivlər', tip: 'Alt hesab', ana_hesab_kodu: '1000', qalan: 19130, aktiv: true, created_date: d(200) },
    { id: 'hp4', hesab_kodu: '2000', hesab_adi: 'Qısamüddətli öhdəliklər', sinif: '2 - Öhdəliklər', tip: 'Ana hesab', qalan: 5200, aktiv: true, created_date: d(200) },
    { id: 'hp5', hesab_kodu: '3000', hesab_adi: 'Nizamnamə kapitalı', sinif: '3 - Kapital', tip: 'Ana hesab', qalan: 30000, aktiv: true, created_date: d(200) },
    { id: 'hp6', hesab_kodu: '4000', hesab_adi: 'Xidmət gəlirləri', sinif: '4 - Gəlirlər', tip: 'Ana hesab', qalan: 16330, aktiv: true, created_date: d(200) },
    { id: 'hp7', hesab_kodu: '4010', hesab_adi: 'Sifariş gəlirləri', sinif: '4 - Gəlirlər', tip: 'Alt hesab', ana_hesab_kodu: '4000', qalan: 16330, aktiv: true, created_date: d(200) },
    { id: 'hp8', hesab_kodu: '5000', hesab_adi: 'Əməliyyat xərcləri', sinif: '5 - Xərclər', tip: 'Ana hesab', qalan: 3650, aktiv: true, created_date: d(200) },
    { id: 'hp9', hesab_kodu: '5010', hesab_adi: 'Maaş xərcləri', sinif: '5 - Xərclər', tip: 'Alt hesab', ana_hesab_kodu: '5000', qalan: 3200, aktiv: true, created_date: d(200) },
    { id: 'hp10', hesab_kodu: '5020', hesab_adi: 'Kommunal xərclər', sinif: '5 - Xərclər', tip: 'Alt hesab', ana_hesab_kodu: '5000', qalan: 450, aktiv: true, created_date: d(200) },
  ];

  var JURNAL_QEYDLER = [
    { id: 'jq1', jurnal_no: 'J-001', tarix: fmt(10), debet_hesab: '1010', kredit_hesab: '4010', debet_mebleg: 1200, kredit_mebleg: 1200, edv_mebleg: 0, aciklama: 'SIF-004 ödənişi', istinad_tipi: 'Sifariş', status: 'Təsdiqləndi', created_date: d(10) },
    { id: 'jq2', jurnal_no: 'J-002', tarix: fmt(18), debet_hesab: '1010', kredit_hesab: '4010', debet_mebleg: 2000, kredit_mebleg: 2000, edv_mebleg: 0, aciklama: 'SIF-003 qismən ödəniş', istinad_tipi: 'Sifariş', status: 'Təsdiqləndi', created_date: d(18) },
    { id: 'jq3', jurnal_no: 'J-003', tarix: fmt(15), debet_hesab: '5010', kredit_hesab: '1010', debet_mebleg: 3200, kredit_mebleg: 3200, edv_mebleg: 0, aciklama: 'Aprel maaşları', istinad_tipi: 'Maaş', status: 'Təsdiqləndi', created_date: d(15) },
    { id: 'jq4', jurnal_no: 'J-004', tarix: fmt(1), debet_hesab: '1010', kredit_hesab: '4010', debet_mebleg: 3000, kredit_mebleg: 3000, edv_mebleg: 0, aciklama: 'SIF-006 qismən ödəniş', istinad_tipi: 'Sifariş', status: 'Gözləyir', created_date: d(1) },
  ];

  var PODRATCILAR = [
    { id: 'p1', ad: 'Clean Pro', telefon: '050-500-0001', komissiya_faizi: 20, status: 'Aktiv', created_date: d(100) },
    { id: 'p2', ad: 'TechService AZ', telefon: '055-500-0002', komissiya_faizi: 15, status: 'Aktiv', created_date: d(80) },
  ];

  var ANBAR = [
    { id: 'a1', mehsul_adi: 'Təmizlik vasitəsi', kateqoriya: 'Kimyəvi', miqdar: 45, min_miqdar: 10, vahid: 'L', qiymet: 8.5, created_date: d(50) },
    { id: 'a2', mehsul_adi: 'Əlcək', kateqoriya: 'Gigiyena', miqdar: 120, min_miqdar: 20, vahid: 'ədəd', qiymet: 2.5, created_date: d(50) },
    { id: 'a3', mehsul_adi: 'Supurgə', kateqoriya: 'Avadanlıq', miqdar: 8, min_miqdar: 3, vahid: 'ədəd', qiymet: 15, created_date: d(30) },
  ];

  // In-memory stores
  var stores = {
    Musteri: MUSTERILER.slice(),
    Sifaris: SIFARISLER.slice(),
    Kassa: KASSALAR.slice(),
    KassaEmeliyyati: KASSA_EMELIYYATLARI.slice(),
    Faktura: FAKTURALAR.slice(),
    Isci: ISCILAR.slice(),
    HesabPlani: HESAB_PLANI.slice(),
    JurnalQeydi: JURNAL_QEYDLER.slice(),
    Podratci: PODRATCILAR.slice(),
    Anbar: ANBAR.slice(),
    DavetEdilmisIstifadeci: [],
    MaasHesablamasi: [],
    Mezuniyyet: [],
    Avadanliq: [],
    Sikayet: [],
    Sened: [],
    Bildiris: [],
    QiymetTeklifi: [],
    SifarisXerci: [],
    PodratciSifarisi: [],
    QiymetAyarlari: [],
    ParolDeyisiklikJurnali: [],
    SilmeJurnali: [],
  };

  function getStore(name) {
    if (!stores[name]) stores[name] = [];
    return stores[name];
  }

  function makeEntity(name) {
    return {
      list: function(sort, limit) {
        limit = limit || 500;
        var items = getStore(name).slice();
        if (sort) {
          var desc = sort.charAt(0) === '-';
          var field = desc ? sort.slice(1) : sort;
          items.sort(function(a, b) {
            var av = a[field] || '';
            var bv = b[field] || '';
            if (desc) return bv > av ? 1 : -1;
            return av > bv ? 1 : -1;
          });
        }
        return Promise.resolve(items.slice(0, limit));
      },
      filter: function(filterObj) {
        var items = getStore(name).slice();
        if (filterObj && typeof filterObj === 'object') {
          items = items.filter(function(item) {
            return Object.keys(filterObj).every(function(k) {
              return item[k] === filterObj[k];
            });
          });
        }
        return Promise.resolve(items);
      },
      get: function(id) {
        var found = getStore(name).find(function(i) { return i.id === id; });
        return Promise.resolve(found || null);
      },
      create: function(data) {
        var newItem = Object.assign({}, data, {
          id: name.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).slice(2),
          created_date: new Date().toISOString()
        });
        stores[name] = getStore(name).concat([newItem]);
        return Promise.resolve(newItem);
      },
      update: function(id, data) {
        stores[name] = getStore(name).map(function(i) {
          return i.id === id ? Object.assign({}, i, data) : i;
        });
        return Promise.resolve(Object.assign({ id: id }, data));
      },
      delete: function(id) {
        stores[name] = getStore(name).filter(function(i) { return i.id !== id; });
        return Promise.resolve({ id: id });
      }
    };
  }

  var entities = new Proxy({}, {
    get: function(_, name) {
      if (typeof name !== 'string' || name === 'then') return undefined;
      return makeEntity(name);
    }
  });

  var mockAuth = {
    isAuthenticated: function() { return Promise.resolve(true); },
    me: function() { return Promise.resolve({ id: 'local-admin', email: 'admin@gms.az', full_name: 'Demo Admin', role: 'admin' }); },
    logout: function() { window.location.reload(); },
    redirectToLogin: function() {}
  };

  var mockUsers = {
    inviteUser: function() { return Promise.resolve(true); }
  };

  globalThis.__B44_DB__ = {
    auth: mockAuth,
    users: mockUsers,
    entities: entities,
    asServiceRole: { entities: entities },
    integrations: {
      Core: { UploadFile: function() { return Promise.resolve({ file_url: '' }); } }
    }
  };

  console.info('✅ GMS ERP — Demo DB yükləndi (lokal inkişaf mühiti)');
})();
