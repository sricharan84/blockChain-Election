import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AlertService,  NominationService, ConstituencyService } from '../_services/index';
import {Nomination, Constituency, Election}  from '../_models/index';
//import {Constituency }  from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'nomination.component.html'
})

export class NominationComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
    private _subscription: Subscription[] = [];
    private _loggedInUserId = '';
    private nominatedCandidate: Nomination;

    //constitencies drop down
    constituencies: Constituency[];
    elections: Election[];
   //currentSelection: Constituency;

    constructor(
        private router: Router,
        private nominationService: NominationService,
        private constituencyService: ConstituencyService,
        private alertService: AlertService) { }
        

 ngOnInit() {
     
     // will see how to get the login userId which can be used here
    //const params: any = this._route.parent.params;
    this._loggedInUserId = "5a01b406b5be76096934d487";
    this._subscription.push(
      this.nominationService.getCandidateDetails(this._loggedInUserId)
        .subscribe(response => {
           
          this.model._id = response._id;
          this.model.age = response.age;
          this.model.name = response.name;
          this.model.email = response.email;
          this.model.maritalStatus = response.MaritalStatus;
          this.model.address=response.address;
          this.model.gender = response.gender;
        //  this.model.constitency = response.constituency[0];

        }));
      // RETREIVE ALL CONSTITUENCIES
           this.constituencyService.getAllConstituencies().subscribe(response =>{
                // this.model.constitencies = response.constituencies;
                 this.constituencies = response;
                 console.log( this.constituencies);
             })

            //  this.electionService.getElectionInfo().subscribe(response =>{
            //      this.elections = response;
            //       console.log( this.elections);
            //  })

  }

 

  ngOnDestroy() {
     this._subscription.forEach(sub => sub.unsubscribe());
   }


    registerNomination() {
        console.log("inside registerNomination in NominationComponent.ts file");
        this.loading = true;
        console.log(this.model);
    
        this.nominationService.createNomination(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Nomination successful', true);
                            this.model._id = '';
                            this.model.age = '';
                            this.model.name ='';
                            this.model.email = '';
                            this.model.maritalStatus = '';
                            this.model.address= '';
                            this.model.gender = '';
                            this.constituencies=[];
                            this.elections=[];
                             this.alertService.success('Nominayion created successfully', true);
                            this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                     this.alertService.error('Some error occured while creating Nomination', true);
                    this.loading = false;
                });
    }

    /*retrieveCandidateDetails() {
        console.log("inside retrieveCandidateDetails in NominationComponent.ts file");
        this.loading = true;
        this.nominationService.getCandidateDetails(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Nomination successful', true);
                    this.router.navigate(['/nomination']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }*/
}
