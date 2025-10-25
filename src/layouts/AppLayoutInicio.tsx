import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export default function AppLayoutInicio() {
  return (
    <>
      <header className="bg-[#2B6CB0] py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-10">
          <div className="w-64">
            <Logo />
          </div>
          <div>
            <Navbar />
          </div>
        </div>
      </header>

      <section className="bg-[#EAF3FF] ">
        <Outlet />
      </section>

      <Footer />

      <ToastContainer />
    </>
  );
}
