import React from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './radio-input.module.css';

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
    id?: string;
    label: string;
    extraClass?: string;
}

export const RadioInput: React.FC<RadioProps> = (
    {
        id,
        label = 'Введите текст',
        extraClass = '',
        ...rest
    }
) => {
    const uniqueId = id || nanoid();

    return (
        <div className={ cn(styles.content, extraClass) }>
            <input className={ styles.input } type="radio" id={ uniqueId } { ...rest } />
            <label className={ cn('text', 'text_type_button', styles.label) } htmlFor={ uniqueId }>
                { label }
            </label>
        </div>
    );
};
