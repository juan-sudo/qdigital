import React, { useState, useEffect ,useRef} from 'react';
import { MdAdd } from 'react-icons/md';
import { Producto } from '../../types/Producto';
import { Proveedor } from '../../types/Proveedor';

import Swal from 'sweetalert2';
import { OrdenCompraData } from '../../types/OrdenCompra';
import { DetalleOrdenCompra } from '../../types/DetalleOrdenCompra';



const productos:Producto[] = [
  { codigo: "5021001", nombre: "LAPIZ BICOLOR FABER 737" },
  { codigo: "7806610721310", nombre: "LAPIZ CERA 12 COLORES JOVI REDONDO" },
  { codigo: "5215001", nombre: "ESPIRAL 06 mm 24 HJS." },
  { codigo: "5215002", nombre: "ESPIRAL 10 mm 45 HJS." },
  { codigo: "5215003", nombre: "ESPIRAL 12 mm 60 HJS." },
  { codigo: "5215004", nombre: "ESPIRAL 14 mm 80 HJS." },
  { codigo: "5215005", nombre: "ESPIRAL 18 mm 125 HJS." },
  { codigo: "5215006", nombre: "ESPIRAL 23 mm 155 HJS." },
  { codigo: "7806505010406", nombre: "ARCHIVADOR TORRE 518-A CARTA ANCHO" },
  { codigo: "7806505010604", nombre: "ARCHIVADOR TORRE 518-H OFICIO ANCHO" },
  { codigo: "7806505010550", nombre: "ARCHIVADOR TORRE 515-H OFICIO ANGOSTO" },
  { codigo: "7806610111456", nombre: "ARCHIVADOR RHEIN CARTA ANCHO" },
  { codigo: "7806610111463", nombre: "ARCHIVADOR RHEIN OFICIO ANCHO" },
  { codigo: "7806610111449", nombre: "ARCHIVADOR RHEIN LETRA ANCHO" },
  { codigo: "7806610111432", nombre: "ARCHIVADOR RHEIN OFICIO ANGOSTO" },
  { codigo: "7806610133007", nombre: "CARPETA COLGANTE RHEIN RIEL METALICO" }
];




const proveedor: Proveedor[] = [
  { idProveedor: 1, codigoProveedor: "TORRE", nombre: "PRODUCTOS TORRE S.A.", direccion: "AMERICO VESPUCIO NORTE 2000" },
  { idProveedor: 2, codigoProveedor: "C10", nombre: "TELEFONICA CHILE S.A.", direccion: "" },
  { idProveedor: 3, codigoProveedor: "C11", nombre: "CGE COMPANIA GENERAL DE ELECTR", direccion: "" },
  { idProveedor: 4, codigoProveedor: "C12", nombre: "AGUAS DE ANTOFAGASTA S.A.", direccion: "" },
  { idProveedor: 5, codigoProveedor: "C13", nombre: "ARRIENDO PROPIEDADES", direccion: "" },
  { idProveedor: 6, codigoProveedor: "C14", nombre: "GASTOS VARIOS", direccion: "" },
  { idProveedor: 7, codigoProveedor: "C20", nombre: "SUELDOS Y SALARIOS", direccion: "" },
  { idProveedor: 8, codigoProveedor: "C30", nombre: "IMPOSICIONES", direccion: "" },
];



const ordenCompraData: OrdenCompraData[] = [
  {
    idOrdenCompra: 1,
    numeroCompra: 24450,
    fechaCompra: "2024-06-17",
    fechaRegistro: "2024-06-17",
    estado: "R",
    despacho: "VIVAR 1862 TERCER PISO",
    transporte: "TUR BUS",
    adjunto: "N",
    observacion: "FAVOR ANULAR PRODUCTOS SIN STOCK",
    comentariouno: "21/01/2005 FUE ENVIADO POR TUR BUS CON FECHA 18/01/2005 N§ DE BOLETO",
    comentariodos: "116182902. A DOMICILIO  ESTA PENDIENTE DE ENTREGA EN TUR BUS",
    comentariotres: "LLEGO 25/01/2005 FACTURA N§ 78730",
    detalleOrdenCompra: [
      {
        idDetalleOrdenCompra: 1,
        numeroSolicitud: 0,
        producto: {
          codigo: "1101004",
          nombre: "FORMULARIO 11x9,5x3  500 TRIPLICADO"
        },
        proveedor: {
          idProveedor: 1,
          codigoProveedor: "PROV-001",
          nombre: "SMIRNOW",
          direccion: "Calle Principal 123, Ciudad"
        },
        tipoOperacion: "T",
        cantidad: 10,
        costo: 6540,
        total: 12908,
        estado: "P",
        recepcion: 100
      },
      {
        idDetalleOrdenCompra: 2,
        numeroSolicitud: 5002,
        producto: {
          codigo: "PROD-002",
          nombre: "Producto 2"
        },
        proveedor: {
          idProveedor: 1,
          codigoProveedor: "PROV-001",
          nombre: "SMIRNOW",
          direccion: "Calle Principal 123, Ciudad"
        },
        tipoOperacion: "Compra",
        cantidad: 5,
        costo: 25.0,
        total: 125.0,
        estado: "Pendiente",
        recepcion: 0
      }
    ]
  },
  {
    idOrdenCompra: 2,
    numeroCompra: 1002,
    fechaCompra: "2024-06-18",
    fechaRegistro: "2024-06-17",
    estado: "R",
    despacho: "Entregado",
    transporte: "Transporte ABC",
    adjunto: "factura_456.pdf",
    observacion: "Entrega programada",
    comentariouno: "Producto recibido",
    comentariodos: "Calidad aprobada",
    comentariotres: "Factura pagada",
    detalleOrdenCompra: [
      {
        idDetalleOrdenCompra: 3,
        numeroSolicitud: 5003,
        producto: {
          codigo: "PROD-003",
          nombre: "Producto 3"
        },
        proveedor: {
          idProveedor: 1,
          codigoProveedor: "PROV-001",
          nombre: "SMIRNOW",
          direccion: "Calle Principal 123, Ciudad"
        },
        tipoOperacion: "Compra",
        cantidad: 20,
        costo: 10.0,
        total: 200.0,
        estado: "Completado",
        recepcion: 20
      }
    ]
  }
];




