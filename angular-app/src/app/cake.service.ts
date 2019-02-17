import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CakeService {

  constructor(private _http: HttpClient) { 
    
  }
  getCakes(){
    return this._http.get('/cakes')
  }
  addNewCake(cake){
    return this._http.post('/', cake)
  }
  rateACake(id, data){
    return this._http.put('/cake/' + id, data )
  }
}
