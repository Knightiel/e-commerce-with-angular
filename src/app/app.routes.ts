import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Paginas/home/home.component';
import { ProdutosComponent } from './Paginas/produtos/produtos.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProdutosComponent},
];
