'use client'
import {
	FC,
	PropsWithChildren,
	createContext,
	useState,
	useEffect
} from 'react'
import { IContext, TypeUserState } from './auth.interface'
import Cookies from 'js-cookie'
import { AuthService } from '@/services/auth/auth.service'
import { usePathname } from 'next/navigation'

export const AuthContext = createContext({} as IContext)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)
	const pathname = usePathname()

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) {
			const user = JSON.parse(localStorage.getItem('user') || '')
			setUser(user)
		}
	}, [])

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (!accessToken && !user) {
			AuthService.logout()
			setUser(null)
		}
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
