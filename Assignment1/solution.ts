// Problem 1:
// const input: Number[] = [1,2,3,4,5,6];
// const output: Number[] = [];
// const filterEvenNumbers = input.filter((val:Number)=>{
//     if (val%2==0) {
//         return val
//     }
// })
// console.log(...filterEvenNumbers)
const input: number[] = [1, 2, 3, 4, 5, 6];
function filterEvenNumbers(arr: number[]) {
  return arr.filter((val: number) => {
    if (val % 2 == 0) {
      return val;
    }
  });
}
const output = filterEvenNumbers(input);
console.log(output);
// Problem 2:
function reverseString(str: string):string {
  let str1: string = "";
  for (let index = str.length - 1; index >= 0; index--) {
    str1 = str1 + str[index];
  }
  return str1
}
console.log(reverseString("typescript"));
//Problem 3:
type v = number | string;
function checkType(val:v): string {
    if (typeof val==="string") {
        return "String"
    }
    else{
        return "Number"
    }
}
console.log(checkType("Hello"))
console.log(checkType(42))
//Problem 4:
const user = { id: 1, name: "John Doe", age: 21 };


const getProperty = <T, K extends keyof T>(obj: T, key: K) => {
    return obj[key]; 
}

const ans = getProperty(user, "name");

console.log(ans); 
//Problem 5:
const myBook = { title: "TypeScript Guide", author: "Jane Doe", publishedYear: 2024 };
interface Book{
  title: string,
  author: string,
  publishedYear: number
}
const toggleReadStatus = (obj: Book)=>{
  return{
    ...obj,
    isRead: true
  }
}
const ans5 = toggleReadStatus(myBook)
console.log(ans5)
//Problem 6:
class Person{
  name: string;
  age: number
  constructor(val1: string, val2: number){
    this.name = val1;
    this.age = val2;
  }
}
class Student extends Person{
  grade: string;
  constructor(val1: string, val2: number, val3: string){
    super(val1,val2);
    this.grade = val3
  }
  getDetails(){
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`)
  }
}
const student = new Student("Alice", 20, "A");
student.getDetails();
//Problem 7:
const getIntersection = (arr1: number[],arr2: number[])=>{
  const arr: number[] = []
  for (let index = 0; index < arr1.length; index++) {
    for (let index1 = 0; index1 < arr2.length; index1++) {
      if (arr1[index]==arr2[index1]) {
        arr.push(arr1[index])
      }
    }
  }
  return arr
}
const ans7 = getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])
console.log(ans7)