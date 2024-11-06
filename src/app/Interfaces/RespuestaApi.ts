import { Productos } from "./Productos"

export interface RespuestaApi{

    produts: Productos[];
    limit: number;
    skip: number;
    total: number;
}