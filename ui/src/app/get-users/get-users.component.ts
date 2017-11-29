import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersService } from './getUsers.service'; 
import { BallotRes } from '../_models/ballotRes';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  users: any;

  constructor(private router: Router,
    private getUsersService: GetUsersService) {}

  ngOnInit() {
      console.log('========getUsers ngOnInit=============');
      this.getUsersService.getUsers()
      .subscribe((res) => {
          this.users = res;
          console.log(res);
        });
  
  }



}
