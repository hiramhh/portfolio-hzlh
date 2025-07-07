import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonTemplateComponent } from './home/pokemon/pokemon-template/pokemon-template.component';
import { NgModule } from '@angular/core';
import { PointOfSaleComponent } from './home/point-of-sale/dashboard/point-of-sale.component';

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
        path: 'sales',
        component: PointOfSaleComponent,
        title: 'POS'
    }
];

// @NgModule({
// imports: [RouterModule.forRoot(routes)],
// exports: [RouterModule]
// })

// export class AppRoutingModule{ }