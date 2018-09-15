import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from './mat.module';

import { MovieComponent } from './movie.component';
import { HeaderComponent } from './headerComponent/header.component';
import { SignInComponent } from './signinComponent/signin.component';
import { SignUpComponent } from './signupComponent/signup.component';
import { MovieListComponent } from './movieListComponent/movielist.component';
import { MovieDetailComponent } from './movieDetailComponent/moviedetail.component';
import { NotFoundComponent } from './notfound.component';

import { AuthService } from './services/auth.service';
import { AuthGuard, NoAuthGuard } from './services/auth-guard.service';
import { MovieService } from './services/mvi.service';
import { MinToHourPipePipe } from './hour.pipe';

const mviRoutes: Routes = [
    {path:'', redirectTo:'sign-in', pathMatch:'full'},
    {path:'sign-in', component: SignInComponent, canActivate: [NoAuthGuard]},
    {path:'sign-up', component: SignUpComponent, canActivate: [NoAuthGuard]},
    {path: 'movies', component: MovieListComponent, canActivate:[AuthGuard]},
    {path: 'movies/:id', component: MovieDetailComponent, canActivate:[AuthGuard]},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports:[
                MatModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientModule,
                RouterModule.forRoot(mviRoutes)
            ],
    declarations:
            [
                HeaderComponent,
                MovieComponent,
                SignInComponent,
                SignUpComponent,
                MovieListComponent,
                MovieDetailComponent,
                MinToHourPipePipe,
                NotFoundComponent
            ],
    providers:
            [
                AuthService,
                AuthGuard,
                NoAuthGuard,
                MovieService
            ],
    exports:
            [
                MovieComponent
            ]
})
export class MovieModule {}