/**
 * suppuluri@deloitte.com
 * It is used to display the home screen for adjudicator
 *  */

import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Dashboard } from '../_models/index';
import { DashboardService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'adjudicator.component.html',
    styleUrls: ['adjudicator.component.css']
})


export class AdjudicatorComponent implements OnInit {
    adjActions: [{action:String, actionLink:String}];
    userData: User;
    name: string;
    constructor(private _http: Http) {
      this.adjActions=[{action:'Create Election', actionLink:'/createElection'},
                        {action:'Conclude Election', actionLink:'abc.com'},
                        {action:'Declare Results', actionLink:'abc.com'},
                        {action:'Accept Nominations', actionLink:'abc.com'},];
      this.userData = {
        name: "chaaran",
        email: "charan.kjf@gmail.com",
        password:"ksfj",
        address:"jdfks",
        role:"ksdf"
      }
  }

  sendData(){
    this._http.post('api/user/createUser',this.userData).subscribe((res) => {
      console.log('received');
    },(err) => {
      console.log(err);
    })
  }
  ngOnInit(): void {


 
  }
}

