'use client'
import { useOutside } from '@/hooks/useOutside'
import React, { FC, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IAuthFields } from './login-form.interface'
import { useAuth } from '@/hooks/useAuth'
import styles from './LoginForm.module.scss'
import { FaRegUserCircle } from 'react-icons/fa'
import FIeld from '../../Field/FIeld'
import Button from '../../Button/Button'
import { validEmail } from './login-auth.constants'
import UserAvatar from '../../UserAvatar/UserAvatar'
import { motion } from 'framer-motion'
import { menuAnimation } from '@/utils/animation/fade'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'

const LoginForm: FC = () => {
	const { ref, isShow, setIsShown } = useOutside(false)

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<IAuthFields>({
		mode: 'onChange'
	})

	const { setUser, user } = useAuth()

	const { mutate: loginSync } = useMutation(
		['login'],
		(data: IAuthFields) => AuthService.login(data.email, data.password),
		{
			onSuccess(data) {
				if (setUser) {
					setUser(data.user)
				}
				reset()
				setIsShown(false)
			}
		}
	)

	const { mutate: registerSync } = useMutation(
		['register'],
		(data: IAuthFields) => AuthService.register(data.email, data.password),
		{
			onSuccess(data) {
				if (setUser) {
					setUser(data.user)
				}
				reset()
				setIsShown(false)
			}
		}
	)

	const onSubmit: SubmitHandler<IAuthFields> = (data) => {
		if (type === 'login') loginSync(data)
		else if (type === 'register') registerSync(data)
	}

	return (
		<div className={styles.wrapper} ref={ref}>
			{user ? (
				<UserAvatar
					title="Go to admin pannel"
					avatarPath={user.avatarPath || ''}
					link="/dashboard"
				/>
			) : (
				<button onClick={() => setIsShown(!isShow)} className={styles.button}>
					<FaRegUserCircle />
				</button>
			)}
			<motion.div
				initial={false}
				animate={isShow ? 'open' : 'closed'}
				variants={menuAnimation}
			>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<FIeld
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please enter a valid email address'
							}
						})}
						placeholder="Email"
						error={errors.email}
					/>
					<FIeld
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Min length should more 6 symbols'
							}
						})}
						placeholder="Password"
						error={errors.password}
						type={'password'}
					/>
					<div className={styles.loginButton}>
						<Button onClick={() => setType('login')}>Login</Button>
					</div>
					<button
						className={styles.register}
						onClick={() => setType('register')}
					>
						Register
					</button>
				</form>
			</motion.div>
		</div>
	)
}

export default LoginForm
