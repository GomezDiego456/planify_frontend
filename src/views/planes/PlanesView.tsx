import {
  BadgeCheck,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Clock,
} from "lucide-react";

const plans = [
  {
    name: "Plan Gratis",
    price: "$0",
    badge: "Incluido",
    description:
      "Todo lo esencial para crear horarios sin costo, con límites pensados para probar la plataforma.",
    cta: "Usar gratis",
    features: [
      "Hasta 10 profesores",
      "Hasta 10 asignaturas",
      "Hasta 10 salones",
      "1 horario activo",
      "Generar horarios básicos",
      "Exportar horarios a PDF",
    ],
    mutedFeatures: ["Optimización avanzada", "Soporte prioritario", "Sin límites"],
  },
  {
    name: "Plan Pro",
    price: "$20/mes",
    badge: "Próximamente",
    description:
      "Desbloquea la experiencia completa: más capacidad, optimización y soporte dedicado.",
    cta: "Elegir Plan Pro",
    features: [
      "Profesores, asignaturas y salones ilimitados",
      "Múltiples escenarios de horario",
      "Optimización avanzada y detección de choques",
      "Exportaciones avanzadas (PDF/Excel)",
      "Todas las funcionalidades disponibles en la plataforma",
    ],
    mutedFeatures: ["Pasarela Nequi / Tarjeta", "Facturación automática"],
    highlighted: true,
  },
];

const paymentOptions = [
  {
    title: "Pagar con Nequi",
    icon: Smartphone,
    description:
      "Escanea un código o comparte tu número Nequi. El flujo se habilitará al lanzar el plan Pro.",
  },
  {
    title: "Tarjeta de débito o crédito",
    icon: CreditCard,
    description:
      "Pagos con tarjeta de débito o crédito. Aún en preparación para el próximo lanzamiento.",
  },
];

export default function PlanesView() {
  return (
    <main className="space-y-10">
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="inline-flex items-center gap-2 bg-white/10 text-sm px-3 py-1 rounded-full">
              <BadgeCheck size={16} />
              Planes diseñados para equipos académicos
            </p>
            <h1 className="text-3xl md:text-4xl font-bold">
              Elige cómo quieres usar Planify
            </h1>
            <p className="text-blue-100">
              Mantuvimos el flujo de pago desconectado a propósito. Aquí podrás
              previsualizar cómo se verá la selección de plan y método de pago
              (Nequi o tarjeta) cuando se habilite.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl text-sm">
            <ShieldCheck size={18} />
            <span>Tu información y pagos estarán cifrados y verificados.</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl border bg-white shadow-md p-6 space-y-4 ${
              plan.highlighted
                ? "border-blue-500 shadow-blue-100"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-blue-700 flex items-center gap-2">
                  <BadgeCheck size={16} /> {plan.badge}
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h2>
                <p className="text-slate-600">{plan.description}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-slate-900">
                  {plan.price}
                </p>
                <p className="text-sm text-slate-500">por institución</p>
              </div>
            </div>

            <div className="space-y-2">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-slate-800"
                >
                  <BadgeCheck size={16} className="text-blue-600" />
                  <span>{feature}</span>
                </div>
              ))}
              {plan.mutedFeatures?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-slate-400"
                >
                  <Clock size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`w-full py-3 rounded-xl font-semibold ${
                plan.highlighted
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
              disabled={plan.name === "Plan Pro"}
              aria-disabled={plan.name === "Plan Pro"}
            >
              {plan.name === "Plan Pro" ? "Próximamente" : plan.cta}
            </button>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p className="text-sm font-semibold text-blue-700 flex items-center gap-2">
              <CreditCard size={16} /> Métodos de pago
            </p>
            <h3 className="text-xl font-bold text-slate-900">
              Próximamente podrás pagar con Nequi o tarjeta
            </h3>
            <p className="text-slate-600">
              Integraremos ambos métodos cuando se habilite el plan Pro. Aquí
              verás el flujo final de selección, pero sin procesar pagos reales.
            </p>
          </div>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
            Sección demo (sin cobro)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentOptions.map((option) => (
            <div
              key={option.title}
              className="border border-dashed border-slate-200 rounded-xl p-4 flex gap-3 items-start bg-slate-50"
            >
              <option.icon className="text-blue-600 mt-1" size={20} />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">
                    {option.title}
                  </h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    En preparación
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{option.description}</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-sm disabled:opacity-60 cursor-not-allowed"
                  disabled
                  aria-disabled
                >
                  <Clock size={14} />
                  Activación pendiente
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

