let arr : number[] = [1,2,3,4,5]
let newarr = arr.map((val:number)=>{
    return val*val
})
console.log(newarr)

// callback function
const greet = (name: string): void=>{
    console.log("Hello ", name);
}
const processUser = (
    callback: (name: string)=> void): void=>{
        callback("Ronaldo");
    }
processUser(greet)

function math(a: number, b:number, callback: (result: number)=> void) {
 const result = a+b
 callback(result)
}
math(1,2,(result)=>{
    console.log("Hello this is the result: ",result)
})

let varr = ["1","2","picchi","shairy"]
varr.map((arr):any=>{
    console.log(arr)
})