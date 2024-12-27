import { Producto } from "./Producto";
import { Proveedor } from "./Proveedor";

export type DetalleOrdenCompra = {
    idDetalleOrdenCompra:number,
    numeroSolicitud: number;
    producto:Producto,
    proveedor:Proveedor,
    tipoOperacion:string,
    cantidad:number,
    costo:number,
    total:number,
    estado: string,
    recepcion:number
  };