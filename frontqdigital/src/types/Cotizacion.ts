import { DetalleCotizacion } from "./DetalleCotizacion";
import { Proveedor } from "./Proveedor";

export interface Cotizacion {
  id: number;
  numero: string;
  fechaCotizacion: string;
  responsable: string;
  proveedor: Proveedor;
  detalleCotizacionDTO: DetalleCotizacion[];
  
}



