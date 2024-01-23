'use client';

import styles from './style.module.css';

import { ChatCategoryProps } from '..';

export type ChatCategoryCardProps = Pick<
    ChatCategoryProps['data'][0]['choices'][0],
    'description' | 'title'
>;

export const ChatCategoryCard: React.FC<ChatCategoryCardProps> = ({
    description,
    title
}) => {
    return <div className={styles.card}>
        <div className={styles.cardImg}></div>
        <div className={styles.cardHeader}>{title}</div>
        <div className={styles.cardDescription}>{description}</div>
    </div>;
};
