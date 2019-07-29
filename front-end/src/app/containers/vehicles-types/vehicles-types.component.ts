import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VehicleTypeService } from 'src/app/services/vehicleType/vehicle-type.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorUtil } from 'src/app/util/http-error.util';
import { VehicleType } from '../../model/vehicleType.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Body } from '../../model/body.model';


@Component({
  selector: 'app-vehicles-types',
  templateUrl: './vehicles-types.component.html',
  styleUrls: ['./vehicles-types.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VehiclesTypesComponent implements OnInit {
  vehiclesTypes = []; 
  myForm: FormGroup;

  constructor(private vehicleTypeService: VehicleTypeService,
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
      description: ['', Validators.required]
    });
  }
  
  list(){
    this.vehicleTypeService.list().subscribe((response: Body<VehicleType[]>) => {
      this.vehiclesTypes = response.data;
    },
      (err: HttpErrorResponse) => {
        this.httpErrorUtil.handleHttpError(err);
      }
    );
  }

  newVehicleType(){
    this.router.navigate(['vehicles-types/new']);
  }

  editTypeVehicle(vehicleType : VehicleType){

  }

  deleteVehicleType(id : number){
    this.vehicleTypeService.delete(id).subscribe((response: Body<VehicleType[]>) => {
      this.toastr.success('Tipo de Veículo deletado com sucesso!');
      this.list();
    },
      (err) => {
        this.httpErrorUtil.handleHttpError(err);
      }
    );
  }
}
