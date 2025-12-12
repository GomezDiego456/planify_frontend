// utils/exportarHorario.ts
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { HorarioItem } from "@/types/index";

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

/**
 * Exporta el horario agrupado por días a PDF
 */
export const exportarHorarioPorDiasPDF = (horarios: HorarioItem[]) => {
  const doc = new jsPDF();

  // Título principal
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Horario Académico", 105, 15, { align: "center" });

  // Fecha de generación
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const fecha = new Date().toLocaleDateString("es-ES");
  doc.text(`Generado el: ${fecha}`, 105, 22, { align: "center" });

  let yPosition = 30;

  // Agrupar horarios por día
  DIAS_SEMANA.forEach((dia) => {
    const horariosDia = horarios.filter((item) => item.dia === dia);

    if (horariosDia.length === 0) return;

    // Verificar si necesitamos nueva página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Título del día
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(dia, 14, yPosition);
    yPosition += 7;

    // Crear tabla para el día
    const tableData = horariosDia.map((item) => [
      `${item.horaInicio} - ${item.horaFin}`,
      item.asignatura.nombre,
      item.profesor.nombreCompleto,
      item.salon.nombre,
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [["Horario", "Asignatura", "Profesor", "Salón"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: 14, right: 14 },
    });

    // @ts-expect-error - autoTable añade finalY al doc
    yPosition = doc.lastAutoTable.finalY + 10;
  });

  // Guardar PDF
  doc.save(`Horario_Academico_${new Date().getTime()}.pdf`);
};

/**
 * Exporta el horario en formato tabla detallada a Excel
 */
export const exportarHorarioTablaExcel = (horarios: HorarioItem[]) => {
  // Preparar datos para Excel
  const datosExcel = horarios.map((item) => ({
    Día: item.dia,
    "Hora Inicio": item.horaInicio,
    "Hora Fin": item.horaFin,
    Asignatura: item.asignatura.nombre,
    Profesor: item.profesor.nombreCompleto,
    Salón: item.salon.nombre,
  }));

  // Crear libro de trabajo
  const wb = XLSX.utils.book_new();

  // Crear hoja de datos
  const ws = XLSX.utils.json_to_sheet(datosExcel);

  // Ajustar ancho de columnas
  const columnWidths = [
    { wch: 12 }, // Día
    { wch: 12 }, // Hora Inicio
    { wch: 12 }, // Hora Fin
    { wch: 30 }, // Asignatura
    { wch: 30 }, // Profesor
    { wch: 15 }, // Salón
  ];
  ws["!cols"] = columnWidths;

  // Agregar hoja al libro
  XLSX.utils.book_append_sheet(wb, ws, "Horario Detallado");

  // Crear hoja de resumen por día
  const resumenPorDia = DIAS_SEMANA.map((dia) => {
    const clasesDia = horarios.filter((item) => item.dia === dia);
    return {
      Día: dia,
      "Total Clases": clasesDia.length,
      Asignaturas: clasesDia.map((c) => c.asignatura.nombre).join(", "),
    };
  });

  const wsResumen = XLSX.utils.json_to_sheet(resumenPorDia);
  wsResumen["!cols"] = [{ wch: 12 }, { wch: 15 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen por Día");

  // Guardar archivo
  XLSX.writeFile(wb, `Horario_Academico_${new Date().getTime()}.xlsx`);
};
