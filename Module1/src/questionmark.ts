// ternary operator
// ?? : nullish coalescing
// ?. optional chaining
const userage = 21
const biyerjonnoeligible = (age: number)=>{
    // if (userage>21) {
    //     console.log("Biye")
    // }
    // else{
    //     console.log("No Biye")
    // }
    const res = age>21?"Eligible":"Not"
    console.log(res)
}
biyerjonnoeligible(20)
const usertheme = null
const selecttheme = usertheme??"Light theme"
console.log(selecttheme)

const obj:{
    name: string,
    age: number,
    sex?: "male"|"Female"
} = {
    name: "Tahsan",
    age: 23
}
console.log(obj?.sex)