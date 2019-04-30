import {Gauss} from "../data/distributions/gauss";

export class SNE {


    static example() {
        let data1 = Gauss.genData([10, 10], [[1, 0], [0, 1]], 100).map(d => ({data: d, label: 1}))
        console.log(data1)

    }

    test() {
        return 2;
    }

}


SNE.example();