import { google } from "googleapis";

export async function getPdfStream() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({
    version: "v3",
    auth,
  });

  const response = await drive.files.get(
    {
      fileId: "1Ej-jn5Qo2piqj27dx6PtSGJ-CMr6d4Qz",
      alt: "media",
    },
    {
      responseType: "stream",
    }
  );

  return response.data; // this is a readable stream
}