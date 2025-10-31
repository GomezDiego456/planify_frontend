import { getAsignaturaById } from "@/api/AsignaturaApi";
import { getProfesor } from "@/api/ProfesorApi";
import EditAsignaturaForm from "@/components/asignatura/EditAsignaturaForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditAsignaturaView() {
  const params = useParams();
  const asignaturaId = params.asignaturaId!;

  // Obtener la asignatura
  const {
    data: asignatura,
    isLoading: asignaturaLoading,
    isError: asignaturaError,
  } = useQuery({
    queryKey: ["editAsignatura", asignaturaId],
    queryFn: () => getAsignaturaById(asignaturaId),
    retry: false,
  });

  // Obtener los profesores
  const { data: profesores = [], isLoading: profesoresLoading } = useQuery({
    queryKey: ["profesores"],
    queryFn: getProfesor,
  });

  if (asignaturaLoading || profesoresLoading)
    return <div>Cargando información...</div>;

  if (asignaturaError) return <div>Error cargando asignatura</div>;

  if (asignatura)
    return (
      <EditAsignaturaForm
        data={asignatura}
        asignaturaId={asignaturaId}
        profesores={profesores}
      />
    );
}
