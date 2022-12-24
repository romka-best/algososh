import React from 'react';
import cn from 'classnames';

import { ReturnIcon } from '../icons/return-icon';

import styles from './return-button.module.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    extraClass?: string;
}

export const ReturnButton: React.FC<ButtonProps> = (
    {
        extraClass = '',
        ...rest
    }
) => {
    return (
        <button
            className={ cn(styles.button, extraClass) }
            type="button"
            { ...rest }
        >
            <ReturnIcon/>
            <p className={ cn('text', 'text_type_button', 'text_color_link', 'ml-4') }>
                К оглавлению
            </p>
        </button>
    );
};
