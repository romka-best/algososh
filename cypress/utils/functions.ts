import {
    CIRCLE_ROOT_SELECTOR,
    CIRCLE_CONTENT_SELECTOR,
    CIRCLE_HEAD_SELECTOR,
    CIRCLE_INDEX_SELECTOR,
    CIRCLE_TAIL_SELECTOR,
    BUTTON_LOADER_CLASS, CIRCLES_SELECTOR, CIRCLE_SMALL_ROOT_SELECTOR,
} from './constants';

export function isLoadingButtons(shouldAddButton, shouldDeleteButton, shouldResetButton) {
    const contain = 'contain';
    const notContain = 'not.contain';

    cy
        .get('@addButton')
        .invoke('attr', 'class')
        .should(shouldAddButton ? contain : notContain, BUTTON_LOADER_CLASS);
    cy
        .get('@deleteButton')
        .invoke('attr', 'class')
        .should(shouldDeleteButton ? contain : notContain, BUTTON_LOADER_CLASS);
    cy
        .get('@resetButton')
        .invoke('attr', 'class')
        .should(shouldResetButton ? contain : notContain, BUTTON_LOADER_CLASS);
}

interface IStep {
    head?: string;
    letter?: string;
    tail?: string;
    className: string;
    smallClassName?: string;
}

interface ICheckCirclesByStep {
    currentStep: Array<IStep>;
    checkElements: {
        checkHead: boolean;
        checkIndex: boolean;
        checkTail: boolean;
    };
}

export function checkCirclesByStep({ currentStep, checkElements }: ICheckCirclesByStep) {
    cy
        .get(CIRCLES_SELECTOR)
        .children(CIRCLE_CONTENT_SELECTOR)
        .should('have.length', currentStep.length);

    cy
        .get(CIRCLES_SELECTOR)
        .children(CIRCLE_CONTENT_SELECTOR)
        .each(($circle, index) => {
            const letterText = currentStep[index].letter ? currentStep[index].letter : '';
            const headText = currentStep[index].head ? currentStep[index].head : '';
            const indexText = index.toString();
            const tailText = currentStep[index].tail ? currentStep[index].tail : '';

            cy
                .wrap($circle.children(CIRCLE_ROOT_SELECTOR))
                .should(($element) => {
                    const className = $element[0].className;
                    expect(className).to.match(new RegExp(currentStep[index].className));
                })
                .and('have.text', letterText);

            if (currentStep[index].smallClassName) {
                cy
                    .wrap($circle.children(CIRCLE_SMALL_ROOT_SELECTOR))
                    .should(($element) => {
                        const className = $element[0].className;
                        expect(className).to.match(new RegExp(currentStep[index].className));
                    });
            }

            if (checkElements.checkHead) {
                cy
                    .wrap($circle.children(CIRCLE_HEAD_SELECTOR))
                    .should('have.text', headText);
            }
            if (checkElements.checkIndex) {
                cy
                    .wrap($circle.children(CIRCLE_INDEX_SELECTOR))
                    .should('have.text', indexText);
            }
            if (checkElements.checkTail) {
                cy
                    .wrap($circle.children(CIRCLE_TAIL_SELECTOR))
                    .should('have.text', tailText);
            }
        });
}
