import Queue from './Queue';

import { ElementStates } from '../../types/element-states';
import { Step, OperationTypes } from './queue-page.types';

export function enqueue<T>(value: T, queue: Queue<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    steps.push({
        index: queue.tail,
        value,
        queue,
    });

    queue.enqueue(value);

    steps.push({
        queue,
    });

    return steps;
}

export function dequeue<T>(queue: Queue<T>): Step<T>[] {
    const steps: Step<T>[] = [];

    const prevQueue = new Queue<T>(queue._maxN);
    prevQueue.head = queue.head;
    prevQueue.tail = queue.tail;
    prevQueue._size = queue.size();
    prevQueue.queue = Array.from(queue.queue);

    steps.push({
        index: prevQueue.head,
        queue: prevQueue,
    });

    queue.dequeue();

    steps.push({
        queue,
    });

    return steps;
}

export function clear<T>(queue: Queue<T>) {
    const steps: Step<T>[] = [];

    steps.push({
        queue,
    });

    queue.clear();

    steps.push({
        queue,
    });

    return steps;
}

export function getLetterState<T>(
    index: number,
    currentStep: Step<T>,
    operationType: OperationTypes | null,
): ElementStates {
    if (!operationType || currentStep.index === undefined) {
        return ElementStates.Default;
    }

    if (index === currentStep.index) {
        return ElementStates.Changing;
    }

    return ElementStates.Default;
}
