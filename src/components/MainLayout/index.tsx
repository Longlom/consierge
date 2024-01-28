import cn from 'classnames';

import { Header } from '@/components/Header';
import styles from './style.module.css';

export type IMainLayout = {
    children?: React.ReactNode;
    withoutTopPadding?: boolean; 
    className?: string;
};

export const MainLayout: React.FC<IMainLayout> = ({ children, withoutTopPadding = false, }) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={cn(styles.content, {[styles.withoutPadding]: withoutTopPadding})}>
                {children}

            </div>
        </div>
    );
};
