import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, DashboardService, NominationService, ConstituencyService, VotingService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';
import { RegisterComponent } from './register/index';
import { NominationComponent } from './nomination/index';
import { BallotComponent } from './ballot/index';
import { ElectionComponent } from './election/election.component';
import { ElectionService } from './election/election.service';
import { BallotService } from './ballot/ballot.service';
import { GetUsersService } from './get-users/getUsers.service';
import { AdjudicatorComponent } from './adjudicator/adjudicator.component';
import { GetUsersComponent } from './get-users/get-users.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
		NominationComponent,
        DashboardComponent,
        RegisterComponent,
        BallotComponent,
        ElectionComponent,
        AdjudicatorComponent,
        GetUsersComponent
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        DashboardService,
        NominationService,
        ConstituencyService,
        ElectionService,
        VotingService,
        BallotService,
        GetUsersService

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }


// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
// import { routing } from './app.routing';

// import { customHttpProvider } from './_helpers/index';
// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
// import { AlertService, AuthenticationService, UserService } from './_services/index';
// import { HomeComponent } from './home/index';
// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';

// @NgModule({
//     imports: [
//         BrowserModule,
//         FormsModule,
//         HttpModule,
//         RouterModule,
//         routing
//     ],
//     declarations: [
//         AppComponent,
//         AlertComponent,
//         HomeComponent,
//         LoginComponent,
//         RegisterComponent
//     ],
//     providers: [
//         customHttpProvider,
//         AuthGuard,
//         AlertService,
//         AuthenticationService,
//         UserService
//     ],
//     bootstrap: [AppComponent]
// })

// export class AppModule { }