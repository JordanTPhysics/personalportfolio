import { google } from "googleapis"

export async function POST(req: Request) {
  const data = await req.json()

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const sheets = google.sheets({ version: "v4", auth })

  const row = [
    new Date().toISOString(),
    data.session_id,
    data.age,
    data.country,
    data.score,
    data.answers.q1,
    data.answers.q2,
    data.answers.q3
  ]

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row]
    }
  })

  return Response.json({ success: true })
}