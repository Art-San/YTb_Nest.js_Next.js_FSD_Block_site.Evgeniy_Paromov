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
		placeholderData: (previousData, previousQuery) => previousData,
		// keepPreviousData: true, // работало в 4:35:7
	})
}

export function useAddBlockItemMutation() {
	const queyrClient = useQueryClient()
	return useMutation({
		mutationFn: blockListControllerAddBlockItem,
		async onSettled() {
			await queyrClient.invalidateQueries({ queryKey: blockListKey })
		},
	})
}

export function useRemoveBlockItemMutation() {
	const queyrClient = useQueryClient()
	return useMutation({
		mutationFn: blockListControllerRemoveBlockItem,
		async onSettled() {
			await queyrClient.invalidateQueries({ queryKey: blockListKey })
		},
	})
}
