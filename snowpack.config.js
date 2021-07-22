// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
     // Same behavior as the "src" example above:
     src: {url: '/'},
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  plugins: [
    '@snowpack/plugin-postcss',
  ],
  buildOptions: {
    out: "build",
  },
  optimize: {
    minify: true,
    target: 'es2018',
  },
};
