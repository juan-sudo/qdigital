import { Proveedor } from "./Proveedor";

export interface Producto {
  id: number;
  producto: string;
  nombre: string;
  codProv: string;
  cneto:number;
  stockLib: number;
  cantidad: number;
  stDic2023: number;
  compras: number;
  ventas: number;
  stAbr2024: number;
  proveedor?: Proveedor; // Relación con el proveedor (opcional)
}



