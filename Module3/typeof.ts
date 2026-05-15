const add = (num1: string | number, num2: string | number):string|Number =>{
    if(typeof num1==="string" && typeof num2==="string"){
        const val: string = num1+num2
        return Number(val)
    }
    else if(typeof num1==="number" && typeof num2==="string"){
        return num1.toString()+num2
    }
    else if(typeof num1==="string" && typeof num2==="number"){
        return num1+num2.toString()
    }
    else{
        return num1.toString+num2.toString()
    }
}
console.log(add(2,"77"))

type NormalUser = {
    name: string
}
type AdminUser = {
    name: string,
    role: "Admin"
}
const getUserInfo = (user: NormalUser | AdminUser)=>{
    if ("role" in user) {
        console.log(`${user.name} ${user.role}`)
    }
    else{
        console.log(`${user.name}`)
    }
}
getUserInfo({name:"Tahsan"})
getUserInfo({name:"Tahsan", role:"Admin"})