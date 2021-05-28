import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [ 
{path: 'Home', component: HomeComponent },
{path: 'header-component', component: HeaderComponent },
{path:'ContactUs',component:ContactUsComponent},
{path: 'lis-employee', component: ListEmployeeComponent },
{path: 'create-employee', component: CreateEmployeeComponent },
{ path: '',   redirectTo: '/home-component', pathMatch: 'full' }, 
{ path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
