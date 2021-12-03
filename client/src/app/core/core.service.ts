import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'


const API_URL = environment.apiURL;
@Injectable()
export class CoreService {



  constructor(private http: HttpClient) { }

  //TO DO -> implement right Interface for response from API 
  
  gerCreditsByUserId(userId: string) {
    return this.http.get(`${API_URL}/credits/user/${userId}`)
  };

}
