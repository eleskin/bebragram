import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	
	const [name, setName] = useState('');
	// const [password, setPassword] = useState('');
	
	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		sessionStorage.setItem('name', name);
		navigate('/');
	};
	
	return (
		<form onSubmit={handleFormSubmit}>
			<input
				placeholder="Имя"
				value={name}
				onInput={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
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