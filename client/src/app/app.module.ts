import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './route/app-routing.module';
import { AppComponent } from './app.component';
import { DisplayArticlesComponent } from './pages/display-articles/display-articles.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { blogReducer } from './state/blog.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlesEffects } from './state/articles/articles.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { SearchArticlesComponent } from './pages/search-articles/search-articles.component';
import { UserEffects } from './state/user/user.effects';
import { AuthInterceptorService } from './auth-interceptor.service';
import { DisplayArticleComponent } from './pages/display-article/display-article.component';
import { DisplayMyArticlesComponent } from './pages/display-articles/display-my-articles.component';
import { EditArticleComponent } from './pages/edit-article/edit-article.component';

@NgModule({
    declarations: [
        AppComponent,
        DisplayArticlesComponent,
        HeaderComponent,
        LoginComponent,
        CreateArticleComponent,
        SearchArticlesComponent,
        DisplayArticleComponent,
        DisplayMyArticlesComponent,
        EditArticleComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot(blogReducer),
        EffectsModule.forRoot([ArticlesEffects, UserEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
