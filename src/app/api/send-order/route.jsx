// app/api/send-order/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, address, phone, cart } = await request.json();

    // Create transporter (update with your email service credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address (e.g., yourbusiness@gmail.com)
        pass: process.env.EMAIL_PASS, // Your email password or App Password
      },
    });

    // Format cart items for email
    const cartDetails = cart
      .map(
        (item) =>
          `${item.title} (x${item.quantity}) - $${(item.salePrice || item.price).toFixed(2)}`
      )
      .join('\n');
    const total = cart
      .reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
      .toFixed(2);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email to receive orders
      subject: `New Order from ${name}`,
      text: `
        New Order Received:
        Name: ${name}
        Email: ${email}
        Address: ${address}
        Phone: ${phone}
        Cart Items:
        ${cartDetails}
        Total: $${total}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Order sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}