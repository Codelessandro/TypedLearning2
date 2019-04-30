const fs = require("fs");
import {ClassificationDataItem} from "../classificationDataItem";


class Mnist implements ClassificationDataItem {

    data: any = {};
    label: number = undefined;

    constructor(data: any, label: number) {
        this.data = data;
        this.label = label;
    }
}

class MnistDataSet {
    trainData: Mnist[];
    testData: Mnist[];

    constructor(testPath: String, trainPath: String) {
        let testData = fs.readFileSync(trainPath, 'utf-8')
        let testDataArray = testData.split(',').slice(0, (testData.split(',').length) - 1)
        let slices = testDataArray.length / (28*28+1)
        console.log(slices)
        //file csv unclear?


    }
}


let mnist = new MnistDataSet("./mnist_test.csv", "mnist_train.csv")