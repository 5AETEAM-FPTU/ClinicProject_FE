import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/app/i18n/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fpt.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "**",
                port: "",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
