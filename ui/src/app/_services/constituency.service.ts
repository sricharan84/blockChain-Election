import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constituency } from '../_models/index';

@Injectable()
export class ConstituencyService {
    constructor(private http: Http) { }

   /**
    * Function to retreive logged in user details
    */
     public getAllConstituencies() {
     return this.http.get('/api/constituency/getAllConstituencies')
     .map((response: Response) => response.json());
  }

}