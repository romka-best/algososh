import React from 'react';
import cn from 'classnames';

import { ElementStates } from '../../../types/element-states';

import styles from './circle.module.css';

interface CircleProps {
    state?: ElementStates;
    letter?: string;
    head?: string | React.ReactElement | null;
    index?: number;
    tail?: string | React.ReactElement | null;
    tailType?: 'string' | 'element';
    extraClass?: string;
    isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = (
    {
        state = ElementStates.Default,
        letter,
        head,
        index,
        tail,
        extraClass = '',
        isSmall,
    }
) => {
    return (
        <div className={ cn(styles.content, extraClass) }>
            <div
                className={ cn('text',
                    'text_type_input',
                    'text_color_input',
                    'mb-4',
                    styles.absolute,
                    styles.head,
                    styles[typeof head === 'string' ? 'string' : 'element'],
                )
                }
            >
                { head }
            </div>
            <div
                className={ cn(styles.circle, isSmall && styles.small, styles[state]) }
            >
                { letter && (
                    <p
                        className={ cn('text', 'text_type_circle', 'text_color_input', styles.letter) }
                    >
                        { letter }
                    </p>
                ) }
            </div>
            { index !== undefined && (
                <p
                    className={ cn('text',
                        'text_type_input',
                        'text_color_input',
                        'mt-4',
                        styles.absolute,
                        styles.index,
                    ) }
                >
                    { index.toString() }
                </p>
            ) }
            <div
                className={ cn(
                    'text',
                    'text_type_input',
                    'text_color_input',
                    'mt-4',
                    styles.absolute,
                    styles.tail,
                    index?.toString() ? styles.tail60 : styles.tail30,
                    styles[typeof tail === 'string' ? 'string' : 'element'],
                ) }
            >
                { tail }
            </div>
        </div>
    );
};
