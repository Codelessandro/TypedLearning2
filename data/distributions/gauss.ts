export class Gauss {
    /*
    todo: covariance - multiply data with eigenvalues/eigenvectors
     */

    static genData(mean: number[], covariance: number[][], number: number) {

        function createGaussOneDim(number: number) {
            let array = [];
            for (let i = 0; i < number; i++) {
                let m = 100
                let x = (Array(m).fill(0).map(e => Math.random()).reduce((a, b) => a + b) - (m / 2)) / Math.sqrt(m / 12);
                array.push(x);
            }
            return array;
        }

        function zipArray(array: number[][]) {
            array = array[0].map(
                (n,index) => [n,array[1][index]]
            )
            return array;
        }


        let dimensions = mean.length
        let returnArray = [];
        for (let d = 0; d < dimensions; d++) {
            returnArray.push(createGaussOneDim(number).map(e => e + mean[d]))
        }


        return zipArray(returnArray);
    }
}