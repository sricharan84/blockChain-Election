import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BallotService } from './ballot.service'; 
import { BallotRes } from '../_models/ballotRes';
//import {Constituency }  from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'ballot.component.html'
})

export class BallotComponent implements OnInit {
    ballots: BallotRes[];

    constructor(
        private router: Router,
        private ballotService: BallotService) { }
        

 ngOnInit() {
    console.log('=========ballot.ngOnInit=============');
    this.ballotService.getBallotBox()
    .subscribe((res) => {
        this.ballots = res;
        console.log(res);
      });

   }
}
