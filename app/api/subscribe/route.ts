import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

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
  
  let sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    sheet = await doc.addSheet({
      headerValues: ['name', 'phone', 'email', 'track', 'timestamp']
    });
  }
  
  return sheet;
}

export async function POST(request: Request) {
  try {
    const { name, phone, email, track } = await request.json();

    if (!name || !phone || !email || !track) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const sheet = await getDoc();
    
    const rows = await sheet.getRows();
    const emailExists = rows.some(row => row.get('email') === email);
    
    if (emailExists) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 409 }
      );
    }

    await sheet.addRow({
      name,
      phone,
      email,
      track,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json(
      { error: 'Failed to save application' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sheet = await getDoc();
    const rows = await sheet.getRows();
    
    const uniqueTracks = new Set(
      rows
        .map(row => row.get('track'))
        .filter(track => track && track !== 'N/A')
    );
    
    const stats = {
      totalApplications: rows.length,
      uniqueTracks: uniqueTracks.size,
      recentApplications: rows.slice(-10).map(row => ({
        name: row.get('name'),
        track: row.get('track'),
        timestamp: row.get('timestamp'),
      })),
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