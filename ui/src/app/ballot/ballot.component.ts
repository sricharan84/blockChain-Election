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
    voted: boolean = false;
    selectedCandidate: BallotRes;
    votedCandidate: BallotRes[];
    
    constructor(
        private router: Router,
        private ballotService: BallotService) { }

        candDetails(cand){
                this.selectedCandidate = {Candidate: cand.Candidate, party: cand.party};

        }

        registerVote(){
            if(confirm(`Are you sure you want to vote for ${this.selectedCandidate.Candidate}`))
            console.log(this.selectedCandidate);
            this.verifySelection(this.selectedCandidate);
            this.ballotService.postBallotBox(this.selectedCandidate)
            .subscribe((res) => {
                this.votedCandidate = res;
            })
            

        }
        
            verifySelection(cand){
                if(cand){
                    this.voted = true;
                }else{
                    alert('Please select a nominee');
                }
           }
           
         

 ngOnInit() {
    console.log('=========ballot.ngOnInit=============');
    this.ballotService.getBallotBox()
    .subscribe((res) => {
        this.ballots = res;
        console.log(res);
      });

   }
}
