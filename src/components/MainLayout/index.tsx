import { Header } from '@/components/Header';
import styles from './style.module.css';

export type IMainLayout = {
    children?: React.ReactNode;
};

export const MainLayout: React.FC<IMainLayout> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.content}>

            </div>
            {children}
        </div>
    );
};
