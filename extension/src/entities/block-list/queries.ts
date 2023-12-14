import {
	blockListControllerAddBlockItem,
	blockListControllerGetList,
	blockListControllerRemoveBlockItem,
} from '@/shared/api/generated'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const blockListKey = ['block-list'] as unknown[]
// 4:58:09
export function useBlockListQuery({ q }: { q?: string }) {
	return useQuery({
		queryKey: blockListKey.concat([{ q }]),
		queryFn: () => blockListControllerGetList({ q }),
		placeholderData: (previousData, previousQuery) => previousData, // Решает проблему с отражением лоудера во время ввода в строку поиска значений. Каждый раз когда мы меняем q для react-query это новый запрос.
		// keepPreviousData: true, // Решает проблему с помощью keepPreviousData, работало в версии 4:35:7
	})
}

export function useAddBlockItemMutation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: blockListControllerAddBlockItem,
		async onSettled() {
			await queryClient.invalidateQueries({ queryKey: blockListKey })
		},
	})
}

export function useRemoveBlockItemMutation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: blockListControllerRemoveBlockItem,
		async onSettled() {
			await queryClient.invalidateQueries({ queryKey: blockListKey })
		},
	})
}
