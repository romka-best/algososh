import React from 'react';
import cn from 'classnames';

import { ElementStates } from '../../../types/element-states';

import styles from './column.module.css';

interface ColumnProps {
    value: number;
    state?: ElementStates;
    extraClass?: string;
}

export const Column: React.FC<ColumnProps> = (
    {
        value,
        state = ElementStates.Default,
        extraClass = '',
    }
) => (
    <div className={ cn(styles.content, extraClass) }>
        <div
            className={ cn(styles.column, styles[state]) }
            style={ { height: (340 * value) / 100 || 1 } }
        />
        <p className={ cn('text', 'text_type_column', 'text_color_input', 'mt-3') }>
            { value }
        </p>
    </div>
);