// Definición de tipo para las opciones
interface Option {
  value: string;
  text: string;
  selected: boolean;
 

}
//option proveedor

// Definición de tipo para las opciones
interface OptionProveedor {
  value: number;
  text: string;
  codigo:string;
  selected: boolean;
  direccion: string;


}
//end proveedoir


interface ProductoSeleccionado {
  code: string;
  name: string;
  cantidad?:number

}

interface ProveedorSeleccionado {
  value: number,
  text: string,
  codigo:string,
  selected: boolean,
  direccion:string,


}
//END SELECT



const OrdenCompra = () => {


  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalVer, setShowModalver] = useState(false);


  const [selectedOrdenCompra, setSelectedOrdenCompra] = useState<OrdenCompraData | null>(ordenCompraData[0] || null);


 
 const [numeroOrden, setNumeroOrden] = useState<number>(0); // Estado para manejar el valor numérico
const [tipoOrden, setTipoOrden] = useState(""); // Estado para manejar el valor numérico
const [proveedorOrden, setProveedorOrden] = useState(""); // Estado para manejar el valor numérico
const [totalOrden, setTotalOrden] = useState<number>(0); // Estado para manejar el valor numérico
const [costoOrden, setCostoOrden] = useState<number>(0); // Estado para manejar el valor numérico
// Usando useState para almacenar la cantidad inicial
const [cantidadInicial, setCantidadInicial] = useState<number>(1); // El valor inicial es 0
const handleInputChangeProveedorOrden = (e: React.ChangeEvent<HTMLInputElement>) => {
  setProveedorOrden(e.target.value); // Convertir el valor a número
};
const handleInputChangeNumeroOrden = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNumeroOrden(Number(e.target.value)); // Convertir el valor a número
};

const handleInputChangeTipoOrden = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTipoOrden(e.target.value); // Convertir el valor a número
};

const handleInputChangeTotalOrden = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTotalOrden(Number(e.target.value)); // Convertir el valor a número
};

const handleInputChangeCostoOrden = (e: React.ChangeEvent<HTMLInputElement>) => {
  setCostoOrden(Number(e.target.value)); // Convertir el valor a número
};

 // Actualiza el total en tiempo real cuando cambian cantidad o costo
 useEffect(() => {
  setTotalOrden(cantidadInicial * costoOrden);
}, [cantidadInicial, costoOrden]);
   

 //transicion de modal
 const [transitioning, setTransitioning] = useState(false); // Para controlar el estado de la transición



const showSaveAlert = () => {
  Swal.fire({
    title: '¿Guardar cambios?',
    text: '¿Estás seguro de que deseas guardar los cambios?',
    icon: 'question',
    showCancelButton: true, // Botón para cancelar
    confirmButtonColor: '#28a745', // Color para "Guardar"
    cancelButtonColor: '#d33', // Color para "Cancelar"
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Lógica cuando el usuario confirma
      Swal.fire(
        '¡Guardado!',
        'Los cambios han sido guardados correctamente.',
        'success'
      );
    }
  });
};

const showDeleteAlert = () => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción.',
    icon: 'warning',
    showCancelButton: true, // Mostrar botón de cancelar
    confirmButtonColor: '#d33', // Color para el botón de confirmar
    cancelButtonColor: '#3085d6', // Color para el botón de cancelar
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí colocas la lógica para eliminar
      Swal.fire(
        '¡Eliminado!',
        'El registro ha sido eliminado correctamente.',
        'success'
      );
    }
  });
};
 //PONER EN CERO






//SELECT PRODUCTO
const initialData = {
  options: productos.map((producto) => ({
    value: producto.codigo,
    text: producto.nombre,
    selected: false,
    
  })),
};



//SELECT
const initialDataProvedor = {
  options: proveedor.map((provedor) => ({
    value: provedor.idProveedor,
    text: provedor.nombre,
    selected: false,
    codigo:provedor.codigoProveedor,
    direccion:provedor.direccion,
   
  
  })),
};
//EN PROVEEDOR


