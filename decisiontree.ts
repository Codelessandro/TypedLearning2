/*
import {Passenger} from "./data/titanic/passanger";


class DecisionTree {

    private splitFunc: (dataItem: Passenger) => boolean

    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    public train() {
        let lowestScore = 0;

        let dimensions = ["age", "sex", "id", "pclass"]
        for (let i in dimensions) {
            let [R1mean, R2mean, score] = this.splitByDimension(dimensions[i]);
            console.log(`${dimensions[i]} has _R1mean: ${R1mean} R2mean: ${R2mean} and a total score of ${score}`)
            if (lowestScore == 0 || score < lowestScore) {
                lowestScore = score
            }
        }
        console.log(lowestScore)
    }

    public validateTrain() {
        let classifiedData = this.data.map(e => [e, this.splitFunc(e)]).sort((a, b) => a[1] - b[1])
        let R1 = classifiedData.filter(e => e[1] == true).map(e => e[0]);
        let R2 = classifiedData.filter(e => e[1] == false).map(e => e[0]);
        let R1mean: number = R1.reduce((acc, cV) => acc + cV.survived, 0) / R1.length
        let R2mean: number = R2.reduce((acc, cV) => acc + cV.survived, 0) / R2.length
        let score = R1.map(e => (e.survived - R1mean) ** 2).reduce((a, b) => a + b) + R2.map(e => (e.survived - R2mean) ** 2).reduce((a, b) => a + b)
        return [R1mean,R2mean,score]
    }

    splitByDimension(dim) {

        if (dim == "id") {
            this.splitFunc = (dataItem) => dataItem.id < 2
        } else if (dim == "sex") {
            this.splitFunc = (dataItem) => dataItem.sex == 'male'
        } else if (dim == "age") {
            this.splitFunc = (dataItem) => dataItem.age > 20 && dataItem.age<30
        } else if ( dim=="pclass") {
            this.splitFunc = (dataItem) => dataItem.pclass == 1
        }
        return this.validateTrain();

    }



    }
}

const passengers = Passenger.loadPassangers();
let dt1 = new DecisionTree(passengers);
dt1.train()
//build Tree:
//predict cat = tree.predict(data)
*/
