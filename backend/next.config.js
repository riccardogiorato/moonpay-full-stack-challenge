module.exports = {
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/api/:slug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/exchange-routing?amount=1",
        permanent: true,
      },
    ];
  },
};
