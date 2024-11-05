import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

// Your Google Sheets credentials
const GOOGLE_SHEETS_CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const GOOGLE_SHEETS_PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getDoc() {
  const jwt = new JWT({
    email: GOOGLE_SHEETS_CLIENT_EMAIL,
    key: GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID!, jwt);
  await doc.loadInfo();
  
  // Get the first sheet or create it if it doesn't exist
  let sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    sheet = await doc.addSheet({
      headerValues: ['email', 'type', 'industry', 'timestamp']
    });
  }
  
  return sheet;
}

export async function POST(request: Request) {
  try {
    const { email, type, industry } = await request.json();

    const sheet = await getDoc();

    // Add the email to the sheet
    await sheet.addRow({
      email,
      type,
      industry: industry || 'N/A',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return NextResponse.json(
      { error: 'Failed to save email' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sheet = await getDoc();
    const rows = await sheet.getRows();
    
    const stats = {
      mentors: rows.filter(row => row.get('type') === 'mentor').length,
      mentees: rows.filter(row => row.get('type') === 'mentee').length,
      industries: Math.ceil(rows.length / 10), // Rough estimate
      waitlist: rows.length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 