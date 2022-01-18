export class Servicios {

    constructor(
        public id: string,
        public nombre: string,
        public descripcion: string,
        public costo: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}