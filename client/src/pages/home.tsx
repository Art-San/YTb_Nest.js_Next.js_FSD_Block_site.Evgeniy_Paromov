import Image from 'next/image'
// import { Inter } from 'next/font/google'
import {
	authControllerGetSessionInfo,
	authControllerSignIn,
} from '@/shared/api/generated'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UiButton } from '@/shared/ui/ui-button'
import { UiTextField } from '@/shared/ui/ui-text-field'
import { UiSelectField } from '@/shared/ui/ui-select-field'
import { UiLink } from '@/shared/ui/ui-link'
import { UiSpinner } from '@/shared/ui/ui-spinner'
import { UiPageSpinner } from '@/shared/ui/ui-page-spinner'
import { UiHeader } from '@/shared/ui/ui-header'
import { SignOutButton } from '@/features/auth'
import { useSessionQuery } from '@/entities/session/queries'

// const inter = Inter({ subsets: ['latin'] }) // шрифты перенесли app.tsx

export default function HomePage() {
	// 3:04

	// useQuery для get
	// useMutation для POST PUT Этот хук предоставляет удобный способ отправки запросов на создание, обновление или удаление данных на сервере.
	// useMutation() НЕ НАШЕЛ isLoading
	// const { data } = useQuery({
	// 	queryKey: ['session'],
	// 	queryFn: () => authControllerGetSessionInfo(),
	// })

	const { data } = useSessionQuery()

	return (
		<main className={`min-h-screen`}>
			<UiHeader
				right={
					<div>
						{data?.email}
						<SignOutButton />
					</div>
				}
			/>
			<UiButton variant="primary">hex</UiButton>
			<UiButton variant="secondary">hex</UiButton>
			<UiButton variant="outlined">hex</UiButton>
			<UiButton disabled variant="primary">
				Sign Out
			</UiButton>
			<UiTextField inputProps={{ placeholder: 'Enter email...' }} />
			<UiTextField
				label="Email"
				inputProps={{ placeholder: 'Enter email...' }}
			/>
			<UiTextField error="просто ошибка" />
			<UiSelectField options={[{ value: '1', label: 'options' }]} />
			<UiLink href={'/'}>fffffrrrr</UiLink>
			<UiSpinner className=" text-teal-600 w-20 h-20" />
			{/* <UiPageSpinner /> */}
		</main>
	)
}
