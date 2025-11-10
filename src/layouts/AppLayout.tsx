import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:block">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto p-6" role="main">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
