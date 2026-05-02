// arrow function, normal function
function add(num1 : number,num2 : number): number {
    return num1+num2
}
const addArrow = (num1: number, num2: number):
number=> { return num1 + num2;}

console.log(addArrow(2,2))

const poorUser = {
    name: "Tahsan",
    balance: 0,
    addBalance(value: number){
        this.balance =  this.balance + value;
    }
}
poorUser.addBalance(100)
console.log("PoorUser : ",poorUser)
const arr: number[] = [1, 2, 3, 4, 5];

const sqrarr = arr.map((ele: number): number => {
    return ele * ele;
});

console.log(sqrarr);