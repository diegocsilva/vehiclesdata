import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Vehicle } from 'src/app/model/vehicle.model';
import { Body } from '../../model/body.model';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  create(vehicle: Vehicle): Observable<Body<Vehicle[]>> {
    return this.http.post<Body<Vehicle[]>>(`${environment.vehicle.save}`, vehicle);
  }

  edit(vehicle: Vehicle): any {
    return this.http.put(`${environment.vehicle.edit}`, vehicle);
  }

  findById(id: number): any {
    return this.http.get(`${environment.vehicle.get}/${id}`);
  }

  findByFilter(filter: Body<Vehicle>): Observable<Body<Vehicle[]>> {
    return this.http.post<Body<Vehicle[]>>(`${environment.vehicle.filter}`, filter);
  }

  list(): Observable<Body<Vehicle[]>> {
    return this.http.get<Body<Vehicle[]>>(`${environment.vehicle.list}`);
  }

  delete(id: number): Observable<Body<Vehicle[]>> {
    return this.http.delete<Body<Vehicle[]>>(`${environment.vehicle.delete}/${id}`);
  }
}
