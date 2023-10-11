
export class MongoDto {
    constructor(
      public filter: any,
      public projection :any,
      public sort :any
    ) {
    }
  }


export class Employees {
    constructor(
      public _id: string,
      public name :string
    ) {
    }
}
  

export class Employee {
    constructor(
      public _id: string,
      public name :string,
      public photoUrl:string,

      public city :string,
      public hobbies :string,
      public label :string
    ) {
    }
}