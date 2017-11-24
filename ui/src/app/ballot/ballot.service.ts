import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BallotRes } from '../_models/ballotRes';

@Injectable()
export class BallotService {
    constructor(private http: Http) { }
    
    // getBallot(): Observable<Election[]> {
    //     return this.http.get('/api/elections')
    //         .map((response: Response) => response.json())
    //         .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    // }



    getBallotBox(): Observable<BallotRes[]> {
        return this.http.get('/api/ballots')
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'server error'));
    }
}