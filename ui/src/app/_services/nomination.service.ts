import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams  } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
//import { environment } from '../../environments/environment';
import { Nomination } from '../_models/index';

@Injectable()
export class NominationService {
  constructor(private http: Http) { }
  // private _getCandiateDetailsURL: string = environment.searchCandidateDetails;

  /**
   * Function to retreive logged in user details
   */
  public getCandidateDetails(id: string) {
    return this.http.post('/api/nominations/retreiveCandidateDets/', { id: id }).map((response: Response) => response.json());
  }

  /**
   * Retrieve all candidates from same constitency to which logged in user belongs & also check that the election date is today's date 
   */
  public getAllCandidates(id: string) {
      let params: URLSearchParams = new URLSearchParams();
      params.set('id',id);
    return this.http.get('/api/nominations/getAllCandidates',{search: params}).map((response: Response) => response.json());
  }

  /**
   * Function which would create a nomination in an election for the logger in user
   */
  public createNomination(nomination: Nomination) {
    return this.http.post('/api/nominations/register', nomination);
  }






}