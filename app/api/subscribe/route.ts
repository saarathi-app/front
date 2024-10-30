import { NextResponse } from 'next/server'

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_API_SERVER, // e.g. us1
// })

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
    //   email_address: email,
    //   status: 'subscribed',
    // })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error subscribing to newsletter'
    return NextResponse.json({ error: errorMessage })
  }
} 