import { Component, OnInit } from '@angular/core';
import { KiyokService } from 'src/app/shared/kiyok.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NgForm } from '@angular/forms';
import { Localidad } from 'src/app/shared/localidad.model';

@Component({
  selector: 'app-localidades-detalle-form',
  templateUrl: './localidades-detalle-form.component.html',
  styles: [
  ]
})
export class LocalidadesDetalleFormComponent implements OnInit {

  createAccountForm: FormGroup;
  paises: any;
  provincias: any;

  constructor(public service: KiyokService,
    private toastr: ToastrService) { }

  ngOnInit() {  
    this.service.getPaises().subscribe(
      data => this.paises = data
    );

     }

  onSubmit(form: NgForm) {
    debugger;
    if (this.service.formData.localidadId == 0)
      this.insertRecord(form);    
      
  }

  insertRecord(form: NgForm) {
    debugger;
    this.service.postLocalidad().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('OK', 'Localidad agregada')
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Localidad();
  }


  onChangePais(paisId : number)  
  {
    if(paisId){
      this.service.getProvincias(paisId).subscribe(
        data => this.provincias = data        
      );
    }
    else
    {
      this.provincias = null;
    }  
  }
}
