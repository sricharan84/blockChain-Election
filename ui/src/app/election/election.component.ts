import { Component, OnInit } from '@angular/core';
import { ElectionService } from './election.service';
import { Election } from './election.model';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  election: Election[];
  constructor(private electionService: ElectionService) { }

  ngOnInit() {
    this.electionService.getElections()
      .subscribe((res: Election[]) => {
        this.election = res;
        console.log(res);
      });
    

  }

}
