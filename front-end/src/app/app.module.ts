import { VehicleService } from './services/vehicle/vehicle.service';
import { VehicleTypeService } from './services/vehicleType/vehicle-type.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContentComponent } from './components/shared/content/content.component';
import { MainpanelComponent } from './components/shared/mainpanel/mainpanel.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { customNotifierOptions } from './app.notify';
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifyComponent } from './components/common/notify/notify.component';
import { MatToolbarModule, MatTableModule, MatNativeDateModule, } from '@angular/material';
import { VehicleNewComponent } from './containers/vehicle-new/vehicle-new.component';
import { VehicleListComponent } from './containers/vehicle-list/vehicle-list.component';
import { VehiclesTypesComponent } from './containers/vehicles-types/vehicles-types.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { HttpErrorUtil } from './util/http-error.util';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainpanelComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    VehicleNewComponent,
    VehicleListComponent,
    VehiclesTypesComponent,
    ModalComponent
  ],
  imports: [
FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    routes,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatToolbarModule,
    MatNativeDateModule,
    MatTableModule  ],
  providers: [
    VehicleService,
    VehicleTypeService,
    NotifyComponent,
    HttpErrorUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
