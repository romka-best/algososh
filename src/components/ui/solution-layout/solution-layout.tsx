import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ReturnButton } from '../return-button/return-button';

import styles from './solution-layout.module.css';

interface SolutionLayoutProps {
    title: string;
    extraClass?: string;
}

export const SolutionLayout: React.FC<SolutionLayoutProps> = (
    {
        extraClass = '',
        title,
        children,
    }
) => {
    return (
        <main className={ cn(styles.content, extraClass) }>
            <div className={ styles.titleBox }>
                <h1 className={ cn('text', 'text_type_h2', 'text_color_h1', styles.title) }>
                    МБОУ АЛГОСОШ
                </h1>
                <span
                    className={ cn('text', 'text_type_fibonacci', 'text_color_secondary', styles.subtitle) }
                >
                    им. Фибоначчи
                </span>
            </div>
            <div className={ styles.contentCard }>
                <Link className={ styles.link } to="/">
                    <ReturnButton extraClass={ styles.returnButton }/>
                </Link>
                <h3 className={ cn('text', 'text_type_h3', 'text_color_h3', styles.cardTitle) }>
                    { title }
                </h3>
                { children }
            </div>
            <p
                className={ cn('text', 'text_type_column', 'text_color_input', 'mt-14', styles.copyright) }
            >
                © Сделано в Практикуме Романом Даниловым.
            </p>
        </main>
    );
};
