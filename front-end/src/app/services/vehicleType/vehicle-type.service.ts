import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleType } from '../../model/vehicleType.model';
import { environment } from 'src/environments/environment.prod';
import { Body } from '../../model/body.model';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleTypeService {

  constructor(private http: HttpClient) { }

  create(vehicleType: VehicleType): Observable<Body<VehicleType[]>> {
    return this.http.post<Body<VehicleType[]>>(`${environment.vehicleType.save}`, vehicleType);
  }

  edit(vehicleType: VehicleType): any {
    return this.http.put(`${environment.vehicleType.edit}`, vehicleType).toPromise();
  }

  findById(id: number): any {
    return this.http.get(`${environment.vehicleType.get}/${id}`).toPromise();
  }

  findByFilter(filter: Body<VehicleType>): Observable<Body<VehicleType[]>> {
    return this.http.post<Body<VehicleType[]>>(`${environment.vehicleType.filter}`, filter);
  }

  list(): Observable<Body<VehicleType[]>> {
    return this.http.get<Body<VehicleType[]>>(`${environment.vehicleType.list}`);
  }

  delete(id: number): Observable<Body<VehicleType[]>> {
    return this.http.delete<Body<VehicleType[]>>(`${environment.vehicleType.delete}/${id}`);
  }
}
