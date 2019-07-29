import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';

import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import { VehicleTypeService } from 'src/app/services/vehicleType/vehicle-type.service';
import { Vehicle } from 'src/app/model/vehicle.model';
import { ValidationUtil } from '../../util/validation.util';
import { Body } from '../../model/body.model';
import { VehicleType } from '../../model/vehicleType.model';
import { NotifyComponent } from '../../components/common/notify/notify.component';
import { HttpErrorUtil } from '../../util/http-error.util';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.css']
})
export class VehicleNewComponent implements OnInit {

  myForm: FormGroup;
  typeForm: FormGroup;
  vehiclesTypes = [];

  constructor(
    private toastr: ToastrService,
    private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpErrorUtil: HttpErrorUtil
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadVehiclesTypes();
  }

  initForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      plate: ['', Validators.required],
      vehicleType: ['', Validators.required]
    });
    this.typeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  save() {
    if (!_.isUndefined(this.myForm)) {
      if (this.validForm()) {
        this.vehicleService.create(this.myForm.value).subscribe((response: Body<Vehicle[]>) => {
          if (response.errors !== null && response.errors.length > 0) {
            this.toastr.error(response.errors.join(", "));
          }else{
            this.myForm.reset();
            this.router.navigate(['vehicles']);
            this.toastr.success('Veículo cadastrado com sucesso!');
          }
        },
          (err: HttpErrorResponse) => {
            this.httpErrorUtil.handleHttpError(err);
          }
        );
      }
    }
  }

  saveType() {
    if (!_.isUndefined(this.typeForm)) {
      if (this.validTypeForm()) {
        this.vehicleTypeService.create(this.typeForm.value).subscribe((response: Body<VehicleType[]>) => {
          if (response.errors !== null && response.errors.length > 0) {
            this.toastr.error(response.errors.join(", "));
          }else{
            this.typeForm.reset();
            this.loadVehiclesTypes();
            this.toastr.success('Tipo de veículo cadastrado com sucesso!');
          }
        },
          (err: HttpErrorResponse) => {
            this.httpErrorUtil.handleHttpError(err);
          }
        );
      }
    }
  }

  validForm(): boolean {
    let valid = true;
    if (!ValidationUtil.nullOrEmpty(this.myForm.value.name)) {
      valid = false;
      this.toastr.error('O campo Nome deve ser preenchido!');
    }
    if (!ValidationUtil.nullOrEmpty(this.myForm.value.description)) {
      valid = false;
      this.toastr.error('O campo Descrição deve ser preenchido!');
    }
    if (!ValidationUtil.nullOrEmpty(this.myForm.value.plate)) {
      valid = false;
      this.toastr.error('O campo Placa deve ser preenchido!');
    }
    if (!ValidationUtil.nullOrEmpty(this.myForm.value.vehicleType)) {
      valid = false;
      this.toastr.error('O campo Tipo Veículo deve ser preenchido!');
    }
    return valid;
  }

  validTypeForm(): boolean {
    let valid = true;
    if (!ValidationUtil.nullOrEmpty(this.typeForm.value.name)) {
      valid = false;
      this.toastr.error('O campo Nome deve ser preenchido!');
    }
    if (!ValidationUtil.nullOrEmpty(this.typeForm.value.description)) {
      valid = false;
      this.toastr.error('O campo Descrição deve ser preenchido!');
    }
    return valid;
  }

  resetForm(): void {
    this.myForm.patchValue({
      name: null,
      description: null,
      plate: null,
      vehicleType: null,
    });
  }
  resetTypeForm(): void {
    this.typeForm.patchValue({
      name: null,
      description: null
    });
  }

  cancel() {
    this.resetForm();
    this.router.navigate(['vehicles']);
  }

  loadVehiclesTypes() {
    this.vehicleTypeService.list().subscribe((response: Body<VehicleType[]>) => {
      if (ValidationUtil.nullOrEmpty(response.errors)) {
        this.vehiclesTypes = response.data;
      } else {
        const errors: string = response.errors.join(', ');
        this.toastr.error(errors);
      }
    },
      err => {
        this.httpErrorUtil.handleHttpError(err);
      }
    );
  }
}
