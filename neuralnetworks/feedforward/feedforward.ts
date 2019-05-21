import {ClassificationDataItem} from "../../data/classificationDataItem";
import {Passenger} from "../../data/titanic/passanger";
import {flatten} from "../../utils";

export class Feedforward {


    trainData: ClassificationDataItem[];
    testData: ClassificationDataItem[];

    currentData: ClassificationDataItem;

    lossFunc: (pred: number, true_label: number) => number
    lossDerivativeFunc: (pred: number, true_label: number) => number
    activationFunc: (input: number) => number
    activationDerivativeFunc: (input: number) => number

    nrNeurons: number[];
    learningRate: number;


    weights: any[];
    a: any[];
    z: any[];
    d: any[];

    constructor(nrNeurons: number[],
                learningRate: number,
                trainData: ClassificationDataItem[],
                testData: ClassificationDataItem[],
                lossFunc: (pred: number, true_label: number) => number,
                lossDerivativeFunc: (pred: number, true_label: number) => number,
                activationFunc: (input: number) => number,
                activationDerivativeFunc: (input: number) => number
    ) {
        this.nrNeurons = nrNeurons;
        this.learningRate = learningRate;
        this.trainData = trainData;
        this.testData = testData;
        this.lossFunc = lossFunc;
        this.lossDerivativeFunc = lossDerivativeFunc;
        this.activationFunc = activationFunc;
        this.activationDerivativeFunc = activationDerivativeFunc;

        this.setup();
    }

    static example() {
        const trainPassenger = Passenger.loadPassangers();


        let f1 = new Feedforward(
            [7, 2, 1],
            0.01,
            trainPassenger,
            trainPassenger,
            (pred, true_label) => (pred - true_label) ** 2,
            (pred, true_label) => 2 * (pred - true_label),
            Math.tanh,
            (a) => (1 - Math.tanh(a) ** 2)
        );

        console.log(trainPassenger[0])

        for (let i = 0; i < 100; i++) {
            f1.train();
        }
    }

    setup() {
        let counter = -1;
        let neurons = flatten(this.nrNeurons.map((n, layer) => new Array(n).fill(0).map((e, index) => {
            counter++;
            return {value: 0, i: counter, l: layer}
        })))


        this.weights = neurons.map(node => {
            let nextLayer = neurons.filter(n => n.l == node.l + 1)
            let nrNeuronsNextLayer = nextLayer.length
            return Array(nrNeuronsNextLayer).fill(0).map((e, index) => ({
                value: 0.1,
                i: node.i,
                j: nextLayer[index].i,
                l: node.l
            }))
        }).filter(e => e.length > 0).flat()

        this.a = JSON.parse(JSON.stringify(neurons));
        this.z = JSON.parse(JSON.stringify(neurons));
        this.d = JSON.parse(JSON.stringify(neurons));
    }


    backprop() {


        //update last node error
        let lastZ = this.z.filter(z => z.l == this.nrNeurons.length - 1)[0].value
        let lastA = this.a.filter(a => a.l == this.nrNeurons.length - 1)[0].value

        let lastError = this.lossDerivativeFunc(lastA, Number(this.currentData.label)) * this.activationDerivativeFunc(lastZ)
        this.d.filter(d => d.l == this.nrNeurons.length - 1)[0].value = lastError


        //update previous node errors
        this.d.filter(d => d.l != this.nrNeurons.length - 1).sort((a, b) => b.l - a.l).map(d => {
                let previousD = this.d.filter(_d => _d.l == d.l + 1)
                let previousDAndWeight = previousD.map(e => ({
                    "n": e,
                    "weight": this.weights.filter(w => w.i == d.i && w.j == e.i)[0]
                }))
                let result = previousDAndWeight.map(e => e.n.value * e.weight.value).reduce((a, b) => a + b)
                return d.value = result
            }
        )

        //update weights
        this.weights.map(w => w.value = w.value - this.learningRate * this.a.filter(a => a.i == w.i)[0].value * this.d.filter(d => d.i == w.j)[0].value)

    }


    forward() {
        //Input Layer
        Object.keys(this.currentData.data).forEach((key, index) => {
            this.z.filter(z => z.i == index)[0].value = this.currentData.data[key];
        })
        this.a = JSON.parse(JSON.stringify(this.z));


        //Suceeding Layers
        let layers = this.nrNeurons.length - 1
        for (let layer = 1; layer <= layers; layer++) {
            this.z.filter(z => z.l == layer).map((e) => {
                let neuronsPreviousLayer = this.a.filter(a => a.l == layer - 1);
                let neuronAndWeight = neuronsPreviousLayer.map(n => ({
                    n,
                    weight: this.weights.filter(w => w.i == n.i && w.j == e.i)[0]
                }));
                return e.value = neuronAndWeight.map(nAW => nAW.n.value * nAW.weight.value).reduce((a, b) => a + b)
            })

            this.a.filter(a => a.l == layer).map(a => {
                    return a.value = this.activationFunc(this.z.filter(z => z.i == a.i)[0].value)
                }
            )

        }
    }


    train() {
        function getRandomArbitrary(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        for (let i = 0; i < this.trainData.length; i++) {
            this.currentData = this.trainData[i];
            this.forward()
            this.backprop()
            let randomData = this.trainData[getRandomArbitrary(0, this.trainData.length - 1)]
            this.test(this.trainData[0])
        }
    }

    test(cdi: ClassificationDataItem) {
        this.currentData = cdi;
        this.forward();
        let output = this.a.filter(a => a.l == this.nrNeurons.length - 1)[0].value;
        let loss = this.lossFunc(output, Number(this.currentData.label))
        console.log(loss)
    }


}

