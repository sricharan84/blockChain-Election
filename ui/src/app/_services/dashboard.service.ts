import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Dashboard } from '../_models/index';

@Injectable()
export class DashboardService{
    constructor(private http: Http) { }

    getVotingResult() {
        return this.http.get('/api/dashboard/votingResults').map((response: Response) => response.json());
    }

   

}