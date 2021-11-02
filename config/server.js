module.exports = ({ env }) => ({
  cron: { enabled: true },
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "6ad1a253ab0c1eea48c978f757ee8737"),
    },
  },
});
