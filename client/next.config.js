// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: true,
// }

// module.exports = nextConfig

// 3:07:00
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	rewrites() {
		// rewrites Это встроенный редирект в next, для обхода ошибки связанные с CORS
		return [
			{
				source: '/api/:path*', // с этих путей
				destination: 'http://localhost:3000/:path*', // на этот
			},
		]
	},
}

module.exports = nextConfig
