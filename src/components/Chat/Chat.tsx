import React, {useState, ChangeEvent, FormEvent, useRef, useEffect} from 'react';
import styles from './Chat.module.css'; // Подключаем CSS-модуль

const Chat: React.FC = () => {
	const socket = new WebSocket('ws://localhost:8000/api/chat');
	
	const [messages, setMessages] = useState<{ _id: string; message: string; user: string }[]>([]);
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
					method: 'POST',
					user: sessionStorage.getItem('name') ?? '',
					message: newMessage,
				}));
			}
			
			socket.addEventListener('message', (event) => {
				setMessages(JSON.parse(event.data));
			});
			
			setNewMessage('');
		}
	};
	
	const handleDeleteMessage = (id: string) => {
		socket.send(JSON.stringify({
			method: 'DELETE',
			id
		}));
	};
	
	return (
		<div className={styles.chat}>
			<div className={styles.chatHeader}>
				<h2 className={styles.chatName}>Bebragram</h2>
			</div>
			<div className={styles.chatMessages} ref={chatContainerRef}>
				{messages.map((message) => (
					<div key={message._id} className={styles.message}>
						<i>{message.user}</i>
						<br/>
						<div>
							<span>{message.message}</span>
							<button onClick={handleDeleteMessage.bind(null, message._id)}>Удалить</button>
						</div>
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
