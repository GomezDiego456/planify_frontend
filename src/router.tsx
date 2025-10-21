import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import LoginView from "./views/auth/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import RegisterView from "./views/auth/RegisterView";
// import { useMutation } from "@tanstack/react-query";
// import type { UserRegistrationForm } from "./types";

export default function Router() {
  // const handleResgister = (formdata: UserRegistrationForm) => mutate(formdata);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
