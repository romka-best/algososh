export const getValueFromGenerator = (generator: Generator) => {
    let current = generator.next();
    while (!current.done) {
        current = generator.next();
    }

    return current.value;
}
