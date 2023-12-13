import React, {useState, ChangeEvent, FormEvent, useRef, useEffect} from 'react';
import styles from './Chat.module.css'; // Подключаем CSS-модуль

const Chat: React.FC = () => {
	const [messages, setMessages] = useState<{ message: string; user: string }[]>([
		{ user: "Александр Елескин", message: "Привет, как ты считаешь, как на Украине действуют американские кураторы?" },
		{ user: "Александр Власов", message: "Здравствуй, Александр. Это интересная тема. Мне кажется, они оказывают влияние на политику и экономику." },
		{ user: "Максим", message: "Да, согласен с тобой, Александр Власов. Американские кураторы могут поддерживать определенные политические фракции." },
		{ user: "Саша Бочкин", message: "Интересно, какие именно фракции они могут поддерживать? Есть ли какие-то доказательства?" },
		{ user: "Герман", message: "Я слышал, что американские кураторы могут финансировать некоторые неправительственные организации и медиа для поддержки своих интересов." },
		{ user: "Последний Самурай", message: "Думаю, важно оценивать факты и анализировать информацию. Это поможет лучше понять ситуацию." },
		{ user: "Александр Елескин", message: "Согласен, важно иметь критический взгляд на информацию и проводить независимый анализ." },
		{ user: "Александр Власов", message: "А как вы считаете, как это может повлиять на Украину в долгосрочной перспективе?" },
		{ user: "Максим", message: "Долгосрочные последствия могут быть разнообразными. Важно следить за развитием событий и искать независимые источники информации." },
		{ user: "Саша Бочкин", message: "Согласен с вами, Максим. Важно оставаться информированным и анализировать события." },
		{ user: "Герман", message: "Да, и важно участвовать в диалоге и обсуждении, чтобы лучше понимать ситуацию." },
		{ user: "Последний Самурай", message: "Согласен. Обмен мнениями и анализ информации помогают формировать более полное представление." },
		{ user: "Александр Власов", message: "Кстати, на Украине также активно обсуждают нацистов. Как вы считаете, какова роль экстремистских группировок в современной политике?" },
		{ user: "Максим", message: "Это сложная тема. Экстремистские группировки могут создавать напряженность в обществе и влиять на политические процессы." },
		{ user: "Саша Бочкин", message: "Да, согласен. Важно бороться с экстремизмом и поддерживать демократические ценности." },
		{ user: "Герман", message: "Надеюсь, что правительство принимает меры для предотвращения экстремизма и обеспечения безопасности граждан." },
		{ user: "Саша Бочкин", message: "А вот я недавно встретил интересную девушку. Хочу познакомиться с ней, но не знаю, как начать разговор. Можете подсказать?" },
		{ user: "Последний Самурай", message: "Конечно, Саша. Попробуй начать с общих интересов или спроси о ее хобби. Важно слушать и проявлять интерес к тому, что она рассказывает." },
		{ user: "Александр Елескин", message: "И не забывай быть самим собой. Подходи с открытым сердцем и добрыми намерениями." },
		{ user: "Александр Власов", message: "Удачи, Саша! Важно быть уверенным и честным в общении." },
	]);
	const [newMessage, setNewMessage] = useState<string>('');
	
	const chatContainerRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		// Проверяем, что chatContainerRef.current не равен null
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [messages]);
	
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);
	};
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (newMessage.trim() !== '') {
			setMessages([...messages, {message: newMessage, user: 'Александр Елескин'}]);
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
