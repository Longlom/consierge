'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ConsiergeButton } from '@/components/ConsiergeButton';
import { CHAT_MESSAGE } from '@/pages/ChatCategory/ChatCategoryCard';

import sendImg from '@/img/send.svg';
import backArrow from '@/public/chat/ic_arrow back.svg';
import style from './style.module.css';
import MessageBlock from './MessageBlock';
import { ConsiergeInput } from '@/components/ConsiergeInput';

export type IChatProps = {
    messages: { userMsg: string; consiergeMsg?: string }[];
};

export const Chat: React.FC<IChatProps> = ({ messages = [] }) => {
    const router = useRouter();

    const [allMessages, setAllMessages] = useState(messages);
    const [usrInputMsg, setUsrInputMsg] = useState('');

    useEffect(() => {
        const mes = localStorage.getItem(CHAT_MESSAGE);
        console.log('mes - ', mes);
        if (mes) {
            setAllMessages(() => [...allMessages, { userMsg: mes }]);
        }
        return () => {
            localStorage.removeItem(CHAT_MESSAGE);
        };
    }, []);

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
                    <MessageBlock
                        {...msgEntity}
                        key={index}
                        setAllMessages={setAllMessages}
                    />
                ))}
            </div>

            <div className={style.input}>
                <ConsiergeInput
                    className={style.chatInput}
                    value={usrInputMsg}
                    placeholder="Задайте ваш вопрос"
                    onChange={(e) => setUsrInputMsg(e.target.value)}
                />
                <ConsiergeButton
                    buttonType="short"
                    className={style.chatInputButton}
                    onClick={(e) => {
                        setAllMessages((prevValue) => [
                            ...prevValue,
                            { userMsg: usrInputMsg }
                        ]);
                        setUsrInputMsg('');
                    }}
                >
                    <Image src={sendImg} alt="Send img" />{' '}
                </ConsiergeButton>
            </div>
        </div>
    );
};
