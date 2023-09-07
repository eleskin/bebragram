import React, { FC } from 'react';
import styles from './Header.module.css';


const Header: FC = () => {
	return (
		<div className={styles.Header}>
			<div className={styles.chatInfo}>
				<h1 className={styles.chatName}>Bebragram</h1>
			</div>
		</div>
	);
};

export default Header;