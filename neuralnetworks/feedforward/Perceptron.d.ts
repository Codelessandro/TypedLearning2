import { ClassificationDataItem } from "../../data/classificationDataItem";
interface PerceptronConfig {
    iterations?: number;
    learningRate?: number;
}
export declare class Perceptron {
    data: ClassificationDataItem[];
    config: PerceptronConfig;
    w: number[];
    constructor(config: PerceptronConfig, data: ClassificationDataItem[]);
    static example(): void;
    classifyCorrectly(data: ClassificationDataItem): boolean;
    classify(data: ClassificationDataItem): number;
    train(): void;
}
export {};
