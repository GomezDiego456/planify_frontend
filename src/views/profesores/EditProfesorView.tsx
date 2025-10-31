import { getProfesorById } from "@/api/ProfesorApi";
import EditProfesorForm from "@/components/profesor/EditProfesorForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditProfesorView() {
  const params = useParams();
  const profesorId = params.profesorId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProfesor", profesorId],
    queryFn: () => getProfesorById(profesorId),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading profesor</div>;

  if (data) return <EditProfesorForm data={data} profesorId={profesorId} />;
}
