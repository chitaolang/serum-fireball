const withPlugins = require("next-compose-plugins");
const withTM = require('next-transpile-modules')
/** @type {import('next').NextConfig} */
const plugins = [
  [
    withTM,
    {
      webpack5: true,
      reactStrictMode: true,
    },
  ],
];
const nextConfig = {
  swcMinify: false,
  webpack: (config, {
    isServer
  }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = withPlugins(plugins, nextConfig);
