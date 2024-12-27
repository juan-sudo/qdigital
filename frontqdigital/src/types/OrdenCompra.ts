
import { DetalleOrdenCompra } from "./DetalleOrdenCompra";

export type OrdenCompraData = {
    idOrdenCompra:number,
    numeroCompra: number;
    fechaCompra: string;
    fechaRegistro: string;
    estado:string,
    despacho:string,
    transporte:string,
    adjunto:string,
    observacion:string,
    comentariouno:string,
    comentariodos:string,
    comentariotres:string,
    detalleOrdenCompra:DetalleOrdenCompra[]
  };