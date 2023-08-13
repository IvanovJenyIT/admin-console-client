import { StaticImageData } from 'next/image'

export interface IUser {
	id: number
	name: string
	email: string
	avatarPath: string | StaticImageData
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
