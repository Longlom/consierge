import userImg from '@/public/chat/user.png';
import consiergeImg from '@/public/chat/cosierge.png';

import styles from './style.module.css';
import Image from 'next/image';
import { IChatProps } from '..';
import { useEffect, useRef, useState } from 'react';

export type IMessageBlockProps = IChatProps['messages'][0] & {
    setAllMessages: (msg: IChatProps['messages']) => void;
};

const MessageBlock: React.FC<IMessageBlockProps> = ({
    userMsg,
    consiergeMsg,
    setAllMessages
}) => {
    const [isGenerating, setGenerating] = useState(false);
    const [shouldGenerating, setShouldGenerating] = useState(true);
    const consiergMsgRef = useRef<HTMLDivElement>(null);

    function saveMessageBlock(block: Required<IChatProps['messages'][0]>) {
        const url = new URL(
            `${process.env.NEXT_PUBLIC_URL}/api/chat/saveMessages`
        );

        url.searchParams.append('userMsg', block.userMsg);
        url.searchParams.append('consiergeMsg', block.consiergeMsg);
        console.log(url);
        fetch(url, {
            body: JSON.stringify({
                userMsg: block.userMsg,
                consiergeMsg: block.consiergeMsg
            }),
            method: 'POST'
        });
    }

    useEffect(() => {
        if (!consiergeMsg && !isGenerating && shouldGenerating) {
            setGenerating(true);
            setShouldGenerating(false);
            fetch(
                'https://back-concierge.rebooking.space/space/api/SpaceGPTProxy/',
                {
                    method: 'POST',
                    body: JSON.stringify({ query: userMsg }),
                    headers: {
                        key: '2k$m6lkxskaf*=$3c-+074+o6&r=ybxgdqd@0$=)-',
                        accept: 'application/json',
                        'Content-Type': 'application/json'
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
                                                    ?.innerHTML || ''
                                        });
                                        break;
                                    }

                                    let str = new TextDecoder().decode(value);
                                    console.log('str - ', str);
                                    if (consiergMsgRef.current) {
                                        consiergMsgRef.current.innerHTML =
                                            consiergMsgRef.current.innerHTML +
                                            str;
                                    }
                                }
                            }

                            controller.close();
                            reader.releaseLock();
                        }
                    });
                });
        }
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
                    {consiergeMsg}
                </div>
            </div>
        </div>
    );
};

export default MessageBlock;
