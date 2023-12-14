import { HomePage } from '@/pages/home.page'
import { AppProvider } from './app-provider'

export function App() {
	return (
		<AppProvider>
			<HomePage />
		</AppProvider>
	)
}
