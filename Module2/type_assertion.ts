let anything: any;

anything = 222;

let val: string = (anything as number).toString();

const kgtoconverter = (input: string | number) => {
  if (typeof input === "number") {
    return input * 1000;
  } else if(typeof input === 'string'){
    // array destructuring
    const [value] = input.split(" ")
    return `converted output is : ${Number(value)*1000}`
  }
};

const res1 = kgtoconverter(2) as number
console.log(res1)
const res2 = kgtoconverter("2 kg") as string
console.log(res2)

type Customerror = {
    message: string;
};
try {
    
} catch (error) {
    console.log((error as Customerror).message)
}