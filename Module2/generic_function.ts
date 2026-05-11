// const createArrstring = (val: string)=>[val]
// const createArrNumber = (val: number)=>[val]
// const createArrobject = (val: {id: string, name: string})=>[val]


const createArrwithGeneric = <T>(value: T)=>{
    return [value]
}
const arrString = createArrwithGeneric('hello')
const arrNumber = createArrwithGeneric(123)
const arrObject = createArrwithGeneric<{id: string, name: string}>({id: '1', name: 'John'})

const addstudenttocourse = <P>(student: P)=>{
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
const result1 = addstudenttocourse(std1)
const result2 = addstudenttocourse(std2)

console.log(result1)
console.log(result2)