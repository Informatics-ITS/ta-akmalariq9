import { IErgonomicAnalysisRepository } from "../../repositories/IErgonomicRepository";
import PdfPrinter from "pdfmake";

export class DownloadEmployeeErgonomicPDFUseCase {
  constructor(private repo: IErgonomicAnalysisRepository) {}

  async execute(employeeId: string, supervisorId: string): Promise<Buffer> {
    const data = await this.repo.getErgonomicsHistory(employeeId);

    if (!data || data.length === 0) {
      throw new Error("No ergonomic data found for this employee.");
    }

    const printer = new PdfPrinter({
      Helvetica: {
        normal: "Helvetica",
        bold: "Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
      },
    });

    const tableBody = [
      [
        "File URL",
        "Reba Final Score",
        "Rula Final Score",
        "Rula Feedback",
        "Reba Feedback",
        "Overall Feedback",
        "Created At",
      ],
      ...data.map((result: any) => [
        result.fileUrl,
        result.reba_final_score,
        result.rula_final_score,
        result.rula_summary,
        result.reba_summary,
        result.feedback,
        new Date(result.createdAt).toLocaleDateString(),
      ]),
    ];

    const docDefinition: any = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Ergonomic Analysis Report",
          style: "header",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "auto", "auto", "auto", "auto", "auto", "10%"],
            body: tableBody,
          },
          layout: "lightHorizontalLines",
        },
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
        },
      },
      defaultStyle: {
        font: "Helvetica",
        fontSize: 8,
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      pdfDoc.on("data", (chunk) => chunks.push(chunk));
      pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });
  }
}
