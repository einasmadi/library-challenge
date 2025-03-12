import withImages from 'next-images';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
};

export default withImages(nextConfig);