import { useAddBlockItemMutation } from '@/entities/block-list/queries'
import { AddBlockItemDtoType } from '@/shared/api/generated'
import { useForm } from 'react-hook-form'

export function useAddBlockItemForm() {
	const { handleSubmit, register, watch, reset } = useForm<{
		type: AddBlockItemDtoType
		data: string
	}>({
		defaultValues: {
			// дефолтное значение в форме
			type: AddBlockItemDtoType.Website,
		},
	})

	const addBlockItemMutation = useAddBlockItemMutation()

	const type = watch('type')

	return {
		handleSubmit: handleSubmit((data) => {
			addBlockItemMutation.mutate(data, {
				onSuccess() {
					reset() // очистка формы при успехе
				},
			})
		}),
		isLoading: addBlockItemMutation.isPending,
		// isLoading: addBlockItemMutation.isLoading,
		register,
		type,
	}
}
