import {_matMul} from "../utils";


interface LinearConfig {
    w?: number[];
    dataPoints?: number;
}

export class LinearModel {
    config: LinearConfig;
    data: any;

    constructor(config: LinearConfig) {
        this.config = config;
        this.genData();
    }

    calc(input: number) {
        let output = this.config.w[1] * input + this.config.w[0]
        return output;
    }

    genData() {
        this.data = Array(this.config.dataPoints).fill(0).map(e => Math.round(Math.random() * 100))
            .map(e => [e,this.calc(e)])
    }
}


export class LinearRegression {
    config: LinearConfig;
    orgModel: LinearModel;

    constructor(orgModel: LinearModel) {
        this.orgModel = orgModel;
        let data = [[1,2,3,4],[1,2,0,0]]
        //let XXT = _matMul(this.orgModel.data, this.orgModel.data);
        let XXT = _matMul(data,data);
        console.log(XXT)
        //w = XXT
    }


    buildModels(nrModels: number) {
        //return [new LinearModel(),new LinearModel()];
        return [];
    }

}