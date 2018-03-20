import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AppService} from './app.service';
import {AuthGuard} from './security/auth.guard';
// import {JwtInterceptor} from "./security/jwt.interceptor";

// @Injectable()
// export class XhrInterceptor implements HttpInterceptor {
//
//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const xhr = req.clone({
//       headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
//     });
//     return next.handle(xhr);
//   }
// }

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    AppService,
    // { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
   /* {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },*/
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


