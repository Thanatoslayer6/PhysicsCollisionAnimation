const nerdamer = require('nerdamer/all.min')

var sol = nerdamer.solveEquations('x + 2 = 5', 'x');
console.log(sol.toString());

var e = nerdamer.solveEquations('x^2+4-y', 'y');
console.log(e[0].text());
