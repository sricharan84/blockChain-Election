/**
 * mbharti@deloitte.com
 * It is used to display the dashboard for the voting results
 */

import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
// import { Stats } from '../shared/data';
//import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Dashboard } from '../_models/index';
import { DashboardService } from '../_services/index';


@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
   

title: string = 'View the election results';
  subtitle: string ;

  private margin = {top: 5, right: 20, bottom: 10, left: 30};
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;
  // private Stats:any[];
  private statusIs;
  users: User[] = [];
  dashboards: Dashboard[] = [];

  constructor(private dashboardService: DashboardService) {
	  console.log("=============inside constructor=============");
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
	this.findVotingDetails();
  }

  private findVotingDetails() {
	   this.dashboardService.getVotingResult().subscribe(
		dashboards => { 
			this.dashboards= dashboards.votings; 
			console.log(dashboards);
			
			
				this.initSvg();
				this.drawPie();
				
	   });
  }
  
  private initSvg() {
	  console.log("=============inside initSvg=============");
    this.color = d3Scale.scaleOrdinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.arc = d3Shape.arc()
                      .outerRadius(this.radius - 10)
                      .innerRadius(0);
    this.labelArc = d3Shape.arc()
                           .outerRadius(this.radius - 40)
                           .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
                      .sort(null)
                      .value((d: any) => d.count);
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
	
	//return Promise.resolve();
  }

  private drawPie() {
console.log(this.dashboards);
	 this.subtitle =  this.dashboards[0].Constitency;
    let g = this.svg.selectAll(".arc")
                    .data(this.pie(this.dashboards))
                    .enter().append("g")
                    .attr("class", "arc");
    g.append("path").attr("d", this.arc)
                    .style("fill", (d: any) => this.color(d.data.count) );
					/*.on("mouseover",function(e){
			(this)
			.attr("fill-opacity", ".8")
			.css({"stroke": "green", "stroke-width": "1px"});
		})
		.on("mouseout",function(e){
			(this)
			.attr("fill-opacity", "1")
			.css({"stroke-width": "0px"});}).attr("style","cursor:pointer;")
		.append("svg:title")
		   .text(function(d) { return d.data.count; });*/
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("text-anchor", "middle")   
                    .text((d: any) => d.data.Name);
  }

    
}