import * as fs from 'fs';
import {ClassificationDataItem} from "../classificationDataItem";

export class Passenger implements ClassificationDataItem {

    data: any = {};
    label: number = undefined;


    constructor(id: number = 0, label: number = 0, pclass: number = 0, sex: number = 0, age: number = 0, sibsp: number = 0, parch: number = 0, ticket: number = 0, fare: number = 0, cabin: String = '', embarked: String = '') {
        this.label = label;
        this.data.id = id;
        this.data.pclass = pclass;
        this.data.sex = sex;
        this.data.age = age;
        this.data.sibsp = sibsp;
        this.data.parch = parch;
        //this.data.ticket = ticket;
        this.data.fare = fare;
        /*this.data.cabin = cabin;
        this.data.embarked = embarked;*/
    }

    static loadPassangers() {
        function removeName(entry: any) {
            return entry.substring(0, entry.indexOf("\"") - 1) + entry.substring(entry.indexOf("\"", entry.indexOf("\"") + 1) + 1, entry.length)
        }

        let csv = fs.readFileSync("data/titanic/train.csv", 'utf-8');
        let csvData = csv.split("\n");
        let data = csvData.slice(1, csvData.length - 1).map(d => removeName(d).split(","));
        let result = data.map(p => new Passenger(Number(p[0]), Number(p[1]), Number(p[2]), (p[3] == 'male' ? 0 : 1), Number(p[4]), Number(p[5]), Number(p[6]), Number(p[7]), Number(p[8]), p[9], p[10]))

        return result
    }

}