const [options, setOptions] = useState<Option[]>([]); // Opciones cargadas
const [optionsProveedor, setOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones cargadas
const [filteredOptions, setFilteredOptions] = useState<Option[]>([]); // Opciones filtradas
const [filteredOptionsProveedor, setFilteredOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones filtradas
const [selected, setSelected] = useState<number | null>(null); // Índice seleccionado

const [search, setSearch] = useState(""); // Texto de búsqueda
const [searchcodigo, setSearchcodigo] = useState(""); // Texto de búsqueda


const [searchproveedor, setSearchproveedor] = useState(""); // Texto de búsqueda
const [show, setShow] = useState(false); // Controlar visibilidad del dropdown
const [selectedProducts, setSelectedProducts] = useState<ProductoSeleccionado[]>([]); // Productos seleccionados
const [selectedProveedor, setSelectedProveedor] = useState<ProveedorSeleccionado[]>([]); // Productos seleccionados


const dropdownRef = useRef<HTMLDivElement>(null);
const trigger = useRef<HTMLDivElement>(null);

const [detalleOrdenCompra, setDetalleOrdenCompra] = useState<DetalleOrdenCompra[]>([]);

const [dropdownOpenNombre, setDropdownOpenNombre] = useState(false); // Estado para controlar la visibilidad del dropdown

const [dropdownOpenProveedor, setdropdownOpenProveedor] = useState(false); // Estado para controlar la visibilidad del dropdown

  
 

  //LIMPIAR CAM´PO PROVEEDOR

  const handleClearSearchProveedor= () =>{
    setSearchproveedor("");
  }
  //LIMPIAR AMBOS CAMPOS.
  const handleClearSearch = () => {
    setSearch('');       // Limpiar el valor de la búsqueda por nombre
    setSearchcodigo(''); // Limpiar el valor de la búsqueda por código
  };
  

  
  // Función para actualizar la cantidad inicial (por ejemplo, al incrementar o decrementar)
  const updateCantidadInicial = (operation: "increase" | "decrease") => {
    setCantidadInicial((prevCantidad) => {
      if (operation === "increase") {
        return prevCantidad + 1; // Aumenta la cantidad en 1
      } else {
        return Math.max(0, prevCantidad - 1); // Disminuye la cantidad, pero no permite valores negativos
      }
    });
  };


 
  
  

  //END VALOR INICIAL DE CANTIDAD

 useEffect(() => {
  if (selectedProducts.length > 0) {
    // Asignamos el nombre del primer producto seleccionado al estado de búsqueda
    setSearch(selectedProducts[0].name);
    //setDropdownOpen(false); // Cierra el dropdown después de seleccionar
    setDropdownOpenNombre(false);
    
    
  }
}, [selectedProducts, setSearch]);

const handleSelect = (index: number) => {
  select(index); // Selecciona el producto
  //setDropdownOpen(false); // Cierra el dropdown después de seleccionar
  const selectedOption = filteredOptions[index];
  setSearch(selectedOption.text); // Asigna el nombre
  setSearchcodigo(selectedOption.value); // Asigna el código
  //setDropdownOpen(false); // Cierra el dropdown después de la selección
  setDropdownOpenNombre(false);
};

  // Cuando el usuario empieza a escribir, mostramos el dropdown
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
   // setDropdownOpen(true); // Muestra el dropdown al escribir
    setDropdownOpenNombre(true)
  };
 
  //CANCELAR

  const closeModal = () => {
    // Restablece el estado a su valor inicial al cancelar
    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de proveedores
    setSearchproveedor(''); // Limpia el campo de búsqueda del proveedor
   // setShowModal(false); // Cierra el modal
   setDetalleOrdenCompra([]);
      // Reinicia cantidadInicial a 1 cuando se cierra el modal
  setCantidadInicial(1); // Restablece el valor de cantidadInicial al valor inicial

  //transicion
  setTransitioning(false); // Inicia la transición de cierre
  setTimeout(() => setShowModal(false), 300); // Oculta el modal después de la animación
  };
  //END CANCELAR

  const closeModalVer = () => {
    // Restablece el estado a su valor inicial al cancelar
    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de proveedores
    setSearchproveedor(''); // Limpia el campo de búsqueda del proveedor
    setShowModalver(false); // Cierra el modal
    setDetalleOrdenCompra([]);
      // Reinicia cantidadInicial a 1 cuando se cierra el modal
  setCantidadInicial(1); // Restablece el valor de cantidadInicial al valor inicial
  };

//PROVEDDOR

// Cargar opciones desde el objeto inicial
useEffect(() => {
  const dbOptionsProveedor: OptionProveedor[] = initialDataProvedor.options.map((option) => ({
    ...option,
    value: option.value ?? 0, // Usar 0 si value es null
  }));
  setOptionsProveedor(dbOptionsProveedor);
  setFilteredOptionsProveedor(dbOptionsProveedor);
  
}, []);


const selectByProveedor = (index: number) => {
  console.log("valor selecioando")
  const realIndex = optionsProveedor.findIndex(
    (option) => option.value === filteredOptionsProveedor[index].value
  );
  setSelected(realIndex);
  setShow(false); // Cerrar el dropdown

  const selectedOption = optionsProveedor[realIndex];
  const newProveedor = {
    value: selectedOption.value,
    text: selectedOption.text,
    selected: false,
    codigo: selectedOption.codigo,
    direccion: selectedOption.direccion,
    
   
   
  };


  setSelectedProveedor((prevProveedor) => {
    const productExists = prevProveedor.some(
      (proveedor) => proveedor.value === newProveedor.value
    );
    return productExists ? prevProveedor : [...prevProveedor, newProveedor];
  });
// Actualiza el valor del input con el texto del proveedor seleccionado

setSearchproveedor(
  `${selectedOption.text} ${selectedOption.codigo} `
);

 
  setdropdownOpenProveedor(false);
};



//END PROVEEDOR

// Cargar opciones desde el objeto inicial
useEffect(() => {
  const dbOptions: Option[] = initialData.options;
  setOptions(dbOptions);
  setFilteredOptions(dbOptions);
}, []);

// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  setFilteredOptions(
    options.filter((option) =>
      option.text.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, options]);
