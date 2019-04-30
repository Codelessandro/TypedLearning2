import { ClassificationDataItem } from "../../data/classificationDataItem";
export declare class Feedforward {
    trainData: ClassificationDataItem[];
    testData: ClassificationDataItem[];
    currentData: ClassificationDataItem;
    lossFunc: (pred: number, true_label: number) => number;
    lossDerivativeFunc: (pred: number, true_label: number) => number;
    activationFunc: (input: number) => number;
    activationDerivativeFunc: (input: number) => number;
    nrNeurons: number[];
    learningRate: number;
    weights: any[];
    a: any[];
    z: any[];
    d: any[];
    constructor(nrNeurons: number[], learningRate: number, trainData: ClassificationDataItem[], testData: ClassificationDataItem[], lossFunc: (pred: number, true_label: number) => number, lossDerivativeFunc: (pred: number, true_label: number) => number, activationFunc: (input: number) => number, activationDerivativeFunc: (input: number) => number);
    static example(): void;
    setup(): void;
    backprop(): void;
    forward(): void;
    train(): void;
    test(cdi: ClassificationDataItem): void;
}
