import {_vecDistance, _vecSub, _vecAdd, _scalarVec} from "../utils";

interface KmeansConfig {
    clusters?: number;
    iterations?: number;
}

class DataPoint {
    data: number[]
    nearestCluster: number[];


    constructor(data: number[], nearestCluster: number[]) {
        this.data = data;
        this.nearestCluster = nearestCluster;
    }

    findNearestCluster(clusters: number[][]) {
        this.nearestCluster = clusters.map(c =>
            ({distance: _vecDistance(_vecSub(c, this.data)), cluster: c})
        ).sort((a, b) => a.distance - b.distance)[0].cluster


    }
}


export class Kmeans {

    config: KmeansConfig;
    data: DataPoint[];
    clusters: number[][];

    constructor(config: KmeansConfig, data: any) {
        this.data = data.map(d => new DataPoint(d, []))
        this.config = config;
    }


    static example() {
        let data = [
            [1,1,1],
            [0,1,0],
            [4,4,4],
            [4,4,5],
            [10,9,10],
            [10,11,10],
            [9,9,10],
            [1,1,-1],
            [1,0,0],
            [4,4,4],
        ]
        let kmeans = new Kmeans({clusters: 4, iterations: 100}, data);
        kmeans.train();
        return data;
    }

    randomClusters() {
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        shuffleArray(this.data);
        this.clusters = this.data.slice(0, this.config.clusters).map(d => d.data);
    }

    train() {
        this.randomClusters();
        for (let i = 0; i < this.config.iterations; i++) {
            this.expectation();
            this.maximization();
            console.log("---")
        }
        console.log(this.clusters)
    }

    expectation() {
        this.data.forEach(d => d.findNearestCluster(this.clusters));
    }


    maximization() {
        this.clusters =
            this.clusters.map(c => this.data.filter(d => d.nearestCluster == c)).map(clusters => clusters.map(d => d.data))
                .map(arrayClusters =>
                    ({nrPoints: arrayClusters.length, newCluster: arrayClusters.reduce((a, b) => _vecAdd(a, b))})
                ).map(newCluster => _scalarVec(newCluster.newCluster, (1 / newCluster.nrPoints)))
    }


}