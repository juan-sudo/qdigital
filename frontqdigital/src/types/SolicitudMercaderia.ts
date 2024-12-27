import { DetalleSolicitudMercaderia } from "./DetalleSolicitudMercaderia";

export interface Mercaderia {
    nSolicitud: number;         // Equivalente a Long en Java
    tSolicitud: string;
    tOperacion: string;
    estado: string;
    fecha: string;              // Utiliza string para representar LocalDate (formato ISO-8601)
    guia: number;               // Equivalente a Long en Java
    responsable: string;
    detalleMercaderia:DetalleSolicitudMercaderia[];
    
  };