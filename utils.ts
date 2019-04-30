export function _vecDistance(a: number[]): number {
    return Math.sqrt(a.map(e => e ** 2).reduce((a, b) => a + b))
}

export function _vecSub(a: number[], b: number[]): number[] {
    return a.map(function (e, i) {
        return [e - b[i]];
    }).flat()
}

export function _scalarProd(a: number[], b: number[]) {
    return a.map(function (e, i) {
        return [e * b[i]];
    }).flat().reduce((a, b) => a + b)
}


export function _vecAdd(a: number[], b: number[]): number[] {
    return a.map(function (e, i) {
        return [e + b[i]];
    }).flat()
}


export function _scalarVec(b: number[], a: number) {
    return b.map(b => b * a)
}

export function transposeMatrix(a: number[][]) {
    let newArray = a[0].map(e => new Array(0).fill(e))
    a.slice(1, newArray.length)
    return a;
}

export function _matMul(a: number[][], b: number[][]) {
    //do not transpose outside this function. it will be "transposed here"
    a = a
    b = transposeMatrix(b);
    return a;
}


export function _randomData(data: any) {
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    return data[getRandomArbitrary(0, data.length - 1)]
}


export function _det(matrix: number [][]) {
    /*1 2 3
    4 5 6
    7 8 9
*/
}