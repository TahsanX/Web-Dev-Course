type student = {
    id: string,
    name: string};

const addstudenttocourse = <P extends student>(student: P)=>{
    return{
        course: 'TypeScript',
        ...student
    }
}
const std1 = {
    id: '1',
    name: 'John',
    age: 20,
}
const std2 = {
    id: '2',
    name: 'Jane',
    age: 22,
    grade: 'A',
}
const std3 = {
    id: '3',
    name: 'Doe',
    hasWatch: true,
}
const result1 = addstudenttocourse(std1)
const result2 = addstudenttocourse(std2)
const result3 = addstudenttocourse(std3)

console.log(result1)
console.log(result2)
console.log(result3)