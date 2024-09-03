// vue.config.js
module.exports = {
  devServer: {
    server: {
      type: 'https', // Use HTTPS for the development server
    },
    port: 8080, // Specify the port number for the development server
    client: {
      webSocketURL: {
        hostname: 'localhost', // The hostname to be used in WebSocket URL
        port: 8080, // The port to be used in WebSocket URL
        protocol: 'wss', // Use secure WebSocket protocol
      },
    },
    allowedHosts: 'all', // Allows connections from all hosts (useful in certain network setups)
  },
};
