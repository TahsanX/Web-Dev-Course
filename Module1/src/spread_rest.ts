// spread
// rest
const friend: string[] = ["Rahim","Karim"]
const schoolfriend: string[] = ["biva"]
const collegefriend: string[] = ["Taseen"]

friend.push(...schoolfriend)
console.log(friend)
friend.push(...collegefriend)
console.log(friend)
const user = {
    name: "Tahsan",
    phn: "0170000"
}
const otherinfo = {
    hobby: "outing",
    age: 23
}
const totalinfo = {
    ...user,
    ...otherinfo
}
console.log(totalinfo) 
// rest operator shob kichu shrink kore.
const n = (...num: number[])=>{
    num.map((val: number)=>{
        console.log(val)
    })
}
n(1,2,3,4,78)