import { LinearModel } from "./LineaerRegression";
export declare class BiasVarianceDecomposition {
    orgModel: LinearModel;
    models: LinearModel[];
    constructor(orgModel: LinearModel, models: LinearModel[]);
    mse(): string;
    static example(): void;
}