//BUSCAR OIR CODIGO

//
useEffect(() => {
  const filtered = optionsProveedor.filter((option) =>
    `${option.text} ${option.codigo} `
      .toLowerCase()
      .includes(searchproveedor.toLowerCase())
  );

  setFilteredOptionsProveedor(filtered); // Asigna las opciones filtradas

  
}, [searchproveedor, optionsProveedor]);





// Función para manejar el cambio en el input de búsqueda por código
const handleSearchChangeProvedor = (e: React.ChangeEvent<HTMLInputElement>) => {
 
  const value = e.target.value;
  setSearchproveedor(value);
  setdropdownOpenProveedor(true)
};



// end CODIGO


  
  const agregarProductoProveedor = () => {
    if (selectedProducts.length > 0) {
      const productoSeleccionado = selectedProducts[0];
      const proveedorSeleccionado = selectedProveedor[0];
   


      

      setDetalleOrdenCompra((prev) => {
        const updated = [...prev];
  
        const existingIndexProducto = updated.findIndex(
          (d) => d.producto.codigo === productoSeleccionado.code
        );
  
        if (existingIndexProducto !== -1) {
           // Si el producto ya existe, incrementar la cantidad
        updated[existingIndexProducto] = {
          ...updated[existingIndexProducto],
          cantidad: updated[existingIndexProducto].cantidad + cantidadInicial, // Aumentar cantidad
        };
         
        } else {
          const newId =
            updated.length > 0
              ? Math.max(...updated.map((item) => item.idDetalleOrdenCompra)) + 1
              : 1;
  
          updated.push({
            idDetalleOrdenCompra: newId,
            numeroSolicitud: numeroOrden, // Asignar un valor inicial para este campo si es necesario
            producto: {
              codigo: productoSeleccionado.code,
              nombre: productoSeleccionado.name,
            },
            proveedor: proveedorSeleccionado
            ? {
              idProveedor: proveedorSeleccionado.value,
                nombre: proveedorSeleccionado.text,
                codigoProveedor: proveedorSeleccionado.codigo,
                direccion: proveedorSeleccionado.direccion,
               
               
              }
            : {
              idProveedor: null,
              nombre: "",
              codigoProveedor: "",
              direccion: "",
             
             
              }, // Proveedor por defecto si no hay uno seleccionado
              
              tipoOperacion: tipoOrden, // Establecer un valor predeterminado para este campo
              cantidad: cantidadInicial, // Campo requerido
              costo: costoOrden, // Inicializar con un valor predeterminado
              total: totalOrden, // Inicializar con un valor predeterminado
              estado: "Pendiente", // Estado inicial
              recepcion: 0, // Inicializar la recepción como 0 o un valor adecuado
           
          });
        }
  
        return updated;
      })

    
  
      // Limpiar los valores después de agregar a la tabla
      setSelectedProducts([]);
      setSelectedProveedor([]);
      setSearchcodigo(""); // Limpiar el input de búsqueda
      setSearchproveedor("");
      setSearch("");
      setCantidadInicial(1); // Restablece el valor de cantidadInicial
      setNumeroOrden(0);
      setTipoOrden("");
      setTotalOrden(0);
      setCostoOrden(0);

    }
  };
 
  useEffect(() => {
    console.log("detalleOrdenCompra actualizado:", JSON.stringify(detalleOrdenCompra, null, 2));
  }, [detalleOrdenCompra]);
  

// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  setFilteredOptionsProveedor(
    optionsProveedor.filter((option) =>
      option.text.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, options]);
//END PROVEEDOR





const select = (index: number) => {
  const realIndex = options.findIndex(
    (option) => option.text === filteredOptions[index].text
  );
  setSelected(realIndex);
  setSearch(""); // Limpiar el input de búsqueda
  setShow(false); // Cerrar el dropdown

  // Agregar el producto seleccionado a la lista
  const selectedOption = options[realIndex];
  const newProduct = {
    code: selectedOption.value,
    name: selectedOption.text,
    
   
  };

  // Verificar si el producto ya está en la lista de seleccionados
  setSelectedProducts((prevProducts) => {
    const productExists = prevProducts.some(
      (product) => product.code === newProduct.code
    );
    if (productExists) {
      return prevProducts;
    } else {
      return [...prevProducts, newProduct];
    }
  });
};



// Función para aumentar o disminuir la cantidad de un producto
const updateQuantity = (id: number, operation: "increase" | "decrease") => {
  setDetalleOrdenCompra((detalleOrdenCompra) => {
    return detalleOrdenCompra.map((mercaderia) =>
      mercaderia.idDetalleOrdenCompra === id
        ? {
            ...mercaderia,
            cantidad:
              operation === "increase"
                ? mercaderia.cantidad + 1
                : Math.max(1, mercaderia.cantidad - 1), // Asegura que la cantidad no sea menor a 1
            total:
              operation === "increase"
                ? (mercaderia.cantidad + 1) * mercaderia.costo
                : Math.max(1, mercaderia.cantidad - 1) * mercaderia.costo, // Recalcula el total
          }
        : mercaderia
    );
  });
};


