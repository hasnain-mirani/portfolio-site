/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },  
  reactStrictMode: true,
 
};
// 👇 CommonJS export
export default nextConfig;
