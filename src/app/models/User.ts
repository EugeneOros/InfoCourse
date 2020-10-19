export interface Role {
    reader?: boolean;
    edytor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string,
    name: string;
    surname: string;
    email: string;
    role: Role;
}