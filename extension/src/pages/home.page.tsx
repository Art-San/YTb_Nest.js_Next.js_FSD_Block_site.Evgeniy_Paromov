import { useSessionQuery } from '@/entities/session'

export function HomePage() {
	const { data: session } = useSessionQuery()
	return <div className=" text-red-500">HomePage {session?.email}</div>
}
