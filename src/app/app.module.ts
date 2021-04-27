import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_ROUTES} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenService} from './services/token.service';
import {API_BASE_URL, getBaseApiUrl} from './services/end-point';
import {ErrorInterceptor} from './helpers/error.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        APP_ROUTES,
        HttpClientModule
    ],
    providers: [
        TokenService,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: API_BASE_URL, useFactory: getBaseApiUrl}
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
