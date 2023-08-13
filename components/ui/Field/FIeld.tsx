import { forwardRef } from 'react'
import { IField } from './field.interface'
import styles from './Field.module.scss'

const FIeld = forwardRef<HTMLInputElement, IField>(
	({ error, type = 'text', style, ...rest }, ref) => {
		return (
			<div className={styles.input} style={style}>
				<input ref={ref} type={type} {...rest} />
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

FIeld.displayName = 'Field'

export default FIeld
