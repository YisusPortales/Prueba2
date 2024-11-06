import { Productos } from "./Productos"

export interface RespuestaApi{
    products: Productos[];
    limit: number;
    skip: number;
    total: number;
}