import {MickyMouseData} from "../data/mickymouse";

export class GMMEM {

    nrClusters: number;
    tau: number[];
    means: number[][];
    covariances: number[][][];
    d: number
    data: any;
    prob: (data: number[], mean: number[], covariance: number[][]) => number


    constructor(nrClusters: number, d: number, data: any) {
        this.nrClusters = nrClusters;
        this.d = d;
        this.data = data;
        this.prob = function (data: number[], mean: number[], covariance: number[][]) {
            //let sqrt = Math.sqrt((2*Math.PI)**this.d  *_det(covariance))
            return (1/ Math.sqrt(   ((2*Math.PI)**this.d)   ) )
        }
    }

    static example() {

        let mickyMouseData = new MickyMouseData();

        let gMMEM = new GMMEM(5, 2, mickyMouseData.data);
        gMMEM.initialize();
        for (let i = 0; i < 2; i++) {
            gMMEM.expectation();
            gMMEM.maximization();
        }
    }

    initialize() {
        function randomMean(d: number): number[] {
            return Array(d).fill(0).map(e => Math.random())
        }

        function covariances(d: number): number[][] {


            return Array(d).fill(0).map((e, index) => Array(d).fill(0).map((_e, _index) => {
                if (index == _index) {
                    return 1;
                } else {
                    return 0;
                }
            }))

        }

        this.tau = Array(this.nrClusters).fill(0).map(e => (1 / this.nrClusters))
        this.means = Array(this.nrClusters).fill(0).map(e => randomMean(this.d))
        this.covariances = Array(this.nrClusters).fill(0).map(e => covariances(this.d))
    }


    q(n: number, k: number) {
        let prob = this.prob(this.data[n], this.means[k], this.covariances[k]);
        console.log(prob)
        return (this.tau[k] * this.prob(this.data[n], this.means[k], this.covariances[k]))
            /
            (Array(this.nrClusters).fill(0).map((e, index) => this.tau[k] * e * prob)).reduce((a, b) => a + b)
    }

    expectation() {
        let test = this.q(0, 0)
        console.log(test)


    }

    maximization() {

    }

}