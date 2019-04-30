import {ClassificationDataItem} from "../../data/classificationDataItem";
import {_scalarVec, _vecAdd, _randomData, _scalarProd} from "../../utils";


interface PerceptronConfig {
    iterations?: number;
    learningRate?: number;
}


export class Perceptron {

    data: ClassificationDataItem[];
    config: PerceptronConfig;
    w: number[];

    constructor(config: PerceptronConfig, data: ClassificationDataItem[]) {
        this.data = data;
        this.config = config;
        this.w = Array(this.data[0].data.length).fill(0);
    }

    static example() {
        class TestPerceptronData implements ClassificationDataItem {
            data: any;
            label: number;

            constructor(data: any, label: any) {
                this.data = data;
                this.label = label;
            }
        }

        let dummyData = [
            new TestPerceptronData([-1, -1, -4, -1], -1),
            new TestPerceptronData([-4, -3, -2, -1], -1),
            new TestPerceptronData([-5, -5, -3, -2], -1),
            new TestPerceptronData([5, 5, 3, 2], 1),
            new TestPerceptronData([5, 5, 3, 2], 1),
            new TestPerceptronData([5, 5, 3, 2], 1),

        ]

        let testData = [
            new TestPerceptronData([10, 10, 10, 10], 1),
            new TestPerceptronData([-1, -4, -1, -2], -1),
            new TestPerceptronData([2, 4, 1, 2], 1),

        ]

        let perceptron = new Perceptron({iterations: 100, learningRate: 0.1}, dummyData)
        perceptron.train();
        console.log(perceptron.classify(testData[0]))
        console.log(perceptron.classify(testData[1]))
        console.log(perceptron.classify(testData[2]))
    }

    classifyCorrectly(data: ClassificationDataItem) {
        return (_scalarProd(this.w, data.data) * Number(data.label)) > 0
    }

    classify(data: ClassificationDataItem) {
        return Math.sign(_scalarProd(this.w, data.data))
    }

    train() {
        for (let i = 0; i < this.config.iterations; i++) {
            let randomData = _randomData(this.data)
            if (this.classifyCorrectly(randomData) != randomData.label) {
                this.w = _vecAdd(this.w, _scalarVec(_scalarVec(randomData.data, Number(randomData.label)), this.config.learningRate));

            }
        }
    }
}