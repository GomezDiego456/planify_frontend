import { getSalonById } from "@/api/SalonApi";
import EditSalonForm from "@/components/salon/EditSalonForm";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function EditSalonView() {
  const params = useParams();
  const salonId = params.salonId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editSalon", salonId],
    queryFn: () => getSalonById(salonId),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading salon</div>;

  if (data) return <EditSalonForm data={data} salonId={salonId} />;
}
