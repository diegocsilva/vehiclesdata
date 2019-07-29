import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { VehicleNewComponent } from './containers/vehicle-new/vehicle-new.component';
import { VehicleListComponent } from './containers/vehicle-list/vehicle-list.component';
import { VehiclesTypesComponent } from './containers/vehicles-types/vehicles-types.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'vehicles', component: VehicleListComponent },
    { path: 'vehicles/new', component: VehicleNewComponent },
    { path: 'vehicles-types', component: VehiclesTypesComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
