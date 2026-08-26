const transporter = require("../config/mail.js");
const Query = require("../../module/querymodule/querymodule");
exports.createQuery = async (req, res) => {
  try {
    const { name, email, phone, message, category } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const query = await Query.create({
      name,
      email,
      phone,
      message,
      category: category || "Other",
    });

    // Email to Admin (Notification)
    await transporter.sendMail({
      from: `"Website Query" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Query: ${category || "General"}`,
      html: `
        <h3>New Query Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Category:</b> ${category || "Other"}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // Thank You Email to User
    await transporter.sendMail({
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Query",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
          <h2>Thank You, ${name}!</h2>
          <p>We have received your query and our team will get back to you soon.</p>
          
          <h3>Your Query Details:</h3>
          <p><b>Category:</b> ${category || "Other"}</p>
          <p><b>Message:</b> ${message}</p>
          
          <p>If you have any urgent concern, feel free to call us.</p>
          
          <p>Best Regards,<br><strong>Support Team</strong></p>
        </div>
      `,
    });
    

    res.status(201).json({
      success: true,
      message: "Query submitted successfully. Thank you email sent.",
      data: query,
    });

  } catch (error) {
    console.error("Query Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// exports.createQuery = async (req, res) => {
//   try {
//     const { name, email, phone, message, category } = req.body;

//     if (!name || !email || !phone || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const query = await Query.create({
//       name,
//       email,
//       phone,
//       message,
//       category: category || "Other",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Query submitted successfully",
//       data: query,
//     });
//   } catch (error) {
//     console.error("Query Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };
exports.getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      total: queries.length,
      data: queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await Query.findById(id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    await Query.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Query deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
