require("dotenv").config();

module.exports = {
  port: 5000,
  database: {
    connectURL:
      "mongodb+srv://pitanihamsaraj:kJNhiY3PXedIjHTO@cluster0.gmejwfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenExp: "1d",
  },
  mailer: {
    noReplyEmailId: "noreply@roombuddy.in",
    apiKey: process.env.SENDGRID_API_KEY,
  },
};
