'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ConsiergeButton } from '@/components/ConsiergeButton';
import { CHAT_MESSAGE } from '@/pagesComponent/ChatCategory/ChatCategoryCard';

import sendImg from '@/img/send.svg';
import backArrow from '@/public/chat/ic_arrow back.svg';
import style from './style.module.css';
import MessageBlock from './MessageBlock';
import { ConsiergeInput } from '@/components/ConsiergeInput';
import { CategoryType } from '@/app/api/chat/category/route';

export type IChatProps = {
    messages: { userMsg: string; consiergeMsg?: string }[];
};

const Chat: React.FC<IChatProps> = ({ messages = [] }) => {
    const router = useRouter();
    console.log('messages - ', messages)

    const [allMessages, setAllMessages] = useState(messages);

    const [usrInputMsg, setUsrInputMsg] = useState('');
    const [msgMetadata, setMsgMetadata] = useState<null | {type: CategoryType, view?: string}>(null);

    useEffect(() => {
        const mes = JSON.parse(localStorage.getItem(CHAT_MESSAGE) || '{}');
        console.log('mes - ', mes);
        if (mes.description) {
            setMsgMetadata({type: mes.type, view: mes.view})
            setAllMessages(() => [...allMessages, { userMsg: mes.description,  }]);
        }
        return () => {
            localStorage.removeItem(CHAT_MESSAGE);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onBackButtonClick: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
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
                        metadata={msgMetadata}
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
                    onClick={() => {
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

export default Chat;