/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    // Configuración para polling
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // Verifica cambios cada segundo
        aggregateTimeout: 300, // Retraso antes de volver a compilar
      };
    }

    return config
  }
}
