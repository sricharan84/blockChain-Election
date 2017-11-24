import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/user/all').map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/user/register', user);
    }
    
    convertTokenToUser(token):User{
            var payload = token.split('.')[1];
                payload = window.atob(payload);
                payload = JSON.parse(payload);
                 return {
                    email: payload.email,
                    name: payload.name,
                    address:payload.address,
                    password:payload.password,
                    role:payload.role       
                };

    }


}