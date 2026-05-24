export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  marca: string;
  imagen: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface Orden {
  id?: string;
  items: ItemCarrito[];
  total: number;
  fecha?: string;
  estado?: string;
}