// Función para eliminar un producto de la lista
const removeProduct = (id: number) => {
  setDetalleOrdenCompra((prevMercaderia) =>
    prevMercaderia.filter((mercaderia) => mercaderia.idDetalleOrdenCompra !== id)
  );
};

// Cerrar el dropdown al hacer clic fuera
useEffect(() => {
  const clickHandler = ({ target }: MouseEvent) => {
    if (
      !dropdownRef.current ||
      dropdownRef.current.contains(target as Node) ||
      trigger.current?.contains(target as Node)
    )
      return;
    setShow(false);
  };

  document.addEventListener("click", clickHandler);
  return () => document.removeEventListener("click", clickHandler);
}, []);


//END SELECT

  const handleRowClick = (factura: OrdenCompraData) => {
    // Si la factura ya está seleccionada, desmarcarla
    if (factura === selectedOrdenCompra) {
      setSelectedOrdenCompra(null);
    } else {
      setSelectedOrdenCompra(factura); // Seleccionar la nueva factura
    }
  
    
  };



  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filtrar datos según el término de búsqueda
  const filteredFacturaVen = ordenCompraData.filter((factura) =>
    factura.numeroCompra.toString().includes(searchTerm)
  );
 
  // Definimos el tipo de la propiedad de la solicitud y operación para el estado.
type MercaderiaSol = {
  tipoSolicitud: string;
  tipoOperacion: string;
};

  const [newMercaderiaSolu, setNewMercaderiaSolu] = useState<MercaderiaSol>({
    tipoSolicitud: "",
    tipoOperacion: "",
  });

  
  
 

 

  useEffect(() => {
    // Filtrar opciones según el texto de búsqueda por nombre y por código
    const filteredByName = options.filter((option) =>
      option.text.toLowerCase().includes(search.toLowerCase())
    );
  
    const filteredByCode = options.filter((option) =>
      option.value.toLowerCase().includes(searchcodigo.toLowerCase())
    );
  
    // Unir ambos resultados y eliminar duplicados
    const mergedFilteredOptions = [
      ...new Map(
        [...filteredByName, ...filteredByCode].map((item) => [item.value, item])
      ).values(),
    ];
  
    setFilteredOptions(mergedFilteredOptions);
  }, [search, searchcodigo, options]);

  const openModal = () => {
    
    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de productos
    setSearchproveedor('')
    //setShowModal(true); // Abre el modal
    //transicion
    setTransitioning(true); // Inicia la transición de apertura
    setTimeout(() => setShowModal(true), 300); // Abre el modal después de la animación
  
  };

  const openModalVer = () => {
    
    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de productos
    setSearchproveedor('')
    setShowModalver(true); // Abre el modal
  };

  const mostrarColumnas = () => {

    // Si tipoSolicitud es 2 y tipoOperacion es 1, 2 o 3, mostrar solo: Código, Producto, Cantidad, Acciones
   
  // Si tipoSolicitud es 1
  return (
    <>
    <div className="overflow-x-auto">
     <table className="table-auto border-collapse w-full text-sm">
   <thead className="bg-gray-100 dark:bg-gray-700">
     <tr>
     <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Número</th>
     <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Tipo</th>
     <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Proveedor</th>
 
       <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Producto</th>
     
       <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Cantidad</th>
      <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white ">Costo</th>
       <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Total</th>
       <th className="px-1 py-2  text-sm font-medium text-gray-700 dark:text-white">
 <div className="flex justify-center items-center">
   Acciones
 </div>
</th>

     </tr>
   </thead>
   <tbody>
 {detalleOrdenCompra.length > 0 ? (
   detalleOrdenCompra.map((mercaderia, index) => (
     <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600">
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">{mercaderia.numeroSolicitud}</td>
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">{mercaderia.tipoOperacion}</td>
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">{mercaderia.proveedor.nombre}</td>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.producto.nombre}</th>
        
       <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
         <div className="flex items-center">
           <button
             onClick={() => updateQuantity(mercaderia.idDetalleOrdenCompra, "decrease")}
             className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
           >
             -
           </button>
           <span className="mx-2">{mercaderia.cantidad}</span>
           <button
             onClick={() => updateQuantity(mercaderia.idDetalleOrdenCompra, "increase")}
             className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
           >
             +
           </button>
         </div>
       </td>
       
     
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.costo.toFixed(2)}</td>
      
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.total.toFixed(2)}</td>
      
      

       <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
 <div className="flex justify-center items-center">
  
   <button className="hover:text-[red] "
    onClick={() => removeProduct(mercaderia.idDetalleOrdenCompra)}
   >

                     <svg
                       className="fill-current"
                       width="18"
                       height="18"
                       viewBox="0 0 18 18"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path
                         d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                         fill=""
                       />
                       <path
                         d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                         fill=""
                       />
                       <path
                         d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                         fill=""
                       />
                       <path
                         d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                         fill=""
                       />
                     </svg>
                   </button>
 </div>
</td>

     </tr>
   ))
 ) : (
   <span></span>
 )}



 {/* Always show this row at the bottom to add a new product */}
 <tr >
 { <td className="px-1 py-2 text-center w-26">
 <input
          value={numeroOrden} // Enlaza el input con el estado
       onChange={handleInputChangeNumeroOrden} // Llama a la función cada vez que el usuario escribe
  className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
         focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
         dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
   placeholder="numero" type='number'
 />
</td>}
{ <td className="px-1 py-2 text-center w-26">
 <input
          value={tipoOrden} // Enlaza el input con el estado
       onChange={handleInputChangeTipoOrden} // Llama a la función cada vez que el usuario escribe
  className="w-full px-3 py-2 relative  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
         focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
         dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
   placeholder="tipo"
 />
</td>}
{ <td className="px-1 py-2 text-center w-26">
 <input
          value={proveedorOrden} // Enlaza el input con el estado
       onChange={handleInputChangeProveedorOrden} // Llama a la función cada vez que el usuario escribe
  className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
         focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
         dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
   placeholder="proveedor"
 />
</td>}
  
