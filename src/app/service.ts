import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MongoDto } from './model';
import { environment } from 'src/environments/environment';

@Injectable()
export class Service {

clickId:string = '';

setClickId(_id: string){
  this.clickId = _id;
}

getClickId(){
    return this.clickId;
}

constructor(private http: HttpClient) {
}    

initMongoDto() {
    return new MongoDto(undefined,undefined,undefined);
}


getEmployee(uri:string,_id:string,idType:string){
    let hheaders = new HttpHeaders()
        .set('Content-Type','application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('x-api-key', environment.xApiKey)    
        .set('x-connection-name', environment.xConnName);
        return this.http.get(environment.apiUrl + uri + '?_id=' +_id + '&idType=' + idType, {  'headers': hheaders, observe: 'response'});
    }

getEmployees(uri:string,mongoDto: MongoDto){
let hheaders = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('x-api-key', environment.xApiKey)
    .set('x-connection-name', environment.xConnName);
    return this.http.post(environment.apiUrl + uri, mongoDto, {  'headers': hheaders, observe: 'response'});
}

   
}
