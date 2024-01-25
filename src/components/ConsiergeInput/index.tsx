import styles from './style.module.css';

import cn from 'classnames';

export type IConsiergeInput = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}

export const ConsiergeInput: React.FC<IConsiergeInput> = ({ className, ...restProps }) => {
    return (
        <input className={cn(className, styles.input)} {...restProps} />
    );
};
