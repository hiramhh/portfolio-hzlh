import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonTemplateComponent } from './home/pokemon/pokemon-template/pokemon-template.component';
import { PointOfSaleComponent } from './home/point-of-sale/dashboard/point-of-sale.component';
import { PosComponent } from './home/point-of-sale/pos.component';
import { NotFoundError } from 'rxjs';
import { OrderComponent } from './home/point-of-sale/product/order/order.component';
import { ProductListComponent } from './home/point-of-sale/product/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Component'
    },
    {
        path: 'pokemon',
        component: PokemonTemplateComponent,
        title: 'Pokemones'
    },
    {
        path: 'point-of-sale',
        component: PosComponent,
        title: 'POS',
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'

            },
            {
                path: 'dashboard',
                component:  PointOfSaleComponent,
            },
            {
                path: 'sales',
                component: OrderComponent,
            },
            {
                path: 'product-list',
                component: ProductListComponent,
            }
            
        ]
    },
    {
        path: '**',
        component: NotFoundError
    }
];
