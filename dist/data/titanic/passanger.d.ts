import { ClassificationDataItem } from "../classificationDataItem";
export declare class Passenger implements ClassificationDataItem {
    data: any;
    label: number;
    constructor(id?: number, label?: number, pclass?: number, sex?: number, age?: number, sibsp?: number, parch?: number, ticket?: number, fare?: number, cabin?: String, embarked?: String);
    static loadPassangers(): Passenger[];
}
