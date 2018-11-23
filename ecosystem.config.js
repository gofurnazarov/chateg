module.exports = {
  apps : [{
    name: 'chateg-app',
    cwd: 'D:/3.Front-end/chateg-app',
    exec_mode: 'fork', 
    instances: 1,
    script: 'server/index.js',
    args: 'cross-env NODE_ENV=production --interpreter babel-node',
    max_restarts: 10,
    restart_delay: 30000,
    env: {
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: '1001',
      BASE_URL: 'http://127.0.0.1:1001'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: '1001',
      BASE_URL: 'http://127.0.0.1:1001'
    }
  }],
};
