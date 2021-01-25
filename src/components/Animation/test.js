let a = [1, 2, 3, 4]

let b = a.slice(0, 3).map((element) => {
    return {'element': element*2};
});

console.log(b)
