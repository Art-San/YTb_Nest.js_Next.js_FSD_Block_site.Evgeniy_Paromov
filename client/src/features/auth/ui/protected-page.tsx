// import { authControllerGetSessionInfo } from '@/shared/api/generated'
// import { ROUTES } from '@/shared/constants/routes'
// import { UiPageSpinner } from '@/shared/ui/ui-page-spinner'
// import { useQuery } from '@tanstack/react-query'
// import { useRouter } from 'next/router'
// import { PropsWithChildren, ReactElement, useReducer } from 'react'

// export function protectedPage<P>(Component: (props: P) => ReactElement) {
// 	return function ProtectedPage(props: PropsWithChildren<P>) {
// 		const router = useRouter()

// 		const { data, isLoading, isError } = useQuery({
// 			queryKey: ['session'],
// 			queryFn: authControllerGetSessionInfo,
// 			retry: 0, // по умолчанию делает несколько попыток залогиниться
// 			staleTime: 5 * 60 * 1000, //4:32:35 избавлялись от лишних запросов. Если staleTime стал больше 0, у нас появляется потребность в ручной валидации.
// 		})

// 		if (isLoading) {
// 			return <UiPageSpinner />
// 		}

// 		if (isError) {
// 			router.replace(ROUTES.SIGN_IN) // replace кнопка назад работает
// 		}

// 		return <Component {...props} />
// 	}
// }

import { useSessionQuery } from '@/entities/session'
import { authControllerGetSessionInfo } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { UiPageSpinner } from '@/shared/ui/ui-page-spinner'

import { useRouter } from 'next/router'
import { PropsWithChildren, ReactElement, useReducer } from 'react'

export function protectedPage<P>(Component: (props: P) => ReactElement) {
	return function ProtectedPage(props: PropsWithChildren<P>) {
		const router = useRouter()

		const { isError, isLoading } = useSessionQuery()

		if (isLoading) {
			return <UiPageSpinner />
		}

		if (isError) {
			router.replace(ROUTES.SIGN_IN)
		}

		return <Component {...props} />
	}
}
