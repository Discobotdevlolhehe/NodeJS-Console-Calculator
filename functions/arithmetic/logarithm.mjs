function logarithm(base, number) {
    if (base <= 0 || number <= 0 || base === 1) {
        return 'Cannot perform logarithm operation';
    }
    return Math.log(number) / Math.log(base);
}

export { logarithm }