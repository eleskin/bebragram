import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	
	const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	
	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		sessionStorage.setItem('email', email);
		navigate('/');
	};
	
	return (
		<form onSubmit={handleFormSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onInput={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
			/>
			{/*<input*/}
			{/*	type="password"*/}
			{/*	placeholder="Password"*/}
			{/*	value={password}*/}
			{/*	onInput={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}*/}
			{/*/>*/}
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;