// Тоже рабочий вариант
// import {
// 	accountControllerGetAccount,
// 	accountControllerPatchAccount,
// } from '@/shared/api/generated'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// const accountKey = ['account']
// export function useAccountQuery() {
// 	return useQuery({
// 		queryKey: accountKey,
// 		queryFn: accountControllerGetAccount,
// 	})
// }

// Важная тема повторяет на 4:55:00
// export function useUpdateAccountMutation() {
// 	const queryClient = useQueryClient()
// 	return useMutation({
// 		mutationFn: accountControllerPatchAccount,
// 		async onSettled(data) {
// 			await queryClient.invalidateQueries({ queryKey: accountKey })
// 		},
// 	})
// }

// { queryKey: sessionKey }

import {
	accountControllerGetAccount,
	accountControllerPatchAccount,
} from '@/shared/api/generated'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const accountKey = ['account']
export function useAccountQuery() {
	return useQuery({
		queryKey: accountKey,
		queryFn: accountControllerGetAccount,
	})
}

export function useUpdateAccountMutation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: accountControllerPatchAccount,
		onSuccess(data) {
			queryClient.setQueryData(accountKey, data)
		},
		async onSettled() {
			queryClient.invalidateQueries({ queryKey: accountKey })
		},
	})
}

// // { queryKey: sessionKey }
