import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { ProductsModule } from './components/products/products.module';
import { PlacesModule } from './components/places/places.module';

const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  // {path: 'vi/', component: HomePageComponent, pathMatch: 'full'},
  // {path: 'en/', component: HomePageComponent, pathMatch: 'full'},
  {path: 'places', loadChildren: () => import('./components/places/places.module').then(m => m.PlacesModule)},
  {path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule)},
  {path: '404', component: Error404PageComponent},
  // {path: 'en', redirectTo: 'en/'},
  // {path: 'vi', redirectTo: 'vi/'}, // because english language is the default one

  // otherwise redirect to 404
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
