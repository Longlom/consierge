'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { ConsiergeButton } from '@/components/ConsiergeButton';
import { CHAT_MESSAGE } from '@/components/ChatCategory/ChatCategoryCard';

import backArrow from '@/public/chat/ic_arrow back.svg';
import style from './style.module.css';
import { MessageBlock } from './MessageBlock';

export type IChatProps = {
    messages: { userMsg: string; consiergeMsg?: string }[];
};

export const Chat: React.FC<IChatProps> = ({ messages = [] }) => {
    const router = useRouter();

    const [allMessages, setAllMessages] = useState(messages);

    useEffect(() => {
        const mes = localStorage.getItem(CHAT_MESSAGE);
        console.log('mes - ', mes);
        if (mes) {
            setAllMessages(() => [...allMessages, {userMsg: mes}]);
        }
        return () => {
            localStorage.removeItem(CHAT_MESSAGE);
        }
    }, []);

    // const allMessages = useMemo(() => {
    //     const mes = localStorage.getItem(CHAT_MESSAGE)
    //     console.log('mes - ', mes)
    //     localStorage.removeItem(CHAT_MESSAGE);
    //     if (mes) {
    //         const result = messages.slice();
    //         result.push({userMsg: mes})
    //         return result;
    //     }
    //     console.log('messages - ', messages)
    //     return messages.slice();
    // }, []);

    const onBackButtonClick: React.MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {
        router.push('/');
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div>
                    <ConsiergeButton
                        buttonType="short"
                        className={style.backButton}
                        onClick={onBackButtonClick}
                    >
                        <Image
                            src={backArrow}
                            alt="backArrow"
                            width={24}
                            height={24}
                        />
                    </ConsiergeButton>
                </div>
            </div>

            <div className={style.content}>
                {allMessages.map((msgEntity, index) => (
                    <MessageBlock {...msgEntity} key={index}/>
                ))}
            </div>

            <div className={style.input}></div>
        </div>
    );
};
