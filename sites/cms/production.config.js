module.exports = {
  apps: [
    {
      name: 'cms',
      script: 'npm run start', // Replace with your actual start script
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      env_production: {
        NODE_ENV: 'production',
        DATABASE: process.env.DATABASE,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_HOST: process.env.DATABASE_HOST,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        DATABASE_PORT: process.env.DATABASE_PORT,
        DATABASE_PROVIDER: process.env.DATABASE_PROVIDER,
        DATABASE_PROTOCOL: process.env.DATABASE_PROTOCOL,
        WEB_PORT: process.env.WEB_PORT,
      },
    },
  ],
};
