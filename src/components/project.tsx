// import { useForm } from "react-hook-form";

// export default function Login() {
//   const initialValues = {
//     nombre: "",
//     email: "",
//     password: "",
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: initialValues,
//   });

//   const handleForm = (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <form
//         className="mt-10 bg-white shadow-lg p-10 rounded-lg"
//         onSubmit={handleSubmit(handleForm)}
//         noValidate
//       >
//         <div className="mb-5 space-y-3">
//           <label htmlFor="projectName" className="text-sm uppercase font-bold">
//             Nombre del Proyecto
//           </label>
//           <input
//             id="projectName"
//             className="w-full p-3  border border-gray-200"
//             type="text"
//             placeholder="Nombre del Proyecto"
//             {...register("projectName", {
//               required: "El Titulo del Proyecto es obligatorio",
//             })}
//           />

//           {errors.projectName && (
//             <ErrorMessage>{errors.projectName.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="mb-5 space-y-3">
//           <label htmlFor="clientName" className="text-sm uppercase font-bold">
//             Nombre Cliente
//           </label>
//           <input
//             id="clientName"
//             className="w-full p-3  border border-gray-200"
//             type="text"
//             placeholder="Nombre del Cliente"
//             {...register("clientName", {
//               required: "El Nombre del Cliente es obligatorio",
//             })}
//           />

//           {errors.clientName && (
//             <ErrorMessage>{errors.clientName.message}</ErrorMessage>
//           )}
//         </div>

//         <div className="mb-5 space-y-3">
//           <label htmlFor="description" className="text-sm uppercase font-bold">
//             Descripción
//           </label>
//           <textarea
//             id="description"
//             className="w-full p-3  border border-gray-200"
//             placeholder="Descripción del Proyecto"
//             {...register("description", {
//               required: "Una descripción del proyecto es obligatoria",
//             })}
//           />

//           {errors.description && (
//             <ErrorMessage>{errors.description.message}</ErrorMessage>
//           )}
//         </div>

//         <input
//           type="submit"
//           value="Crear cuenta"
//           className="bg-[#1E4E8C] w-full p-3 text-white hover:bg-[#1A365D] transition-colors cursor-pointer"
//         />
//       </form>
//     </div>
//   );
// }
