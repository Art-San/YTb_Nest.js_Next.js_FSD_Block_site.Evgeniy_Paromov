import { UiButton } from '@/shared/ui/ui-button'

import { UiTextField } from '@/shared/ui/ui-text-field'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export function SignUpForm() {
	const { register, handleSubmit } = useForm<{
		email: string
		password: string
	}>()
	// useQuery для get
	// useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
	// useMutation()

	return (
		<form
			className="flex flex-col gap-2"
			onSubmit={handleSubmit((data) => console.log(data))}
		>
			<UiTextField
				label="Email"
				inputProps={{ ...register('email', { required: true }) }}
			/>
			<UiTextField
				label="Password"
				inputProps={{ ...register('password', { required: true }) }}
			/>
			<UiButton variant="primary">Sign Up</UiButton>
		</form>
	)
}
// import { ROUTES } from "@/shared/constants/routes";
// import { UiButton } from "@/shared/ui/ui-button";
// import { UiLink } from "@/shared/ui/ui-link";
// import { UiTextField } from "@/shared/ui/ui-text-field";
// import { useSignUpForm } from "../model/use-sign-up-form";

// export function SignUpForm() {
//   const { handleSubmit, isLoading, register, errorMessage } = useSignUpForm();

//   return (
//     <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
//       <UiTextField
//         label="Email"
//         inputProps={{ type: "email", ...register("email", { required: true }) }}
//       />
//       <UiTextField
//         label="Password"
//         inputProps={{
//           type: "password",
//           ...register("password", { required: true }),
//         }}
//       />
//       <UiButton disabled={isLoading} variant="primary">
//         Sign Up
//       </UiButton>
//       <UiLink className="text-center" href={ROUTES.SIGN_IN}>
//         Sign In
//       </UiLink>
//       {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
//     </form>
//   );
// }
