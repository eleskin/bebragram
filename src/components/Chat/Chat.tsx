import React, {useState, ChangeEvent, FormEvent, useRef, useEffect} from 'react';
import styles from './Chat.module.css'; // Подключаем CSS-модуль

const Chat: React.FC = () => {
	const socket = new WebSocket('ws://localhost:8000/api/chat');
	
	const [messages, setMessages] = useState<{ message: string; user: string }[]>([]);
	const [newMessage, setNewMessage] = useState<string>('');
	
	const chatContainerRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages]);
	
	
	useEffect(() => {
		socket.addEventListener('message', (event) => {
			setMessages(JSON.parse(event.data));
		});
		// eslint-disable-next-line
	}, []);
	
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
	};
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newMessage.trim() !== '') {
			if (socket.readyState === 1) {
				socket.send(JSON.stringify({
					user: sessionStorage.getItem('name') ?? '',
					message: newMessage,
				}));
			}
			
			socket.addEventListener('message', (event) => {
				console.log(event);
				setMessages(JSON.parse(event.data));
			});
			
			setNewMessage('');
		}
	};
	
	return (
		<div className={styles.chat}>
			<div className={styles.chatHeader}>
				<h2 className={styles.chatName}>Bebragram</h2>
			</div>
			<div className={styles.chatMessages} ref={chatContainerRef}>
				{messages.map((message, index) => (
					<div key={index} className={styles.message}>
						<i>{message.user}</i>
						<br/>
						<span>{message.message}</span>
					</div>
				))}
			</div>
			<form className={styles.messageForm} onSubmit={handleSubmit}>
				<input
					type="text"
					className={styles.messageInput}
					placeholder="Введите сообщение..."
					value={newMessage}
					onInput={handleInputChange}
				/>
				<button type="submit" className={styles.sendMessageButton}>
					Отправить
				</button>
			</form>
		</div>
	);
};

export default Chat;
