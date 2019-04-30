interface LinearConfig {
    w?: number[];
    dataPoints?: number;
}
export declare class LinearModel {
    config: LinearConfig;
    data: any;
    constructor(config: LinearConfig);
    calc(input: number): number;
    genData(): void;
}
export declare class LinearRegression {
    config: LinearConfig;
    orgModel: LinearModel;
    constructor(orgModel: LinearModel);
    buildModels(nrModels: number): any[];
}
export {};
