export class Reuniones {

    constructor(
        public id: string,
        public reunion: string,
        public multa: string,
        public fecha: string,
        public retraso?: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}