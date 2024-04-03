import { EmailTemplate } from '../../_components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const requestData = await req.json(); // Parse the request body as JSON
        console.log("Received data:", requestData); // Log the received data

        const data = await resend.emails.send({
            from: 'mishank@resend.dev',
            to: [requestData?.emailToSend],
            subject: requestData?.userName + "Share File With You", // Use requestData to access the received data
            react: EmailTemplate({ response: requestData }),
        });

        console.log("Email sent successfully:", data); // Log the successful email data
        return NextResponse.json(data); // Return the response
    } catch (error) {
        console.error("Error sending email:", error); // Log any errors encountered
        return NextResponse.json({ error }); // Return the error response
    }
}
