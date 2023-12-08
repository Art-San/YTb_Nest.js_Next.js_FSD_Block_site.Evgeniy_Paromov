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
		// placeholderData: (previousData, previousQuery) => previousData,
		// keepPreviousData: true, // работало в версии 4:35:7
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
