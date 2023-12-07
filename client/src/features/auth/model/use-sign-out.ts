// import { authControllerSignOut } from '@/shared/api/generated'
// import { ROUTES } from '@/shared/constants/routes'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useRouter } from 'next/router'

// export function useSignOut() {
// 	const queryClient = useQueryClient() // useQueryClient помогает управлять кешом, запросом.  решаем проблему связанную со staleTime в protectedPage, не показывает в заголовках session он за кешировалась. Если staleTime стал больше 0, у нас появляется потребность в ручной валидации
// 	const router = useRouter()

// 	// useQuery для get
// 	// useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
// 	// useMutation() НЕ НАШЕЛ isLoading
// 	const singOutMutation = useMutation({
// 		mutationFn: authControllerSignOut,
// 		async onSuccess() {
// 			router.push(ROUTES.SIGN_IN)
// 			queryClient.removeQueries() // в видео это есть (['session']).
// 			// queryClient.removeQueries(['session']) // очищаем состояние нашей session. Удаляем информацию о запросах
// 		},
// 	})

// 	return {
// 		isLoading: singOutMutation.isPending,
// 		singOut: singOutMutation.mutate,
// 	}
// }

import { useResetSession } from '@/entities/session/queries'
import { authControllerSignOut } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export function useSignOut() {
	const resetSession = useResetSession()
	const router = useRouter()

	// useQuery для get
	// useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
	// useMutation() НЕ НАШЕЛ isLoading
	const singOutMutation = useMutation({
		mutationFn: authControllerSignOut,
		async onSuccess() {
			router.push(ROUTES.SIGN_IN)
			resetSession()
		},
	})

	return {
		isLoading: singOutMutation.isPending,
		singOut: singOutMutation.mutate,
	}
}
