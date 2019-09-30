import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule, PLATFORM_ID, TRANSLATIONS} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {BrowserModule, ɵgetDOM} from '@angular/platform-browser';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {HttpClientModule} from '@angular/common/http';
import {DOCUMENT, isPlatformBrowser, registerLocaleData} from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import localeEn from '@angular/common/locales/en';
import {CookieModule} from 'ngx-cookie';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {RouterModule} from '@angular/router';
import {PrebootModule} from 'preboot';
import { AppComponent } from './app.component';

declare const require;

registerLocaleData(localeVi, 'vi');
registerLocaleData(localeEn, 'en');

export function appInitializer(document: HTMLDocument, platformId: object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const dom = ɵgetDOM();
      const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
      styles.forEach(el => {
        // Remove ng-transition attribute to prevent Angular appInitializerFactory
        // to remove server styles before preboot complete
        el.removeAttribute('ng-transition');
      });
      document.addEventListener('PrebootComplete', () => {
        // After preboot complete, remove the server scripts
        setTimeout(() => styles.forEach(el => dom.remove(el)));
      });
    }
  };
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angularexampleapp'}),
    PrebootModule.withConfig({appRoot: 'app-root'}),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    LazyLoadImageModule.forRoot({}),
    SharedModule
  ],
  declarations: [
    HomePageComponent,
    Error404PageComponent,
    AppComponent
  ],
  providers: [
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'vi';
        return require(`raw-loader!../i18n/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    I18n,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [DOCUMENT, PLATFORM_ID],
      multi: true
    }
  ]
})

export class AppModule {
}
