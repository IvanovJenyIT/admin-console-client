import Link from 'next/link'
import styles from './Header.module.scss'

type Props = {}

const Logo = (props: Props) => {
	return (
		<Link href="/">
			<div className={styles.logo}>Admin consol</div>
		</Link>
	)
}

export default Logo
