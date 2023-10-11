import { MongoDto, Employees, Employee } from './model';
import { Component } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

title = 'my-app-angular';
emps: Employees[] = [];
ready: boolean = false;

emp:Employee = null;
er: boolean = false;

constructor(
    private dlService: Service
 ) { 
    
 }


 ngOnInit() {
  this.getEmployees();
 }

 getEmployees(){
  let md: MongoDto = this.dlService.initMongoDto();
  md.filter = { "label" : "my-app"}
  md.projection = {"_id" :1, "name" : 1}
  md.sort = {"_id" : -1}

  this.dlService.getEmployees('/v1/mymongo/test/findMany',md).subscribe((res:any) => {
    console.log('getEmps' + JSON.stringify(res.body.data));
    this.emps = res.body.data;
    this.calcTmpId();
    this.ready = true;
  }, (error:any) => {
    console.log('get emps err' + JSON.stringify(error) );
  });
}

calcTmpId(){
  for(let i=0; i<this.emps.length; i++){
    let _id:string =  this.emps[i]._id;
    _id = _id.substring(9,33);
    this.emps[i]._id = _id;
  }
}

dispEmp(r:Employees){
  this.dlService.getEmployee('/v1/mymongo/test/findOne',r._id,'ObjectId').subscribe((res:any) => {
    console.log('get emp suc' + JSON.stringify(res.body.data));
    this.emp = res.body.data;
    this.emp._id = r._id;
    this.er = true;
  }, (error:any) => {
    console.log('get emp err' + JSON.stringify(error) );
  }); 
}

}