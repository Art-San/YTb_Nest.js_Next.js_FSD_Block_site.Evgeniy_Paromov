import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const sessionKey = ['session']

export function useSessionQuery() {
	return useQuery({
		queryKey: sessionKey,
		queryFn: authControllerGetSessionInfo,
		retry: 0, // по умолчанию делает несколько попыток залогиниться
		staleTime: 5 * 60 * 1000, //4:32:35 избавлялись от лишних запросов. Если staleTime стал больше 0, у нас появляется потребность в ручной валидации.
	})
}

export function useResetSession() {
	const queryClient = useQueryClient()
	return () => queryClient.removeQueries() // Убрали ключ queryKey: sessionKey чтоб удалялся весь кэш
	// return () => queryClient.removeQueries({ queryKey: sessionKey })
}

// 5:34:00
