import Image from 'next/image';
import styles from './style.module.css';

import headerImg from '@/img/header-logo.svg';

export const Header: React.FC = () => {
    return (
        <>
            {' '}
            <Image
                src={headerImg}
                alt="Rebooking img"
                className={styles.headerImage}
            />
        </>
    );
};
