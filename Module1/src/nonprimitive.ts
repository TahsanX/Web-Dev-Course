let bazarlist : string[] = ["eggs","milk"]
bazarlist.push("banana")
let mixedArr: (string | number)[] = ["eggs", 12, "sugar", 10]
mixedArr.push("jira pani")
//TypeScript এ tuple হলো fixed-length array যেখানে প্রতিটা position এর type আগে থেকেই define করা থাকে।
let person: [string, number];
person = ["Tahsan", 22];
console.log(person);

//object
// eikhane ? mark dile er mane eita optional type
const user : {
    organization: "RUET" //value type hishabe use hocche. literal type
    firstName: string,
    middlename?: string,//optional type
    roll: number
}= {
    organization: "RUET",
    firstName: "Tahsan",
    middlename: "Zahid",
    roll: 140
}
console.log(user.firstName)