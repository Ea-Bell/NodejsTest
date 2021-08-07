// const profiles = new Map();
// profiles.set('twitter', '@adalovelace');
// profiles.set('facebook', 'adalovelace');
// profiles.set('googleplus', 'ada');

// profiles.size;
// profiles.has('twitter');
// profiles.get('twitter');

// for(const entry of profiles){

//     console.log(entry);
// }

const person = {
    name:'',
    surname:'',

    set Fullname(name){
        return this.name=name;
    },

     
};

class Person2{
    constructor (name, surname, age){
        this.name=name;
        this.surname=surname;
        this.age=age;
    }
    getFullName(){
        return this.name +' '+ this.surname;
    }
   static older(person1, person2){
        return (person1.age >= person2.age) ? person1 : person2
    }
}

class Person3{
    constructor (name, surname, age){
        this.name=name;
        this.surname=surname;
        this.age=age;
    }
    getFullName(){
        return this.name +' '+ this.surname;
    }
   static older(person1, person2){
        return (person1.age >= person2.age) ? person1 : person2
    }
}
class PersonWithMiddlename extends Person3{
    constructor(name, middlename, surname, age){
        super(name, surname,age);
        this.middlename=middlename;
    }
    getFullName(){
        return this.name+' '+ this.middlename + ' '+ this.surname;
    }
}


//let은 변수 객체를 만들어서 데이터를 쉽게 저장 할려고 만든 변수?
// const test= {
   
    
//     set Fullname(fullname){
//         let parts= fullname.split(','); 
//         this.name=parts[0];
//         this.surname=parts[1];
//         this.age=parts[2];
//     },
//     get Fullname(){
//     return + this.name+' '+this.surname+ ' '+this.age;
// },
//     older(person1, person2){
//         return (person1.age >= person2.age) ? person1 : person2
//     }
  
// }
// console.log(person.Fullname='eere');
// ddd = new Person2('Lee', 'Bell', 21);
// ddd2 = new Person2('Ch', 'JO', 20);


// console.log(Person2.older(ddd,ddd2));
// console.log(ddd.age);
ddd3= new PersonWithMiddlename('Lu','Ga','fu', 30)
console.log("ddd3=",ddd3.getFullName());



// ddd = test;
// // ddd2= test;
// dffr=test;
// ddd.Fullname='1,rr2,'+8;
// dffr.Fullname='2,eer23,'+10
// // ddd2.FUllname='2,cncncn,'+120;
// // console.log(ddd);
// // console.log(test.name);
// // console.log(test.older(ddd,ddd2));
// console.log(ddd.Fullname)
// console.log(dffr.Fullname)
// // console.log(ddd2.Fullname)
