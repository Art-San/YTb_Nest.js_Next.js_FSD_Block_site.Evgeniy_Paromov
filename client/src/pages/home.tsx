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

// const inter = Inter({ subsets: ['latin'] }) // шрифты перенесли app.tsx

export default function HomePage() {
	// 3:04
	// useEffect(() => {
	// 	authControllerSignIn({ email: 'test@email.ru', password: '12345' }).then(
	// 		console.log
	// 	)
	// }, [])

	const { data } = useQuery({
		// useQuery для get
		queryKey: ['session'],
		queryFn: () => authControllerGetSessionInfo(),
	})
	console.log('data', data)

	return (
		<main className={`min-h-screen`}>
			<UiHeader right={<div> {data?.email}</div>} />
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
