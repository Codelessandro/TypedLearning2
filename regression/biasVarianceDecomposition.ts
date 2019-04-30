import {LinearModel, LinearRegression} from "./LineaerRegression";

export class BiasVarianceDecomposition {

    orgModel: LinearModel;
    models: LinearModel[];

    constructor(orgModel: LinearModel, models: LinearModel[]) {
        this.orgModel = orgModel;
        this.models = models;
    }

    mse() {
        return "-"
    }

    static example() {
        /*
        Linear Model that has real Data Distribution underlined - with some Gaussian Noise
         */
        let lM1 = new LinearModel({w: [1, 2], dataPoints: 20});

        /*
        First Try: Linear Regression
        expect: good fit
         */
        let models1 = new LinearRegression(lM1).buildModels(10);
        console.log(new BiasVarianceDecomposition(lM1, models1).mse());

        /*
        Second Try: other Linear Model that is the same as original Model
        expect: perfect git
         */
        let models2 = Array(10).fill(0).map( e => new LinearModel({w: [0, 2]}));
        console.log(new BiasVarianceDecomposition(lM1, models2).mse());

        /*
        Third Try: other Linear Model with constant (different) weights
        expect: high Bias, no Variance
         */
        let models3 = Array(10).fill(0).map( e => new LinearModel({w: [2, 3]}));
        console.log(new BiasVarianceDecomposition(lM1, models3).mse());

        /*
        Fourth Try: LinearRegression only from two random points
        expect: high variance high bias
         */
        let subsetlM = JSON.parse(JSON.stringify(lM1));
        subsetlM.data = subsetlM.data.slice(0,2);
        let models4 = new LinearRegression(subsetlM).buildModels(10);
        console.log(new BiasVarianceDecomposition(lM1, models1).mse());





    }


}