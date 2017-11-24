import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Voting } from '../_models/index';

@Injectable()
export class VotingService{
    constructor(private http: Http) { }


    public castVote(vote: Voting) {
        console.log('inside catVote in voting.service.ts');
        return this.http.post('/api/voting/castVote', vote);
    }

    

   

}