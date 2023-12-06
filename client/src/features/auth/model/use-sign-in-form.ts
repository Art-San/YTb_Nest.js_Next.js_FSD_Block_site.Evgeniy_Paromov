import { authControllerSignIn } from '@/shared/api/generated'
import { ROUTES } from '@/shared/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export function useSignInForm() {
	const router = useRouter()

	const { register, handleSubmit } = useForm<{
		email: string
		password: string
	}>()

	// useQuery для get
	// useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
	// useMutation() НЕ НАШЕЛ isLoading

	const signInMutation = useMutation({
		mutationFn: authControllerSignIn,
		onSuccess() {
			router.push(ROUTES.HOME)
		},
	})

	const errorMessage = signInMutation.error ? 'Sign in faled' : undefined

	return {
		register,
		errorMessage,
		handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
		isLoading: signInMutation.isPending,
	}
}
