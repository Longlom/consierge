import userImg from '@/public/chat/user.png';
import consiergeImg from '@/public/chat/cosierge.png';

import styles from './style.module.css';
import Image from 'next/image';
import { IChatProps } from '..';
import { useEffect, useRef, useState } from 'react';
import { CategoryType } from '@/app/api/chat/category/route';
import { replaceNewLineToHtml } from '@/lib/newLineToHtml';
import { CHAT_MESSAGE } from '@/pagesComponent/ChatCategory/ChatCategoryCard';

export type IMessageBlockProps = IChatProps['messages'][0] & {
    setAllMessages: (msg: IChatProps['messages']) => void;
    metadata?: null | { type: CategoryType, view?: string };
};

const API_MAPPER: Record<CategoryType, string> = {
    excursion: 'cityExpSpace',
    realPlace: 'getRealPlaces',
    facts: 'factsSpace',
    food: 'TA',
    free: 'spaceFreeQuestioin',
    weekendPlan: 'weekendSpace'
}

const MessageBlock: React.FC<IMessageBlockProps> = ({
    userMsg,
    consiergeMsg,
    metadata,
}) => {
    console.log('consiergeMsg?.includes -', consiergeMsg?.includes('\n'))
    const [isGenerating, setGenerating] = useState(false);
    const [shouldGenerating, setShouldGenerating] = useState(true);
    const consiergMsgRef = useRef<HTMLDivElement>(null);
    console.log('metadata - ', metadata)
    function saveMessageBlock(block: Required<IChatProps['messages'][0]>) {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_URL}/api/chat/saveMessages/`
        );

        console.log('block -', block)
        fetch(url, {
            body: JSON.stringify({
                userMsg: block.userMsg,
                consiergeMsg: block.consiergeMsg
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).finally(() => localStorage.removeItem(CHAT_MESSAGE));
    }

    useEffect(() => {
        if (!consiergeMsg && !isGenerating && shouldGenerating) {
            setGenerating(true);
            setShouldGenerating(false);
            const url = new URL(`https://back-concierge.rebooking.space/space/api/${API_MAPPER[metadata?.type || 'free']}/`);

            fetch(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify({ query: userMsg, city: localStorage.getItem('CITY'), view: metadata?.view }),
                    headers: {
                        key: '2k$m6lkxskaf*=$3c-+074+o6&r=ybxgdqd@0$=)-',
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }
            )
                .then((response) => response.body)

                .then((rs) => {
                    const reader = rs?.getReader();

                    return new ReadableStream({
                        async start(controller) {
                            setGenerating(true);
                            while (true) {
                                if (reader) {
                                    const { done, value } = await reader.read();

                                    if (done) {
                                        setGenerating(false);
                                        saveMessageBlock({
                                            userMsg,
                                            consiergeMsg:
                                                consiergMsgRef.current
                                                    ?.innerText || ''
                                        });
                                        consiergMsgRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
                                        break;
                                    }

                                    let str = new TextDecoder().decode(value);
                                    if (consiergMsgRef.current) {
                                        consiergMsgRef.current.innerHTML =
                                            consiergMsgRef.current.innerHTML +
                                            replaceNewLineToHtml(str);
                                    }
                                }
                            }

                            controller.close();
                            reader.releaseLock();
                        }
                    });
                })
                .catch((err) => { console.log(err) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.userMessageContaner}>
                <div className={styles.userMessageIcon}>
                    <Image
                        src={userImg}
                        alt="user icon"
                        width={32}
                        height={32}
                    />
                </div>
                <div className={styles.userMessageText}>{userMsg}</div>
            </div>
            <div className={styles.consiergeMessageContainer}>
                <div className={styles.cosiergeMessageIcon}>
                    <Image
                        src={consiergeImg}
                        alt="user icon"
                        width={32}
                        height={32}
                    />
                </div>
                <div
                    className={styles.cosiergeMessageText}
                    ref={consiergMsgRef}
                >
                    {consiergeMsg?.split('\n').map((str) => <>{str}<br/></>)}
                </div>
            </div>
        </div>
    );
};

export default MessageBlock;
