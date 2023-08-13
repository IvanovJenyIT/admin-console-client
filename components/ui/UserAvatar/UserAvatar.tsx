import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './UserAvatar.module.scss'

const UserAvatar: FC<{
	avatarPath: string | StaticImageData
	link: string
	title?: string
}> = ({ avatarPath, link, title }) => {
	return (
		<Link href={link} title={title}>
			<Image
				className={styles.avatar}
				src={avatarPath}
				width={40}
				height={40}
				alt=""
			/>
		</Link>
	)
}

export default UserAvatar
