class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getSleep(numOfhours: number) {
    console.log(`${this.name} doinik ${numOfhours} ghonta ghumai`);
  }
}

class Student extends Person {
  doStudy(numOfhours: number) {
    console.log(`${this.name} doinik ${numOfhours} ghonta study koe`);
  }
}

class Teacher extends Person {

  takeClass(numOfhours: number) {
    console.log(`${this.name} doinik ${numOfhours} ghonta class nei`);
  }
}

const getUserInfo = (user: Person)=>{
    if (user instanceof Teacher) {
        user.takeClass(2)
    }
    else if(user instanceof Student){
        user.doStudy(10)
    }
    else{
        user.getSleep(4)
    }
}
const p1 = new Person("Mr. Person")
getUserInfo(p1)