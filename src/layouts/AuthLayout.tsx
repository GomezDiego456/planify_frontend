import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <div className="bg-[#1E4E8C] min-h-screen">
        <div className="lg:py-10 mx-auto w-[550px]">
          <div>
            <Logo className="mx-45" />
          </div>
          <div className="ml-14">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
