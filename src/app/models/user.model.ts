export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public movil?: string,
        public userRole?: string,
        public avatar?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}
