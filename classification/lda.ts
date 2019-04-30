import {ClassificationDataItem} from "../data/classificationDataItem";
import {Gauss} from "../data/distributions/gauss";
import {_scalarProd, _scalarVec, _vecAdd} from "../utils";


enum LDAOptimizer {
    GRIDSEARCH = 1, //TypesLearning Developer don't want to face eigenvalue problem in Typescript!
    EIGENVALUEDECOMPOSITION = 2
}

interface LDAConfig {
    optimizer: LDAOptimizer;

}

export class LDA {

    data: ClassificationDataItem[];
    config: LDAConfig;

    constructor(data: ClassificationDataItem[], config: LDAConfig) {
        this.data = data;
        this.config = config;

    }

    static example() {
        let data1 = Gauss.genData([10, 10], [[1, 0], [0, 1]], 100).map(d => ({data: d, label: 1}))
        let data2 = Gauss.genData([-10, -10], [[1, 0], [0, 1]], 100).map(d => ({data: d, label: -1}))
        let data = data1.concat(data2);

        let lda = new LDA(data, {optimizer: LDAOptimizer.GRIDSEARCH});
        lda.train();
    }

    Rayleigh(w) {
        return 2
        /*
        let data1 = this.data.filter(d => d.label == 1)
        let data2 = this.data.filter(d => d.label == -1)

        let mean1 = data1.map(d => d.data).reduce((a, b) => _vecAdd(a, b)).map(e => e / data1.length)
        let mean2 = data2.map(d => d.data).reduce((a, b) => _vecAdd(a, b)).map(e => e).map(e => e / data2.length)

        let mean1Proj = _scalarProd(w, mean1)
        let mean2Proj = _scalarProd(w, mean2)

        let SBProj = mean1Proj - mean2Proj
        let SWProj = data1.map(d => _scalarProd(w, d) ** 2).reduce((a, b) => a + b) + data2.map(d => _scalarProd(w, d) ** 2).reduce((a, b) => a + b)

        return SBProj / SWProj
        */


    }

    train() {
        if (this.config.optimizer == 1) {
            this.Rayleigh([1, 1])
            console.log("we train");

        } else {
            throw Error("Eigenvalue Decomposition is not yet implemented. We can offer GridSearch for LDA (not very common!)")
        }
    }


}