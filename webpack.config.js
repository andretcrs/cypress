const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'cypress/support/actions'),
      '@pages': path.resolve(__dirname, 'cypress/support/pages'),
      '@factories': path.resolve(__dirname, 'cypress/support/dataFactory'),
      '@support': path.resolve(__dirname, 'cypress/support'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};