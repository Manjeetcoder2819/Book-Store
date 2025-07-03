export async function POST(req) {
  const body = await req.json();
  const { email } = body;

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const VERIFIED_SENDER_EMAIL = 'yourverifiedemail@example.com'; // Replace with your verified Brevo sender email

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: VERIFIED_SENDER_EMAIL, name: 'Your Company' },
        to: [{ email }],
        subject: 'Hello from Brevo!',
        htmlContent: `<h1>Hello!</h1><p>Thank you for submitting your email.</p>`,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: err.message || 'Email failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Email sent!' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
}
