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
import CreateProfesorView from "./views/profesores/CreateProfesorView";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./views/Dashboard";
import EditProfesorView from "./views/profesores/EditProfesorView";
import CreateAsignaturaView from "./views/asignaturas/CreateAsignaturaView";
import EditAsignaturaView from "./views/asignaturas/EditAsignatura.View";
import CreateSalonView from "./views/salones/CreateSalonView";
import EditSalonView from "./views/salones/EditSalonView";
import GenerarHorarioView from "./views/Horarios/GenerarHorarioView";
import RestriccionesView from "./views/restricciones/RestriccionesView";

// import { useMutation } from "@tanstack/react-query";
// import type { UserRegistrationForm } from "./types";

export default function Router() {
  // const handleResgister = (formdata: UserRegistrationForm) => mutate(formdata);

  return (
    <BrowserRouter>
      <Routes>
        {/* diseño inicio */}
        <Route element={<AppLayoutInicio />}>
          <Route path="/" element={<DashboardInicio />} index />
        </Route>
        {/* diseño auth */}
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
        {/* diseño app */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* horarios */}
          <Route path="/horarios" element={<GenerarHorarioView />} />
          {/* profesores */}
          <Route path="/profesores/create" element={<CreateProfesorView />} />
          <Route
            path="/profesores/:profesorId/edit"
            element={<EditProfesorView />}
          />
          {/* asignaturas */}
          <Route
            path="/asignaturas/create"
            element={<CreateAsignaturaView />}
          />
          <Route
            path="/asignaturas/:asignaturaId/edit"
            element={<EditAsignaturaView />}
          />

          {/* salones */}
          <Route path="/salones/create" element={<CreateSalonView />} />
          <Route path="/salones/:salonId/edit" element={<EditSalonView />} />

          {/* restricciones */}
          <Route path="/restricciones" element={<RestriccionesView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
