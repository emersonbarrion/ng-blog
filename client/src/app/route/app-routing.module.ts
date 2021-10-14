import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayArticlesComponent } from '../pages/display-articles/display-articles.component';
import { CreateArticleComponent } from '../pages/create-article/create-article.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { SearchArticlesComponent } from '../pages/search-articles/search-articles.component';
import { UserService } from '../state/user/user.service';
import { DisplayArticleComponent } from '../pages/display-article/display-article.component';
import { DisplayMyArticlesComponent } from '../pages/display-articles/display-my-articles.component';
import { EditArticleComponent } from '../pages/edit-article/edit-article.component';

const routes: Routes = [
    { path: 'my-articles', component: DisplayMyArticlesComponent, canActivate: [AuthGuard] },
    { path: 'create-article', component: CreateArticleComponent, canActivate: [AuthGuard] },
    { path: 'edit-article', component: EditArticleComponent, canActivate: [AuthGuard] },
    { path: 'search-articles', component: SearchArticlesComponent, canActivate: [AuthGuard] },
    { path: 'articles/:slug', component: DisplayArticleComponent },
    { path: 'articles', component: DisplayArticlesComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard, UserService],
    exports: [RouterModule]
})
export class AppRoutingModule { }
