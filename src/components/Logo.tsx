type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
};

export default function Logo({
  width = 340,
  height = 86,
  className = "",
}: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 340 86"
      role="img"
      aria-label="Planify logo: calendario con engranaje"
    >
      <title>Logotipo de Planify: calendario con engranaje</title>

      {/* 🔹 Eliminamos el espacio extra a la izquierda */}
      <g transform="translate(0,10)">
        <rect
          x="0"
          y="6"
          width="72"
          height="64"
          rx="8"
          fill="#F3F9FF"
          stroke="white"
          strokeWidth="2"
        />
        <rect x="0" y="6" width="72" height="16" rx="8" fill="#2B6CB0" />
        <rect x="10" y="-2" width="8" height="8" rx="2" fill="white" />
        <rect x="54" y="-2" width="8" height="8" rx="2" fill="white" />
        <g fill="white" opacity="0.9">
          <rect
            x="8"
            y="30"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.12"
          />
          <rect
            x="28"
            y="30"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.12"
          />
          <rect
            x="48"
            y="30"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.12"
          />
          <rect
            x="8"
            y="46"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.08"
          />
          <rect
            x="28"
            y="46"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.08"
          />
          <rect
            x="48"
            y="46"
            width="14"
            height="12"
            rx="2"
            fill="#2B6CB0"
            opacity="0.08"
          />
        </g>
        <path
          d="M52 36 L56 40 L62 32"
          stroke="#2B6CB0"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 🔹 Movemos el texto un poco más cerca del icono */}
      <g transform="translate(90,56)" fontFamily="Inter, Arial, sans-serif">
        <text x="0" y="0" fontSize="32" fontWeight="700" fill="white">
          Plan<tspan fill="white">ify</tspan>
        </text>
      </g>
    </svg>
  );
}
