'use client';

import styles from './style.module.css';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { IChatDataResponse } from '@/app/api/chat/category/route';
import categoryImg from '@/img/category-arrow.png';
import sendImg from '@/img/send.svg';

import { ChatCategoryCard } from './ChatCategoryCard';

import { ConsiergeInput } from '../ConsiergeInput';
import { ConsiergeButton } from '../ConsiergeButton';

export type ChatCategoryProps = {
    data: IChatDataResponse;
};

export const ChatCategory: React.FC<ChatCategoryProps> = ({ data }) => {
    const [currentActiveCategory, setCurrentActiveCategory] = useState(0);
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

    const onSendMsgClick: React.MouseEventHandler<HTMLButtonElement> = (
        e
    ) => {};

    const cards = flattenedChoices.map((choice, i) => (
        <ChatCategoryCard key={i} {...choice} />
    ));

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
                    placeholder="Задайте ваш вопрос"
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
