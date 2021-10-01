import { Component, OnInit } from '@angular/core';
import { KiyokService } from '../shared/kiyok.service';
import { ToastrService } from 'ngx-toastr';
import { Localidad } from '../shared/localidad.model';

@Component({
  selector: 'app-localidades-detalle',
  templateUrl: './localidades-detalle.component.html',
  styles: [
  ]
})
export class LocalidadesDetalleComponent implements OnInit {
  
  constructor(public service: KiyokService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Localidad) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteLocalidad(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Localidades Register');
          },
          err => { console.log(err) }
        )
    }
  }

}
