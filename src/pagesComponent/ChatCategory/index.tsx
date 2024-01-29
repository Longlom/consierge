'use client';

import styles from './style.module.css';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { IChatDataResponse } from '@/app/api/chat/category/route';
import categoryImg from '@/img/category-arrow.png';
import sendImg from '@/img/send.svg';

import { CHAT_MESSAGE } from './ChatCategoryCard';
import ChatCategoryCard from './ChatCategoryCard';

import { ConsiergeInput } from '../../components/ConsiergeInput';
import { ConsiergeButton } from '../../components/ConsiergeButton';
import { useRouter } from 'next/navigation';

export type ChatCategoryProps = {
    data: IChatDataResponse;
};

const ChatCategory: React.FC<ChatCategoryProps> = ({ data }) => {
    const router = useRouter();

    const [currentActiveCategory, setCurrentActiveCategory] = useState(0);
    const [usrInputMsg, setUsrInputMsg] = useState('');

    const flattenedChoices = useMemo(() => {
        console.log(data);
        if (currentActiveCategory !== 0) {
            return data[currentActiveCategory - 1].choices;
        }
        return data.reduce<IChatDataResponse[0]['choices']>(
            (acc, chatGroupData) => {
                acc.push(...chatGroupData.choices);
                return acc;
            },
            []
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentActiveCategory]);

    const categories = useRef<HTMLDivElement>(null);

    const onCategoryClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (categories.current) {
            categories.current.childNodes.forEach((childNode, index) => {
                if (childNode === e.target) {
                    setCurrentActiveCategory(index);
                }
                (childNode as HTMLElement).classList.remove(styles.active);
            });

            (e.target as HTMLElement).classList.add(styles.active);
            (e.target as HTMLElement).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }

        e.stopPropagation();
    };

    const onSendMsgClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        localStorage.setItem(CHAT_MESSAGE, usrInputMsg);
        setUsrInputMsg('');
        router.push('/chat');
    };

    const cards = flattenedChoices.map((choice, i) => (
        <ChatCategoryCard key={i} {...choice} />
    ));

    console.log('data -', data)

    return (
        <div className={styles.container}>
            <div className={styles.categoryContainer}>
                <div className={styles.categoryArrowImg}>
                    <Image
                        src={categoryImg}
                        alt="arrow"
                        width={28}
                        height={28}
                    />
                </div>
                <div
                    className={styles.categories}
                    onClick={onCategoryClick}
                    ref={categories}
                >
                    <div className={classNames(styles.category, styles.active)}>
                        Выбор
                    </div>

                    {data.map(({ name }, i) => (
                        <div key={i} className={styles.category}>
                            {name}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.cardsContainer}>{cards}</div>
            <div className={styles.chatInputContainer}>
                <ConsiergeInput
                    type="text"
                    className={styles.input}
                    value={usrInputMsg}
                    placeholder="Задайте ваш вопрос"
                    onChange={(e) => setUsrInputMsg(e.target.value)}
                />
                <ConsiergeButton
                    onClick={onSendMsgClick}
                    className={styles.button}
                    buttonType="short"
                >
                    {' '}
                    <Image src={sendImg} alt="Send img" />{' '}
                </ConsiergeButton>
            </div>
        </div>
    );
};

export default ChatCategory;
