export const ENVIRONMENT = {
  APP: {
    PORT: parseInt(process.env.PORT || process.env.APP_PORT || '5000'),
    ENV: process.env.NODE_ENV,
    CLIENT: process.env.FRONTEND_URL!,
  },
  DB: {
    URL: process.env.DB_URL!,
  },
  JWT: {
    KEY: process.env.JWT_SECRET!,
    EXPIRES_IN: process.env.JWT_EXPIRES!,
  },
};
