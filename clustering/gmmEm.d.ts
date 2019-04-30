export declare class GMMEM {
    nrClusters: number;
    tau: number[];
    means: number[][];
    covariances: number[][][];
    d: number;
    data: any;
    prob: (data: number[], mean: number[], covariance: number[][]) => number;
    constructor(nrClusters: number, d: number, data: any);
    static example(): void;
    initialize(): void;
    q(n: number, k: number): number;
    expectation(): void;
    maximization(): void;
}
