# Saarathi Academy

**Anti-Factory Education** - Small batches. Real projects. Guaranteed career launchpad in Old Baneshwor, Kathmandu.

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18 with Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Google Sheets API (waitlist storage)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory with:

```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email
GOOGLE_SHEETS_PRIVATE_KEY=your-private-key
SPREADSHEET_ID=your-spreadsheet-id
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Features

- **Custom Cursor**: Interactive custom cursor for desktop users
- **Track Directory**: Browse 10 specialized learning tracks across 4 schools
- **Skill Modules**: Additional 5 skill upgrade modules
- **Waitlist Form**: Google Sheets integration for application collection
- **Location Detection**: Geolocation feature for address input
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Smooth Animations**: Framer Motion powered interactions

## Project Structure

```
├── app/
│   ├── api/
│   │   └── subscribe/
│   │       └── route.ts          # Google Sheets API endpoint
│   ├── fonts/                     # Custom fonts
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main landing page
├── public/                        # Static assets
└── package.json
```

## API Endpoints

### POST /api/subscribe

Submit application to waitlist.

**Request Body:**
```json
{
  "name": "Full Name",
  "phone": "+977XXXXXXXXXX",
  "email": "email@example.com",
  "address": "Location",
  "track": "Selected Track"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET /api/subscribe

Get application statistics.

**Response:**
```json
{
  "totalApplications": 100,
  "uniqueTracks": 8,
  "recentApplications": [...]
}
```

## License

© 2026 Saarathi Academy. All rights reserved.
