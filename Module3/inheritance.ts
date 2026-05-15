// class Student {
//     name: string
//     age: number
//     roll: number

//     constructor(name: string, age: number, roll: number){
//         this.name = name
//         this.age = age
//         this.roll = roll
//     }

//     getSleep(hours: number){
//         console.log(`${this.name} ghumaye ${hours}`)
//     }
// }
// class Teacher {
//     name: string
//     age: number
//     roll: number
//     subj: string

//     constructor(name: string, age: number, roll: number, subj: string){
//         this.name = name
//         this.age = age
//         this.roll = roll
//         this.subj = subj
//     }

//     takeclass(hours: number){
//         console.log(`${this.name} class naye ${hours}`)
//     }
// }

// const std1 = new Student("Tahsan", 22, 7)
// std1.getSleep(14)
// const t1 = new Teacher("Ronaldo", 40, 7, "Math")
// t1.takeclass(10)

class vehichle{
    name: string;
    brand: string;
    constructor(name: string, brand: string){
        this.name = name;
        this.brand = brand;
    }
}
class car extends vehichle{
    haswheel : boolean;
    constructor(name: string, brand: string, haswheel: boolean){
        super(name,brand)
        this.haswheel = haswheel
    }
}

const car1 = new car("Toyota", "corolla", true)
console.log(car1.brand)