/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
        {
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, 
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
  },
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
