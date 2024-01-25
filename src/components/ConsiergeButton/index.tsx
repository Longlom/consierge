import styles from './style.module.css';

import cn from 'classnames';

export type IConsiergeButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    text?: string;
    buttonType: 'long' | 'short';
}

export const ConsiergeButton: React.FC<IConsiergeButton> = ({ className, text, buttonType = 'long', ...restProps }) => {


    return buttonType === 'long' ? (
        <button className={cn(className, styles.longButton)} {...restProps} > {text}</button>
    ) : (
        <button className={cn(className, styles.input)} {...restProps} />

    );
};
