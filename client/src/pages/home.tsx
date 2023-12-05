import Image from 'next/image'
import { Inter } from 'next/font/google'
import {
	authControllerGetSessionInfo,
	authControllerSignIn,
} from '@/shared/api/generated'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
	// 3:04
	// useEffect(() => {
	// 	authControllerSignIn({ email: 'test@email.ru', password: '12345' }).then(
	// 		console.log
	// 	)
	// }, [])

	const { data } = useQuery({
		queryKey: ['session'],
		queryFn: () => authControllerGetSessionInfo(),
	})
	console.log('data', data)

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			{data?.email}
		</main>
	)
}
