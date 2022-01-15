export class Eventos {

    constructor(
        public id: string,
        public evento: string,
        public descripcion: string,
        public precio: string,
        public tiempo_event: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}