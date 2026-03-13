import nodemailer from "nodemailer";
import { getPdfStream } from "./getPdfStream";

export async function POST(req: Request) {
    const { email } = await req.json();

    const pdfStream = await getPdfStream();

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_SMTP_USER,
    to: email,
    subject: "FOUR Steps to Data Driven Outcomes",
    text: "Thanks for completing the survey. Please find the free Ebook attached.",
    attachments: [
      {
        filename: "FOUR Steps to Data Driven Outcomes.pdf",
        content: pdfStream,
      },
    ]
  });

  return Response.json({ success: true });
}