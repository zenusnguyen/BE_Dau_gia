module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      service: "gmail",
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port: env("SMTP_PORT", 587),
      // auth: {
      //   user: env('SMTP_USERNAME')||"zenusnguyen@gmail.com",
      //   pass: env('SMTP_PASSWORD')||"31011998aA",
      // }
      // secure: true,
      auth: {
        user: "jzay.noreply@gmail.com",
        pass: "31011998aBa",
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: "jzay.noreply@gmail.com",
      defaultReplyTo: "jzay.noreply@gmail.com",
    },
  },
});
