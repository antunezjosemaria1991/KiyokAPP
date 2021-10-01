import { Injectable } from '@angular/core';
import { Localidad } from './localidad.model';
import { HttpClient } from "@angular/common/http";
import { Pais } from './pais.model';

@Injectable({
  providedIn: 'root'
})
export class KiyokService {

  constructor(private http: HttpClient) { }

  readonly baseURL = "http://localhost:7953/"; 

  formData: Localidad = new Localidad();
  listLocalidad: Localidad[];
  listPais: Pais[];

  postLocalidad() {
    return this.http.post(this.baseURL + "api/Localidad", this.formData);
  }

  putLocalidades() {
    return this.http.put(`${this.baseURL}/${this.formData.localidadId}`, this.formData);
  }

  deleteLocalidad(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL + "api/Localidad")
      .toPromise()
      .then(res =>this.listLocalidad = res as Localidad[]);
  }

  getPaises()
  {
    return this.http.get(this.baseURL + "api/Pais");    
  }

  getProvincias(paisId : number)
  {
    return this.http.get(this.baseURL + "api/Provincia/" + paisId);    
  }
}


