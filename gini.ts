function gini(x: number) {
    return (x * (1 - x)) * 2

}


let prob2 = [0,0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,1]
prob2.map(p => gini(p)).forEach(e => console.log(e))