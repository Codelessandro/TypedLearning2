import { ClassificationDataItem } from "../data/classificationDataItem";
declare enum LDAOptimizer {
    GRIDSEARCH = 1,
    EIGENVALUEDECOMPOSITION = 2
}
interface LDAConfig {
    optimizer: LDAOptimizer;
}
export declare class LDA {
    data: ClassificationDataItem[];
    config: LDAConfig;
    constructor(data: ClassificationDataItem[], config: LDAConfig);
    static example(): void;
    Rayleigh(w: any): number;
    train(): void;
}
export {};
