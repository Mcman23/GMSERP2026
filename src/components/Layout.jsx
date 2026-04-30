const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], list:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SystemLogin from "./SystemLogin";
import { useState, useEffect } from "react";

import { getSystemUser, hasRouteAccess } from "@/lib/systemUser";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sysAuthed, setSysAuthed] = useState(() => sessionStorage.getItem("gms_sys_auth") === "1");
  const [user, setUser] = useState(null);
  const [systemUser, setSystemUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    db.auth.me().then(setUser).catch(() => {});
    setSystemUser(getSystemUser());
  }, []);

  // Session user-i refresh et (login sonrası dəyişə bilər)
  useEffect(() => {
    setSystemUser(getSystemUser());
  }, [sysAuthed]);

  if (!sysAuthed) {
    return <SystemLogin onSuccess={() => {
      setSysAuthed(true);
      setSystemUser(getSystemUser());
    }} />;
  }

  // Erişim yoxlaması
  if (!hasRouteAccess(systemUser, location.pathname)) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} systemUser={systemUser} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-xl font-bold text-foreground mb-2">Giriş icazəniz yoxdur</h2>
              <p className="text-muted-foreground text-sm">Bu bölməyə daxil olmaq üçün admin ilə əlaqə saxlayın.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} systemUser={systemUser} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
