export class DetalleReuniones {

    constructor(
        public id: string,
        public detalle_id: string,
        public carnet: string,
        public expedito: string,
        public fecha: string,
        public multa: string,
        public nombres: string,
        public paterno: string,
        public materno: string,
        public reunion: string,
        public opcion: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}