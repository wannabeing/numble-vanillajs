module.exports = {
  apps: [
    {
      name: "app",
      script: "./build/server.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
