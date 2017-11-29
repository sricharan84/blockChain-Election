import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { NominationComponent } from './nomination/index';
import { BallotComponent } from './ballot/index';
import { AdjudicatorComponent } from './adjudicator/index'
import { GetUsersComponent } from './get-users/index';
import { ElectionComponent } from './election/election.component';
import { AuthGuard } from './_guards/index';
// import { ElectionResolveService } from './election/election.resolve.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
	{ path: 'dashboard', component: DashboardComponent },
    { path: 'nomination', component: NominationComponent },
    { path: 'ballot', component: BallotComponent },
    { path: 'adjhome', component: AdjudicatorComponent, canActivate: [AuthGuard]},
    { path: 'elections', component: ElectionComponent },
    { path: 'getusers', component: GetUsersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

