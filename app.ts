import {Passenger} from "./data/titanic/passanger";
import {Feedforward} from "./neuralnetworks/feedforward/feedforward";
import {Kmeans} from "./clustering/kmeans";
import {BiasVarianceDecomposition} from "./regression/biasVarianceDecomposition";
import {Perceptron} from "./neuralnetworks/feedforward/Perceptron";
import {_correlationCoefficient} from "./statUtils";
import {Gauss} from "./data/distributions/gauss";
import {GMMEM} from "./clustering/gmmEm";
import {MickyMouseData} from "./data/mickymouse";
import {_det} from "./utils";
//import {LDA} from "./classification/lda";


//GMMEM.example();


let covariance = [
    [1,2,3],
    [4,5,6],
    [7,4,2],
]


let det = _det(covariance)
console.log(det)