// lib/emailService.js
import emailjs from '@emailjs/browser';

// GANTI dengan credentials Anda
const SERVICE_ID = "service_a975w1r";      // Service ID dari EmailJS
const TEMPLATE_ID = "template_sytgo9f";    // Template ID dari EmailJS
const PUBLIC_KEY = "zaG2jdDSLoai1mYGB";    // Public Key dari EmailJS

// Inisialisasi
emailjs.init(PUBLIC_KEY);

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'ahmadrofiki6146@gmail.com', // Email Anda
      reply_to: formData.email,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, data: response };

  } catch (error) {
    console.error('EmailJS Error Details:', {
      code: error?.code,
      text: error?.text,
      message: error?.message,
      fullError: error
    });

    return {
      success: false,
      error: error?.text || error?.message || 'Failed to send email'
    };
  }
};
