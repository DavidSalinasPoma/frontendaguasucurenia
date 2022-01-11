export class Usuario {
    persona: any;

    constructor(
        public id: string,
        public persona_id: string,
        public email: string,
        public nombres?: string,
        public ap_paterno?: string,
        public ap_materno?: string,
        public pasword?: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}