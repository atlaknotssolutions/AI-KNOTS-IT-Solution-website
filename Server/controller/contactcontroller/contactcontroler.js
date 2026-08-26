// const Contact = require("../../module/contactmodule/contactmodule");
// const nodemailer = require("nodemailer");
// const axios = require("axios");

// // ✅ SMTP transporter for domain email
// const transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net", // domain SMTP
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const createContactMessage = async (req, res) => {
//   try {
//     const { username, email, phone, subject, message, captcha } = req.body;

//     // ✅ required fields
//     // if (!username || !email || !phone || !subject || !message) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "All fields are required",
//     //   });
//     // }

//     // ✅ captcha check
//     if (!captcha) {
//       return res.status(400).json({
//         success: false,
//         message: "Please complete reCAPTCHA verification.",
//       });
//     }

//     // ✅ captcha verification
//     const verificationResponse = await axios.post(
//       "https://www.google.com/recaptcha/api/siteverify",
//       null,
//       {
//         params: {
//           secret: process.env.RECAPTCHA_SECRET_KEY,
//           response: captcha,
//           remoteip: req.ip,
//         },
//       },
//     );

//     if (!verificationResponse.data.success) {
//       return res.status(400).json({
//         success: false,
//         message: "reCAPTCHA verification failed",
//       });
//     }

//     // ✅ save to DB
//     const contact = await Contact.create({
//       username,
//       email,
//       phone,
//       subject,
//       message,
//     });

//     // ✅ admin mail
//     await transporter.sendMail({
//       from: `"AI Knots Website" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `New Contact Message: ${subject}`,
//       html: `
//       <h2>New Contact Enquiry</h2>
//       <p><b>Name:</b> ${username}</p>
//       <p><b>Email:</b> ${email}</p>
//       <p><b>Phone:</b> ${phone}</p>
//       <p><b>Subject:</b> ${subject}</p>
//       <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     // ✅ user confirmation mail
//     await transporter.sendMail({
//       from: `"AI Knots Solution" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: `We received your message`,
//       html: `
//       <h2>Thank you ${username}</h2>
//       <p>Your message has been received.</p>
//       <p>We will contact you soon.</p>
//       <hr/>
//       <p><b>Your Message:</b></p>
//       <p>${message}</p>
//       `,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: contact,
//     });
//   } catch (error) {
//     console.error("Contact Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // Get all contact messages
// const getContactMessages = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: contacts });
//   } catch (error) {
//     console.error("Error fetching contact messages:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Delete a contact message by ID
// const deleteContactMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedContact = await Contact.findByIdAndDelete(id);
//     if (!deletedContact) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Contact message not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Contact message deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting contact message:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// module.exports = {
//   createContactMessage,
//   getContactMessages,
//   deleteContactMessage,
// };

const Contact = require("../../module/contactmodule/contactmodule");
const nodemailer = require("nodemailer");
const axios = require("axios");

// ✅ SMTP Transporter (Best Practice - reusable)
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

exports.createContactMessage = async (req, res) => {
  try {
    const { username, email, phone, subject, message, captcha } = req.body;

    // ✅ Validation
    if (!username || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required (username, email, phone, subject, message)",
      });
    }

    if (!captcha) {
      return res.status(400).json({
        success: false,
        message: "Please complete reCAPTCHA verification.",
      });
    }

    // ✅ reCAPTCHA Verification
    const verificationResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
          remoteip: req.ip,
        },
      },
    );

    if (!verificationResponse.data.success) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }

    // ✅ Save to Database
    const contact = await Contact.create({
      username,
      email,
      phone,
      subject,
      message,
    });

    // ✅ Email to Admin
    await transporter.sendMail({
      from: `"AI Knots Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><b>Name:</b> ${username}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
    });

    // ✅ Thank You Email to User
    await transporter.sendMail({
      from: `"AI Knots Solution" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting us - AI Knots",
      html: `
        <h2>Thank you ${username}!</h2>
        <p>We have received your message and will get back to you soon.</p>
        <hr/>
        <p><b>Your Message:</b></p>
        <p>${message}</p>
        <br/>
        <p>Best Regards,<br><b>AI Knots Team</b></p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Contacts
exports.getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Contact
exports.deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
