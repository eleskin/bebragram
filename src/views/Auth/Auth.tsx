// Auth.tsx

import React, { useState } from 'react';
import styles from './Auth.module.css';

const Auth: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Здесь вы можете добавить логику для отправки данных авторизации
		// Например, вызов функции для отправки запроса на сервер
	};
	
	return (
		<div className={styles.authContainer}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						placeholder="Введите Email"
						value={email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="password">Пароль:</label>
					<input
						type="password"
						id="password"
						placeholder="Введите пароль"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="submit" className={styles.submitButton}>
					Войти
				</button>
			</form>
		</div>
	);
};

export default Auth;
