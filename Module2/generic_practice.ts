type GenericArray<value> = Array<value>

const friends: GenericArray<string> = ["a","b","c","d"]
const roll: GenericArray<Number> = [1,2,3,4]
const admin: GenericArray<boolean> = [true, false, true]

type obj<T> = {
    name: string;
    roll: T;
}
const std1: obj<number> = {
    name: "Tahsan",
    roll: 12
}
type obj1<A,B> = {
    name: A,
    roll: B,
}
const std2: obj1<number,number> = {
    name: 1,
    roll: 44,
}
// Interface
interface obj2<T>{
    name: T
}
const std3: obj2<string> = {
    name: "T"
}