// pages/api/send-email.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // In a production environment, you would use a service like Nodemailer, SendGrid, etc.
    // For now, we'll log the data and return a success response
    
    console.log('Email form submission:');
    console.log('From:', name, email);
    console.log('Subject:', subject || 'No subject');
    console.log('Message:', message);
    
    // To implement actual email sending, you would:
    // 1. Set up an email service like SendGrid, Mailgun, AWS SES, etc.
    // 2. Install the corresponding package (e.g., @sendgrid/mail)
    // 3. Configure the service with your API keys in environment variables
    // 4. Send the email using the service's API
    
    /* 
    Example with SendGrid:
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'support@matchmint.com', // Your support email
      from: 'no-reply@matchmint.com', // Verified sender
      replyTo: email,
      subject: `[Contact Form] ${subject || 'New message from help center'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    };
    
    await sgMail.send(msg);
    */
    
    // Return success response
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
