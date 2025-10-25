import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayoutInicio from "@/layouts/AppLayoutInicio";
import DashboardInicio from "@/views/DashboardInicio";
import LoginView from "./views/auth/LoginView";
import AuthLayout from "./layouts/AuthLayout";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import CreateProfesoresView from "./views/profesores/CreateProfesoresView";
// import AppLayout from "./layouts/AppLayout";
import Dashboard from "./views/Dashboard";

// import { useMutation } from "@tanstack/react-query";
// import type { UserRegistrationForm } from "./types";

export default function Router() {
  // const handleResgister = (formdata: UserRegistrationForm) => mutate(formdata);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayoutInicio />}>
          <Route path="/" element={<DashboardInicio />} index />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        {/* <Route element={<AppLayout />}> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profesores/create" element={<CreateProfesoresView />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
