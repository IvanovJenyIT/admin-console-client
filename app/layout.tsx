import Header from '@/components/ui/Header/Header'
import { Inter } from 'next/font/google'
import '@/assets/styles/globals.scss'
import { Metadata } from 'next'
import AuthProvider from 'providers/auth-provider/AuthProvider'
import QueryProvider from 'providers/query-provider/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Movie admin panel'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryProvider>
					<AuthProvider>
						<Header />
						<main className="main">{children}</main>
					</AuthProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
