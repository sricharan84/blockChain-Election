/**
 * @author hitjoshi@deloitte.com
 * Database config files
 */

var config = {
  development: {
    mode: 'local',
    port: process.env.PORT || 3000,
    mongoUri: "mongodb://localhost:27017/vElect",
    providerEndpoint: 'http://localhost:8545',
    seedDB: false,
    secrets: {
      session: 'mockingjay'
    },
    // userRoles: [100, 200, 300, 400],
    // coinbasePwd: 'mockingjay',
    // providerEndpoint: 'http://localhost:8545',
    ipfsIp: '127.0.0.1',
    ipfsPort: 5001

  },
  staging: {
    mode: 'staging',
    port: process.env.PORT || 5000,
    mongoUri: 'mongodb://localhost:27017/bc-kotak',
    seedDB: false,
    secrets: {
      session: 'mockingjay'
    },
    userRoles: [100, 200, 300, 400],
    coinbasePwd: 'mockingjay',
    providerEndpoint: 'http://localhost:8545',
    ipfsIp: '127.0.0.1',
    ipfsPort: 5001
  },
  production: {
    mode: 'local',
    port: process.env.PORT || 3000,
    mongoUri: "mongodb://localhost:27017/vElect",
    providerEndpoint: 'http://localhost:8545',
    seedDB: false,
    secrets: {
      session: 'mockingjay'
    },
    // userRoles: [100, 200, 300, 400],
    // coinbasePwd: 'mockingjay',
    // providerEndpoint: 'http://localhost:8545',
    ipfsIp: '127.0.0.1',
    ipfsPort: 5001

  },

};

exports.get = function get(mode) {
  return config[mode || process.argv[2] || 'local'] || config.development;
};
