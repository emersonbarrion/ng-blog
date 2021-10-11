import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayArticlesComponent } from '../pages/display-articles/display-articles.component';
import { CreateArticleComponent } from '../pages/create-article/create-article.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { SearchArticlesComponent } from '../pages/search-articles/search-articles.component';
import { UserService } from '../state/user/user.service';

const routes: Routes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    { path: 'articles/create', component: CreateArticleComponent, canActivate: [AuthGuard] },
    { path: 'articles/search', component: SearchArticlesComponent, canActivate: [AuthGuard] },
    { path: 'articles', component: DisplayArticlesComponent },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard, UserService],
    exports: [RouterModule]
})
export class AppRoutingModule { }
