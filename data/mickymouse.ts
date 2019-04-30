import {ClassificationDataItem} from "./classificationDataItem";
import {Gauss} from "./distributions/gauss";

export class MickyMouseData {

    data: any[];

    constructor() {
        this.genData();
    }

    genData() {
        let earRight = Gauss.genData([1, 1], [[1, 0], [0, 1]], 50)
        let earLeft = Gauss.genData([-1, 1], [[1, 0], [0, 1]], 50)
        let head = Gauss.genData([0, 0], [[1, 0], [0, 1]], 50)
        this.data = earLeft.concat(earLeft).concat(head);
    }

}