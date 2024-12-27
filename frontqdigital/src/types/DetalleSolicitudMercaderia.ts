import { Producto } from "./Producto";

export interface DetalleSolicitudMercaderia {
    id: number;                    // Equivalente a Long en Java
    productoNuevo: string;
   // nombreNuevo: string;
    cantidad: number;              // BigDecimal en Java puede representarse como string para evitar problemas de precisión
    marca: string;
    cliente: string;
    observ: string;
    fComprom: string;              // LocalDate en formato ISO-8601 (e.g., "2024-12-25")
    proveedorNuevo: string;
    nCompra: string;
    productoExistente: Producto; // Relación con ProductoDTO

   
};
  