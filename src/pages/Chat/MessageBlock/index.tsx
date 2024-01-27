
import userImg from '@/public/chat/user.png'
import consiergeImg from '@/public/chat/cosierge.png'

import styles from './style.module.css';
import Image from 'next/image';
import { IChatProps } from '..';


export type IMessageBlockProps = IChatProps['messages'][0]

export const MessageBlock: React.FC<IMessageBlockProps> = ({userMsg, consiergeMsg}) => {
    return <div className={styles.container}>
        <div className={styles.userMessageContaner}>
            <div className={styles.userMessageIcon}>
                <Image src={userImg} alt='user icon' width={32} height={32}/>
            </div>
            <div className={styles.userMessageText}>
                {userMsg}
            </div>
        </div>
        <div className={styles.consiergeMessageContainer}></div>
    </div>;
};
