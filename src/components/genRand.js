export const genRand = (size) => Math.floor(Math.random * size) + 1; 

export const createArray = (number, range) => {
    var arr = []
    for (var i = 0; i < number; i++) {
        arr.push(genRand(range))
    } 
    return arr; 
}