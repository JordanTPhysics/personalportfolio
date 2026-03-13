import { google } from "googleapis"

/** Number of survey questions; used to size answer/extra columns. */
const EXTRA_IDS = [7, 9, 11]

export async function POST(req: Request) {
  const data = await req.json()

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  const sheets = google.sheets({ version: "v4", auth })

  // Map questionId -> single string (join array values)
  const answerMap: Record<string, string> = {}
  for (const a of data.answers ?? []) {
    const val = a.value
    answerMap[a.name] = Array.isArray(val) ? val.join(", ") : (val ?? "")
    if (EXTRA_IDS.includes(a.questionId)) {
      if(a.extra) answerMap[a.name + " Extra"] = a.extra;
      else answerMap[a.name + " Extra"] = "N/A"
    }
  }

  const meta = data.metadata ?? {}

  const row = [
    // Metadata columns
    meta.submittedAt ?? new Date().toISOString(),
    data.sessionId ?? data.session_id ?? "",
    data.email ?? "",
    meta.userAgent ?? "",
    meta.referrer ?? "",
    meta.language ?? "",
    answerMap["Company Name"],
    answerMap["Company Size"],
    answerMap["Business Sector"],
    answerMap["Data Collection"],
    answerMap["Data Usage"],
    answerMap["Data Usage Methods"],
    answerMap["Data Usage Challenges"],
    answerMap["Data Usage Challenges Extra"],
    answerMap["Data Usage Interest"],
    answerMap["Prospect Sources"],
    answerMap["Prospect Sources Extra"],
    answerMap["Prospect Main Source"],
    answerMap["Order Placement"],
    answerMap["Order Placement Extra"],
    answerMap["Resources Capacity"],
    answerMap["Website"],
    answerMap["Website Traffic"],
    answerMap["Success Rates"],
    answerMap["Conversion Success Rates"],
    answerMap["Customer Feedback"],
    answerMap["Customer Feedback Decisions"],
    answerMap["Strategy Planning"],
    answerMap["Software Usage"],
    answerMap["Logistics Procurement"],
    answerMap["Data Leverage"],
    answerMap["Data Driven Approach Before"],
    answerMap["Data Driven Approach After"],
    answerMap["Final Comments"],
  ]

  // A:BF = 58 columns (6 metadata + 26 answers + 26 extras)
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: "Sheet1!A:BF",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row]
    }
  })

  return Response.json({ success: true })
}