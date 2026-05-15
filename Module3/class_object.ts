class Animal{
    name: string;
    species: string;
    sound: string;
    constructor(val1: string, val2: string, val3: string){
        this.name = val1
        this.species = val2
        this.sound = val3
    }
    makesound(){
        console.log('Animal is making sound ',this.name)
    }
}
const dog = new Animal("Dog1","Deshi kutta","Bark")
console.log(dog.name)
dog.makesound()

// shortcut
// class Vehical{
//     constructor(public brand: string, public model: string){

//     }
// }