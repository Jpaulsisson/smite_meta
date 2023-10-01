/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    HIREZ_DEVID: process.env.HIREZ_DEVID,
    HIREZ_AUTHKEY: process.env.HIREZ_AUTHKEY,
    HIREZ_API_URL: process.env.HIREZ_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webcdn.hirezstudios.com',
        pathname: '/smite/*/*'
      }
    ]
  }
}

module.exports = nextConfig
