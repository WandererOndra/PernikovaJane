// app/api/send-order/route.js
import nodemailer from 'nodemailer';

const rateLimitWindow = 60 * 1000; // 1 minuta
const maxRequests = 3; // max 3 objednávky za minutu z jedné IP
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = requestLog.get(ip) || [];
  const recentRequests = userRequests.filter((time) => now - time < rateLimitWindow);

  if (recentRequests.length >= maxRequests) {
    return true;
  }

  requestLog.set(ip, [...recentRequests, now]);
  return false;
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, address, phone, delivery, cart, total } = await request.json();

    //regex validace (stejné jako na frontend)
    const nameRegex = /^[a-zA-ZÀ-ž\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{9,15}$/;

    if (!nameRegex.test(name)) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), { status: 400 });
    }
    if (!phoneRegex.test(phone)) {
      return new Response(JSON.stringify({ error: 'Invalid phone' }), { status: 400 });
    }
    if (delivery === "delivery") {
      if (!street || street.trim().length < 3) {
        return new Response(JSON.stringify({ error: "Invalid street" }), { status: 400 });
        }
      if (!city || city.trim().length < 2) {
        return new Response(JSON.stringify({ error: "Invalid city" }), { status: 400 });
        }
      if (!zip || !/^[0-9]{3}\s?[0-9]{2}$/.test(zip)) {
        return new Response(JSON.stringify({ error: "Invalid ZIP code" }), { status: 400 });
      }
}

    if (!Array.isArray(cart) || cart.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const cartDetails = cart
      .map((item) =>
        `${item.title} (x${item.quantity}) - ${(item.salePrice || item.price).toFixed(2)} Kč`
      )
      .join('\n');

    // ---- Email pro tebe
    const ownerMail = {
      from: `"E-shop Perníková Jane" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nová objednávka od ${name}`,
      text: `
Nová objednávka:
-------------------------
Jméno: ${name}
E-mail: ${email}
Telefon: ${phone}
Adresa: ${address || "Osobní odběr"}
Doručení: ${delivery === "delivery" ? `${street}, ${city}, ${zip}` : "Osobní odběr"}

Položky v košíku:
${cartDetails}

Celková cena: ${total} Kč
      `,
    };

    // ---- Email pro zákazníka
    const customerMail = {
      from: `"E-shop Perníková Jane" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Potvrzení objednávky – Perníková Jane",
      text: `
Dobrý den ${name},

děkujeme za vaši objednávku! Níže je rekapitulace:

Položky v objednávce:
${cartDetails}

Doručení: ${delivery === "delivery" ? "Doručení na adresu (90 Kč)" : "Osobní odběr (0 Kč)"}
Celková cena: ${total} Kč

Brzy vás budeme kontaktovat s potvrzením.

S pozdravem,
E-shop Perníková Jane
      `,
    };

    await transporter.sendMail(ownerMail);
    await transporter.sendMail(customerMail);

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
