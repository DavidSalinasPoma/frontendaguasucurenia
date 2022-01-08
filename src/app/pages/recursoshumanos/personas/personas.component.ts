import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  public personasdata: any[] = [];

  constructor(private personaServices: PersonaService) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  /**
   * cargarTodasLasPersonas
   */
  public cargarPersonas() {
    this.personaServices.cargarPersonas()
      .subscribe(resp => {
        this.personasdata = resp.persona;
      }, (err) => {
        console.log(err);
      }
      )
  }

}
