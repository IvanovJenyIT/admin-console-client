import React, {
	Dispatch,
	SetStateAction,
	useRef,
	useState,
	useEffect
} from 'react'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShown: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialVisible: boolean): TypeOut => {
	const [isShow, setIsShown] = useState(initialVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShown(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [])

	return { ref, isShow, setIsShown }
}
