import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { DashboardComponent } from './dashboard/index';
import { NominationComponent } from './nomination/index';
import { BallotComponent } from './ballot/index';
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
    { path: 'elections', component: ElectionComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

