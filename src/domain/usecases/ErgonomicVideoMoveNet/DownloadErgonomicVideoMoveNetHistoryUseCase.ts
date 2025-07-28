import { IErgonomicVideoMoveNetRepository } from "../../repositories/IErgonomicVideoMoveNetRepository";
import PdfPrinter from "pdfmake";

export class DownloadEmployeeErgonomicVideoMovenetPDFUseCase {
  constructor(private repo: IErgonomicVideoMoveNetRepository) {}

  async execute(employeeId: string, supervisorId: string): Promise<Buffer> {
    const data = await this.repo.getErgonomicMoveNetVideoHistory(employeeId);

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
        "Max Reba Score",
        "Max Risk Level",
        "Feedback",
        "Created At",
      ],
      ...data.map((result: any) => [
        result.video_filename,
        result.max_reba_score,
        result.max_risk_level,
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
