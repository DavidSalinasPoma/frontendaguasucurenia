import { Persona } from './../models/persona.model';
import { Usuario } from "../models/usuario.model";

export interface CargarUsuario {
    total: number;
    usuario: Usuario[];
    paginate: {
        total: number,
        current_page: number
        per_page: number,
        last_page: number,
        from: number,
        to: number
    };
    user: any;
}