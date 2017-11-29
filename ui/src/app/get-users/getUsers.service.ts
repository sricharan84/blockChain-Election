import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GetUsersService {
    constructor(private http: Http) { }

    getUsers() {
        return this.http.get('/api/getusers')
            .map((response: Response) => response.json())
            
    }
    
}