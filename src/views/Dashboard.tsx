export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Panel Principal
          </h2>
          <p className="text-slate-600">
            Gestiona todos los elementos de tu sistema de horarios
          </p>
        </div>

        <div className="min-h-screen bg-slate-100 p-6">
          {/* Tarjetas de resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-2">
                Profesores registrados
              </h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-2">
                Asignaturas
              </h3>
              <p className="text-3xl font-bold text-green-600">34</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-2">
                Salones
              </h3>
              <p className="text-3xl font-bold text-yellow-600">8</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
              <h3 className="text-sm font-medium text-slate-500 mb-2">
                Restricciones
              </h3>
              <p className="text-3xl font-bold text-red-600">5</p>
            </div>
          </div>

          {/* Actividades recientes */}
          <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Actividades recientes
            </h2>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="p-3 text-sm font-medium text-slate-600">
                    Fecha
                  </th>
                  <th className="p-3 text-sm font-medium text-slate-600">
                    Acción
                  </th>
                  <th className="p-3 text-sm font-medium text-slate-600">
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-slate-50 transition">
                  <td className="p-3 text-sm text-slate-700">2025-10-29</td>
                  <td className="p-3 text-sm text-slate-700">
                    Se registró una nueva asignatura: Cálculo I
                  </td>
                  <td className="p-3 text-sm text-slate-700">Admin</td>
                </tr>

                <tr className="border-t hover:bg-slate-50 transition">
                  <td className="p-3 text-sm text-slate-700">2025-10-28</td>
                  <td className="p-3 text-sm text-slate-700">
                    Se creó el salón: Laboratorio de Redes
                  </td>
                  <td className="p-3 text-sm text-slate-700">Admin</td>
                </tr>

                <tr className="border-t hover:bg-slate-50 transition">
                  <td className="p-3 text-sm text-slate-700">2025-10-27</td>
                  <td className="p-3 text-sm text-slate-700">
                    Se actualizó disponibilidad de profesor: Juan Pérez
                  </td>
                  <td className="p-3 text-sm text-slate-700">Admin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Horarios Generados
            </h3>
            <p className="text-4xl font-bold text-blue-600">5</p>
            <p className="text-sm text-slate-600 mt-2">Esta semana</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Conflictos Resueltos
            </h3>
            <p className="text-4xl font-bold text-green-600">98%</p>
            <p className="text-sm text-slate-600 mt-2">Tasa de éxito</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
