// AppProvider инициализируем его тут в app слое
// содержит в себе все провайдеры которые будем передавать в низ
import { queryClient } from '@/shared/api/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export function AppProvider({ children }: { children?: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider> // 3:11:04
	)
}

// queryClient это объект который хранит в себе кэш приложения
