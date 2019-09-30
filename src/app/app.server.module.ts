import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {CookieBackendService, CookieService} from 'ngx-cookie';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    ModuleMapLoaderModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: CookieService, useClass: CookieBackendService}
  ]
})
export class AppServerModule {
}
