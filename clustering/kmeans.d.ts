interface KmeansConfig {
    clusters?: number;
    iterations?: number;
}
declare class DataPoint {
    data: number[];
    nearestCluster: number[];
    constructor(data: number[], nearestCluster: number[]);
    findNearestCluster(clusters: number[][]): void;
}
export declare class Kmeans {
    config: KmeansConfig;
    data: DataPoint[];
    clusters: number[][];
    constructor(config: KmeansConfig, data: any);
    static example(): number[][];
    randomClusters(): void;
    train(): void;
    expectation(): void;
    maximization(): void;
}
export {};
