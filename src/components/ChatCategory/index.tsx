'use client';

import styles from './style.module.css';

import { IChatDataResponse } from '@/app/api/chat/route';
import { ChatCategoryCard } from './ChatCategoryCard';

export type ChatCategoryProps = {
    data: IChatDataResponse;
};

export const ChatCategory: React.FC<ChatCategoryProps> = ({ data }) => {
    const flattenedChoices = data.reduce<IChatDataResponse[0]['choices']>(
        (acc, chatGroupData) => {
            acc.push(...chatGroupData.choices);
            return acc;
        },
        []
    );
    console.log(flattenedChoices);

    const cards = flattenedChoices.map((choice, i) => (
        <ChatCategoryCard key={i} {...choice} />
    ));

    return (
        <div className={styles.container}>
            <div className={styles.cardsContainer}>{cards}</div>
        </div>
    );
};
