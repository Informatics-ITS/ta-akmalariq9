import { IErgonomicsMoveNetRepository } from "../../repositories/IErgonomicMoveNetRepository";
import PdfPrinter from "pdfmake";

export class DownloadEmployeeErgonomicMovenetPDFUseCase {
  constructor(private repo: IErgonomicsMoveNetRepository) {}

  async execute(employeeId: string, supervisorId: string): Promise<Buffer> {
    const data = await this.repo.getErgonomicMoveNetHistory(employeeId);

    if (!data || data.length === 0) {
      throw new Error("No movenet ergonomic data found for this employee.");
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
        "Reba Score",
        "Risk Level",
        "Overall Feedback",
        "Created At",
      ],
      ...data.map((result: any) => [
        result.visualization_path,
        result.reba_score,
        result.risk_level,
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
            widths: ["auto", "auto", "auto", "auto", "auto"],
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
