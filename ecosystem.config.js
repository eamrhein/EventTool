module.exports = {
  apps: [
    {
      name: "Express App",
      script: "./app.js",
      instances: "max",
      autorestart: true,
      watch: true,
      exec_mode: "cluster",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
