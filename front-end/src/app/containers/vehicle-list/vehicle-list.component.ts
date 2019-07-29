import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { HttpErrorUtil } from 'src/app/util/http-error.util';
import { Body } from 'src/app/model/body.model';
import { Vehicle } from 'src/app/model/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VehicleListComponent implements OnInit {

  myForm: FormGroup;
  vehicles = [];
  
  constructor(private vehicleService: VehicleService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private httpErrorUtil: HttpErrorUtil) { }

  ngOnInit() {
    this.initForm();
    this.list();
  }

  initForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      plate: ['', Validators.required],
      vehicleType: ['', Validators.required]
    });
  }

  list(){
    this.vehicleService.list().subscribe((response: Body<Vehicle[]>) => {
      this.vehicles = response.data;
    },
      (err: HttpErrorResponse) => {
        this.httpErrorUtil.handleHttpError(err);
      }
    );
  }
  
  newVehicle(){
    this.router.navigate(['vehicles/new']);
  }

  editVehicle(vehicle : Vehicle){

  }

  deleteVehicle(id : number){
    this.vehicleService.delete(id).subscribe((response: Body<Vehicle[]>) => {
      this.toastr.success('Veículo deletado com sucesso!');
      this.list();
    },
      (err: HttpErrorResponse) => {
        this.httpErrorUtil.handleHttpError(err);
      }
    );
  }
}
