export class Persona {

    constructor(
        public id: string,
        public carnet: string,
        public expedito: string,
        public nombres: string,
        public ap_paterno: string,
        public sexo: string,
        public direccion: string,
        public email: string,
        public celular: string,
        public celular_familiar: string,
        public nacimiento: string,
        public estado_civil: string,
        public estado?: string,
        public ap_materno?: string,
        public created_at?: string,
        public updated_at?: string
    ) {

    }
}