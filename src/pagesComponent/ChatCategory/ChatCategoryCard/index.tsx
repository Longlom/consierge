'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import bookmarkImg from '@/public/category/ic_bookmark.svg';

import styles from './style.module.css';

import { ChatCategoryProps } from '..';

export type ChatCategoryCardProps = ChatCategoryProps['data'][0]['choices'][0];

export const CHAT_MESSAGE = 'CHAT_MESSAGE';

const ChatCategoryCard: React.FC<ChatCategoryCardProps> = ({
    description,
    view,
    type,
    title,
    promptText,
    img
}) => {
    const router = useRouter();
    const onCategoryClick: React.MouseEventHandler<HTMLDivElement> = () => {
        localStorage.setItem(CHAT_MESSAGE, JSON.stringify({description: promptText.replace('${city}', localStorage.getItem('CITY') || ''), type, view}));
        router.push('/chat');
    };
    return (
        <div className={styles.card} onClick={onCategoryClick}>
            <div className={styles.cardImg}>
                <div className={styles.cardChoiceImg}>
                    <Image
                        src={`/category/${img}`}
                        alt={img}
                        width={24}
                        height={24}
                    />
                </div>
                <div className={styles.cardBookmarkImg}>
                    <Image src={bookmarkImg} alt={img} width={24} height={24} />
                </div>
            </div>
            <div className={styles.cardHeader}>{title}</div>
            <div className={styles.cardDescription}>{description}</div>
        </div>
    );
};

export default ChatCategoryCard;
