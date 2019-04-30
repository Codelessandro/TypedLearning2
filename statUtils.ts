export function _correlationCoefficient(x: number[], y: number[]) {
    return x.map((x, index) => (x * y[index] / Math.sqrt(x ** 2 * y[index] ** 2))).reduce((a, b) => (a + b))

}