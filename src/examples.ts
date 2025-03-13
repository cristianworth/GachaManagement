let stringType: string[]  = ["100"];
let numberType: number[]  = [200];

let unionType: (string | number)[]  = ["100", 200, 300, "400"];
unionType.unshift(55); // add at the beginning
unionType.push(45); // add at the end
console.log(unionType)

let unionTypeArray: Array<string|number> = ["100", 200, 300, "400"];
unionTypeArray.shift(); // remove at the beginning (100)
unionTypeArray.pop(); // remove at the end (400)
console.log(unionTypeArray)

let unionTypeReadOnly: ReadonlyArray<string|number> = [55, "45"]
// unionTypeReadOnly.pop(); //Property 'pop' does not exist on type 'readonly (string | number)[]'
unionTypeReadOnly = []; // but this works
console.log(unionTypeReadOnly)