<td className="px-1 py-2 text-sm text-gray-700 dark:text-white">
   <div className=""> {/* Contenedor padre para controlar ancho */}
   <input
 type="text"
 value={search}
 //onChange={(e) => setSearch(e.target.value)} // Actualiza el estado para la búsqueda por nombre
 onChange={handleInputChange} // Actualiza el estado para la búsqueda por 
 placeholder="Producto"
 className="w-100 px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
   focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
   dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
/>
{/* Botón de "x" para limpiar el input, solo se muestra si hay texto */}
{search && (
     <button
       onClick={handleClearSearch} // Limpiar el valor del input
       className="absolute w-100 right-15 top-14 text-gray-500 dark:text-gray-400 cursor-pointer"
     >
       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
       </svg>
     </button>
   )}

 {search && dropdownOpenNombre &&(
   <div
     ref={dropdownRef}
     className="absolute z-10 mt-1 w-100 rounded border border-gray-300 bg-white dark:bg-gray-800 shadow-md"
   >
     <ul className="w-100">
       {filteredOptions.map((option, index) => (
         <li
           key={option.value}
          // onClick={() => select(index)} // Selects an option
          onClick={() => handleSelect(index)} // Selecciona una opción
           className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
         >
           {option.text} - {option.value}
         </li>
       ))}
       {filteredOptions.length === 0 && (
         <li className="p-2 text-sm text-gray-500 dark:text-gray-400">Sin resultados</li>
       )}
     </ul>
   </div>
 )}
</div>

</td>







<td className=" py-2 text-sm text-gray-700 dark:text-white whitespace-nowrap text-center w-20">
<div className="inline-flex items-center justify-center gap-1 ">
  {/* Botón de disminución */}
  <button
    onClick={() => updateCantidadInicial("decrease")}
    className="px-2 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
  >
    -
  </button>

  {/* Input de cantidad */}
  <input
    value={cantidadInicial} // Vinculamos el input al estado
    onChange={(e) => setCantidadInicial(Number(e.target.value))} // Permite cambiar la cantidad manualmente
    size={1}
    className="px-2 py-2 text-center bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
    style={{ width: '2.3em' }} // Ajusta el ancho del input
  />

  {/* Botón de incremento */}
  <button
    onClick={() => updateCantidadInicial("increase")}
    className="px-2 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
  >
    +
  </button>
</div>

         </td>
    



    
     
     
<td className=" w-26 px-1 py-2 text-center ">
 <input
          value={costoOrden} // Enlaza el input con el estado
       onChange={handleInputChangeCostoOrden} // Llama a la función cada vez que el usuario escribe
  className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
         focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
         dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
   placeholder="costo" type='number'
 />
</td>
<td className="px-1 py-2 text-center w-26">
 <input
          value={totalOrden} // Enlaza el input con el estado
       onChange={handleInputChangeTotalOrden} // Llama a la función cada vez que el usuario escribe
  className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
         focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
         dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
   placeholder="Total" type='number' disabled
 />
</td>
 





   <td className="py-2 text-sm text-gray-700 dark:text-white w-14">
     <div className="flex justify-center items-center">
     <button
 onClick={agregarProductoProveedor}
 className="px-2 py-1 text-sm font-medium text-white bg-gray-800 rounded dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
>
 Agregar
</button>



     </div>
   </td>
   
 </tr>
</tbody>


 </table>
 </div>
        </>
  );


};

  
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
         <div className="py-6 px-4 md:px-6 xl:px-7.5">
        {/* Contenedor flex para alinearlos horizontalmente con espacio entre */}
        <div className="flex justify-between items-center gap-4">
          {/* Buscador */}
          
        
          <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
                </svg>
              </button>

              <input
          
            type="text"
            placeholder="Escribe numero"
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            value={searchTerm}
            onChange={handleSearch}

            
            
          />
            </div>
         
          


         {/* Botón Nueva Venta */}
         <button
          onClick={openModal}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:text-white 
                    sm:w-auto w-full text-center"
        >
          <MdAdd className="h-5 w-5 mr-2" />
          Nuevo
        </button>
        
       

        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto ">
        <thead>
  <tr className="bg-gray-2 text-left dark:bg-meta-4">
    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
      N°Orden
    </th>
    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      F. Compra
    </th>
    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      F. Recepción
    </th>
    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      Observacion
    </th>
    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
      Estado
    </th>
    <th className="py-4 px-4 font-medium text-black dark:text-white">
      Acciones
    </th>
  </tr>
