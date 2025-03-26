import { jsPDF } from "jspdf";
import { format, parseISO } from "date-fns";
import { DiaryEntry } from "@/types/diary";
import "jspdf-autotable";

// Declare a extensão para jsPDF para incluir o método autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export function exportEntriesToPDF(entries: DiaryEntry[]) {
  try {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Diário de Classe - Relatório", 14, 22);

    // Data de geração
    doc.setFontSize(11);
    doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm")}`, 14, 30);

    // Tabela
    const tableColumn = ["Data", "Disciplina", "Professor", "Aulas", "Assunto", "Observações"];
    const tableRows = entries.map((entry) => [
      format(parseISO(entry.date), "dd/MM/yyyy"),
      entry.subject,
      entry.professor,
      entry.numberOfClasses.toString(),
      entry.topic,
      entry.observations || "-"
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 22 }, // Data
        1: { cellWidth: 30 }, // Disciplina
        2: { cellWidth: 30 }, // Professor
        3: { cellWidth: 15 }, // Aulas
        4: { cellWidth: 40 }, // Assunto
        5: { cellWidth: "auto" }, // Observações
      },
    });

    // Salvar o PDF
    doc.save("diario-de-classe.pdf");

    return true;
  } catch (error) {
    console.error("Erro ao exportar para PDF:", error);
    return false;
  }
}
