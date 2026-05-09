type User = {
    name: string;
    age: number;
};
type Role = {
    role: "admin" | "user"
};
type userwithrole = User & Role;
const user1: User = {
    name: "Mr.X",
    age: 100,
}
const user2: User = {
    name: "Mr.Y",
    age: 102,
}
// interface
interface Iuser {
    name: string,
    age: number,
}
interface Iuserwithrole extends Iuser{
    role: "admin" | "user";
}
//function
type Add = (num1: number, num2: number) => number
const add: Add = (num1,num2)=>{
    return num1+num2;
}
interface Iadd {
    (num1: number, num2: number): number
}
const add: Iadd = (num1,num2)=> num1+num2
//interface 
interface IFriends {
    [index: number] : string
}
const friends: IFriends = ["A","B","C"]
console.log(friends)