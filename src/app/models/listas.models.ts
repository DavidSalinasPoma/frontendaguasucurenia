export class Listas {
    data: any;
    persona: any;
    barrio: any
    constructor(
        public id: string,
        public mes: string,
        public persona_id?: number,
        public nombre?: string,
        public nombres?: string,
        public carnet?: string,
        public ap_paterno?: string,
        public ap_materno?: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}