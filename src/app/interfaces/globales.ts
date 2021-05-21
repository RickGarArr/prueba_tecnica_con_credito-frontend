export interface IProspecto {
    id?: string;
    nombre?: string;
    apellido_pat?: string;
    apellido_mat?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigo_postal?: string;
    telefono?: string;
    rfc?: string;
    estatus?: "Enviado" | "Autorizado" | "Rechazado";
    observaciones?: string;
    created_at?: Date;
    files?: Array<IFile>;
}

export interface IFile {
    nombre: String,
    filename: String
}