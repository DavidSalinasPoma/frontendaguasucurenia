export class Usuario {

    constructor(
        public id: string,
        public persona_id: string,
        public email: string,
        public pasword?: string,
        public estado?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}