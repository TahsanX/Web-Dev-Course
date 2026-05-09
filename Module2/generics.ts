//dynamically generalize
// const friends: string[] = ['Mr. X', 'Mr. Y', 'Mr. Z'];
// const roll: number[] = [4,7,11]
// const isEligible:  boolean[] = [true,false,true]
const friends: Array<string> = ['Mr. X', 'Mr. Y', 'Mr. Z'];
console.log(friends)

type Genericval<T>= Array<T>
const g : Genericval<Number> = [1,2,3,4]
const h : Genericval<String> = ["A", "b"]