</thead>

          <tbody>
            {filteredFacturaVen.map((mercaderiaDataItem, key) => (
              <tr key={key} className="hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => handleRowClick(mercaderiaDataItem)} // Manejar clic en la fila
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    {mercaderiaDataItem.numeroCompra}
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    {mercaderiaDataItem.fechaCompra}
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    {mercaderiaDataItem.fechaRegistro}
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    {mercaderiaDataItem.observacion}
                  </span>
                
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  <span
    className={`text-white font-medium py-1 px-3 rounded-md 
      ${mercaderiaDataItem.estado === "R" ? "bg-green-500" :
        mercaderiaDataItem.estado === "P" ? "bg-yellow-500" : 
        "bg-gray-500"}`
    }
  >
    {mercaderiaDataItem.estado}
  </span>
</td>

              
             


               
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary"
                     onClick={openModalVer}
                    >
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={showDeleteAlert}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}

            {/* Modal para agregarsolicitud mercaderia */}
           
            {showModal && (
  <div    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999
    ${transitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} 
    transition-all duration-300 ease-out`}
  >
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[1200px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className=" text-3xl font-bold mb-4">Agregar orden de compra</h2> 
      <button
              type="button"
              className="absolute top-0 right-2 text-4xl  text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
              aria-label="Close"
              onClick={closeModal} // Cerrar el modal al hacer clic
            >
              ×
            </button>
  {/* Separador */}
  <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

      {/* Contenedor para los campos */}

      <div>
      <div className="space-y-4">
      <div className="relative w-full flex flex-col sm:flex-row items-center sm:items-center">
  <p className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-3 text-sm sm:text-base text-center sm:text-left">
    Provedor
  </p>

     {/* Búsqueda por Código */}

     <div className="relative w-full">
     <input
       type="text"
       value={searchproveedor}
       onChange={handleSearchChangeProvedor} // Actualiza el estado para la búsqueda por código
       placeholder="Proveedor"
       className="w-full px-3 py-1 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
     />
    {searchproveedor && (
     <button
       onClick={handleClearSearchProveedor} // Limpiar el valor del input
       className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 cursor-pointer"
     >
       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
       </svg>
     </button>
   )}
     {searchproveedor && dropdownOpenProveedor  && (
       <div
         ref={dropdownRef}
         className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white dark:bg-gray-800 shadow-md"
       >
         <ul className="w-full">
           {filteredOptionsProveedor.map((option, index) => (
             <li
               key={option.value}
               onClick={() => selectByProveedor(index)} // Selecciona una opción
               className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
             >  
               {option.text} {"-"} {option.codigo} 
             </li>
           ))}
           {filteredOptionsProveedor.length === 0 && (
             <li className="p-2 text-sm text-gray-500 dark:text-gray-400">
               Sin resultados
             </li>
           )}
         </ul>
       </div>
     )}
   </div>
      </div>
      </div>
      </div>

   

        

        
  {/* TABLA PRODUCTOS */}

 
 {/* Tipo de operación, inicial select */}
<div className="relative my-4">
 
{mostrarColumnas()}



</div>
<div>
  <div>Movimiento de los ultimos 6 meses</div>
  <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-sm">
        <thead>
  <tr className="bg-gray-2 text-left dark:bg-meta-4">
  <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white xl:pl-11">
      Enero
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Febrero
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Marzo
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Abril
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Mayo
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Junio
    </th>
    <th className="min-w-[120px] py-2 px-2 font-medium text-black dark:text-white">
      Medida
    </th>
  
  </tr>
</thead>

          <tbody>
         
              <tr  className="hover:bg-gray-100 dark:hover:bg-gray-600"
             
              >
                <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    Compras
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                   0
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                   0
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                  0
                  </span>
                
                </td>
                
                <td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
  <span
    
  >
    10
  </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
  <span
    
  >
    0
  </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
  <span
    
  >
    0
  </span>
</td>

              
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>


               
              
              </tr>
              <tr  className="hover:bg-gray-100 dark:hover:bg-gray-600"
             
             >
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                   Ventas
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                 10
                 </span>
               
               </td>
               
               <td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   10
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   10
 </span>
 
</td>
             </tr>
             <tr 
             className="hover:bg-gray-100 dark:hover:bg-gray-600"
             >
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                   Stock
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                 0
                 </span>
               
               </td>
               
               <td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>

             </tr>
             <tr className="hover:bg-gray-100 dark:hover:bg-gray-600"
             
             >
               <td className="border-b border-[#eee] py-1 px-2 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                   Sucursal
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                  0
                 </span>
               
               </td>
               <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                 <span className="font-medium text-black dark:text-white">
                 0
                 </span>
               
               </td>
               
               <td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   j
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>

             
<td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
 <span
   
 >
   0
 </span>
</td>


              
             
             </tr>

       




                

          </tbody>
        </table>
      </div>

</div>


<hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />
     {/* Tipo de operación termina select */}
                      {/* Botones */}
                      <div className="flex justify-end gap-2">
                      <button
                      onClick={closeModal} 
                      className="px-4 py-2 bg-gray-600  text-white rounded hover:bg-gray-700 "
                    
                   >
                      Cancelar
                    </button>

                        <button
                        
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={showSaveAlert}
                        >
                          
                            
                          Guardar
                        </button>
                      </div>
                    </div>
                  </div>
                )}



            
              {showModalVer && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-99999">
  <div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[750px] max-h-[95vh] overflow-y-auto lg:overflow-y-auto relative modal-scroll">
   
      <h2 className="text-3xl font-bold mb-4">Orden de compra</h2> 
      <button
              type="button"
              className="absolute top-0 right-2 text-4xl  text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
              aria-label="Close"
              onClick={closeModalVer} // Cerrar el modal al hacer clic
            >
              ×
            </button>
  {/* Separador */}
  <hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />

  
      {/* Contenedor para los campos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
          
          {/* Tipo de solicitud */}
          <div className="mb-4 space-y-2">
          <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Numero de orden: </p>
              <p className='px-2 text-2xl font-bold '>1002</p>
            </div>
           
           
          </div>

                
          {/* TABLA PRODUCTOS */}
          <div className="mb-4 space-y-2">
            
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Fecha Registro:</p>
              <p className='px-2 text-sm font-medium'>23-12-2024</p>
            </div>
           
          </div>


        </div>


  <div className="">
 
 {/* Tipo de solicitud */}
 <div className="">
   <h2 className="block text-1xl font-medium py-1  bg-gray-100 dark:bg-gray-700 ">Detalle solicitud</h2>
   
 
 </div>




</div>


      {/* Contenedor para los campos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
          
          {/* Tipo de solicitud */}
          <div className="mb-4 space-y-2">
          <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Despacho:</p>
              <p className='px-2 text-sm font-medium'>VIVAR 1862 TERCER PISO  </p>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Transporte:</p>
              <p className='px-2 text-sm font-medium'>TUR BUS</p>
            </div>
            <div className="flex justify-start items-center">
              <p className=" text-md  font-bold">Estado:</p>
              <p className='px-2 text-sm font-medium'>A</p>
            </div>
            <div className="flex justify-start items-center">
              <p className=" text-md  font-bold">Adjunto:</p>
              <p className='px-2 text-sm font-medium'>N</p>
            </div>
           
           
          </div>

           
          {/* TABLA PRODUCTOS */}
          <div className="mb-2 space-y-2">
           
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Fecha de compra:</p>
              <p className='px-2 text-sm font-medium'>12-12-2024</p>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Numero de solcitud:</p>
              <p className='px-2 text-sm font-medium'>0</p>
            </div>
          </div>


        </div>
        <div className="flex justify-start items-center space-y-2 mb-4">
              <p className="text-md  font-bold">Observacion:</p>
              <p className='px-2 text-sm font-medium'>FAVOR ANULAR PRODUCTOS SIN STOCK</p>
            </div>

               

        <div className="">
 
          {/* Tipo de solicitud */}
          <div className="">
            <h2 className="block text-1xl font-medium py-1  bg-gray-100 dark:bg-gray-700 ">Proveedor </h2>
            <label className="block text-sm font-medium my-3">PRODUCTOS TORRE S.A. TORRE </label>
          
          </div>

       
       

        </div>



<div>
<div className="overflow-x-auto">
<table className="min-w-full table-auto border-collapse">
   <thead className="bg-gray-100 dark:bg-gray-700">
     <tr>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Código</th>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Producto</th>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Tipo</th>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Cantidad</th>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Costo</th>
       <th className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Total </th>
     
      
     

     </tr>
   </thead>
   <tbody>
 
     <tr  className="hover:bg-gray-100 dark:hover:bg-gray-600">
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">7806505010406</td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">ARCHIVADOR TORRE 518-A CARTA ANCHO</td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">T</td>
        
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">2</td>
       <td className="px-4 py-2  text-center text-sm font-medium text-gray-700 dark:text-white justify-center "><span>12.20</span></td>
        
       <td className="px-4 py-2  text-center text-sm font-medium text-gray-700 dark:text-white justify-center "><span>24.20</span></td>
               
       
      


     </tr>
     
     <tr  className="hover:bg-gray-100 dark:hover:bg-gray-600">
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">1101004</td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">"FORMULARIO 11x9,5x2 1000 DUPLICADO"</td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">T</td>
        
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">2</td>
       <td className="px-4 py-2  text-center text-sm font-medium text-gray-700 dark:text-white justify-center "><span>10.20</span></td>
        
       <td className="px-4 py-2  text-center text-sm font-medium text-gray-700 dark:text-white justify-center "><span>20.20</span></td>
               
       
      


     </tr>
     
     <tr  className="hover:bg-gray-100 dark:hover:bg-gray-600">
       <td className="px-2 py-2 text-sm text-gray-700 dark:text-white"></td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white"></td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white"></td>
       <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white"></td>
       <td className="px-4 py-2  text-left text-2xl  font-medium text-gray-700 dark:text-white"> Total</td>
       <td className="px-4 py-2  text-center text-2xl font-medium text-gray-700 dark:text-white justify-center  text-1xl"><span>44.40</span></td>
        
                
       
      


     </tr>


</tbody>


 </table>
 
</div>

</div>
        

        
  {/* TABLA PRODUCTOS */}

 



<hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />
     {/* Tipo de operación termina select */}
                      {/* Botones */}
                      <div className="flex justify-end gap-2">
                      <button
                      onClick={closeModalVer} 
                      className="px-4 py-2 bg-gray-600  text-white rounded hover:bg-gray-700 "
                    
                   >
                      Cancelar
                    </button>

                      </div>
                    </div>
                  </div>
                )}



                

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdenCompra;
