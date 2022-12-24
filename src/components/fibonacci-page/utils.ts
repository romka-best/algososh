export function* getFibonacciNumbers(number: number): Generator<Array<number>> {
    const numbers: Array<number> = [];
    for (let i = 0; i <= number; i++) {
        if (i < 2) {
            numbers.push(1);
        } else {
            numbers.push(numbers[i - 2] + numbers[i - 1]);
        }
        yield numbers;
    }

    return numbers;
}
