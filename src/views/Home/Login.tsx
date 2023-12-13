import {ChangeEvent, FormEvent, useState} from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
	};
	
	return (
		<form onSubmit={handleFormSubmit}>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onInput={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onInput={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
			/>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;