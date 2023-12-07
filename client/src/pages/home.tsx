import { UiButton } from '@/shared/ui/ui-button'
import { UiTextField } from '@/shared/ui/ui-text-field'
import { UiSelectField } from '@/shared/ui/ui-select-field'
import { UiLink } from '@/shared/ui/ui-link'
import { UiSpinner } from '@/shared/ui/ui-spinner'

import { UiHeader } from '@/shared/ui/ui-header'

import { ToggleBlockingButton } from '@/features/toggle-blocking/ui/toggle-blocking-button'
import { Profile } from '@/widgets/profile'

export default function HomePage() {
	// 3:04

	return (
		<div className={`min-h-screen flex flex-col`}>
			<UiHeader right={<Profile />} />
			<div className="grid grid-cols-[200px_1fr]">
				<aside className="px-5 pt-10">
					<ToggleBlockingButton />
				</aside>
				<main>Block List</main>
			</div>
		</div>
	)
}
