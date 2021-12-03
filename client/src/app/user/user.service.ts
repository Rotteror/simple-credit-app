import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'


const API_URL = environment.apiURL;
@Injectable()
export class UserService {

  

  constructor(private http: HttpClient) { }
  

  login(username: string, password: string): string{

      let [left,right] = password.split('#');

      if(left == username && right == username){
        return username;
      }else {
        throw new Error('Грешно потребителско име');
      }
  }
  
}
