/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsHmrCache: false, //default to true
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "ymqpkygmownybanldbpq.supabase.co",
          },
        ],
      },
    async headers(){
        return [
            {
                source:"/embed",
                headers:[
                    {
                        key:"Content-Security-Policy",
                        value:"frame-ancestors 'self' https://vehicl.vercel.app"
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
