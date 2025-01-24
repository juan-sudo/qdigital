import { Mercaderia } from '../../types/SolicitudMercaderia';
import { MdArrowBack, MdArrowForward,MdArrowDropDown } from 'react-icons/md';
import React, { useState, useEffect ,useRef} from 'react';
import { MdAdd} from 'react-icons/md';
import { Producto } from '../../types/Producto';
import {  DetalleSolicitudMercaderia } from '../../types/DetalleSolicitudMercaderia';
import Swal from 'sweetalert2';
import axios from "axios";
import { Proveedor } from '../../types/Proveedor';






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




interface ProductoSeleccionado {
  id:number;
  code: string;
  name: string;
  cantidad?:number
  provee:Proveedor

}



// Define el tipo de las opciones
interface ProveedorOption {
  label: JSX.Element | string; // Código subrayado
  value: number; // ID único del proveedor
}

interface ProveedorOptionNombre {
  label: JSX.Element | string; // Nombre subrayado
  value: number; // ID único del proveedor
}


const StockMercaderia = () => {


  const [filteredOptionsProveedorCodigo, setFilteredOptionsProveedorCodigo] = useState<ProveedorOption[]>([]); // Ahora el estado 
  const [filteredOptionsProveedorNombre, setFilteredOptionsProveedorNombre] = useState<ProveedorOptionNombre[]>([]);


  const [selectedProveedor, setSelectedProveedor] = useState<ProveedorOption | null>(null); // Objeto del proveedor seleccionado

 // const [selectedProveedor, setSelectedProveedor] = useState<ProveedorSeleccionado[]>([]); // Productos s
//PROVEEDORRS

  
const listRef = useRef<HTMLUListElement>(null);
const optionRefs = useRef<HTMLLIElement[]>([]);

//datos proveedor
const [proveedorNombre, setProveedorNombre] = useState<string>("");
const [proveedorCodigo, setProveedorCodigo] = useState<string>("");


 // Estado para el índice de la opción seleccionada en la lista
 const [selectedIndex, setSelectedIndex] = useState<number>(-1);


    const [selectedOptionEstadosProveedor, setSelectedOptionEstadosProveedor] = useState("codigo"); 

    const [selectedOptionEstadosProducto, setSelectedOptionEstadosProducto] = useState("codigo"); 

    const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalVer, setShowModalver] = useState(false);
 
  const [expandedMercaderia, setExpandedMercaderia] = useState<Mercaderia | null>(null);
 
 // Estado para los filtros
 const [tipoSolicitudSeleccionado, setTipoSolicitudSeleccionado] = useState<number | null>(null);
 const [tipoOperacionSeleccionado, setTipoOperacionSeleccionado] = useState<number | null>(null);
 //const [filteredMercaderia, setFilteredMercaderia] = useState<Mercaderia[]>(mercaderiaData);

 //transicion de modal
 const [transitioning, setTransitioning] = useState(false); // Para controlar el estado de la transición
 const [selectedItem, setSelectedItem] = useState<Mercaderia | null>(null); // Aquí se asegura que `selectedItem` sea de tipo `Mercaderia`
 

//inputs
 // const [searchTerm, setSearchTerm] = useState<string>("");
 const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Referencia para el temporizador

  const [searchTermNombreProducto, setSearchTermnombreProducto] = useState<string>("");
  const [searchTermCodigoProducto, setSearchTermCodigoProducto] = useState<string>("");

  // const [searchTermNombre, setSearchTermnombre] = useState<string>("");


  //select de input proveedor
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleClick = () => {
    // Dar foco al select cuando se hace clic en el icono o en el select
    selectRef.current?.focus();
  };


//LIMPIA CUANDO CAMBIA EL SELECT PARA BUSCAR
const handleSelectChangeProducto = (e) => {
  setSelectedOptionEstadosProducto(e.target.value);

  // Limpia los valores de los inputs al cambiar la opción
  if (e.target.value === "codigo") {
    setSearchTermnombreProducto(""); // Limpia el valor de nombre
  //  fetchProveedor(currentPage, 7); 
  
   
  } else if (e.target.value === "nombre") {
    setSearchTermCodigoProducto(""); // Limpia el valor de código
  //  fetchProveedor(currentPage, 7);  
  }
};


 
  //transicion de modal
   const inputRef = useRef<HTMLInputElement>(null); // Referencia al input con el tipo correcto




useEffect(() => {
  if (
    (tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 3) || // Mercadería especial para cliente
    (tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 2) || // Mercadería tradicional
    (tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 1)    // Producto nuevo
  ) {
    setDetalleMercaderiaFront([]); // Vacía el detalle si cumple cualquiera de las condiciones
  }
}, [tipoSolicitudSeleccionado, tipoOperacionSeleccionado]);

 // Estado para almacenar los productos obtenidos
 const [mercaderiaData, setMercaderiaData] = useState<Mercaderia[]>([]);
 const [totalPages, setTotalPages] = useState(0);
 const [currentPage, setCurrentPage] = useState(0);
 
 const pageSize = 9 ;  // Puedes cambiar el tamaño de página aquí
 const [totalElementos, setTotalElements] = useState(0);

 
 // useEffect(()=>{
   // console.log("valor de elementos"+totalElementos)


 // Estado para almacenar los productos obtenidos
 const [productos, setProductos] = useState<Producto[]>([]);

   // Función para cargar productos desde la API

  
  
  

    

  // Cargar productos cuando el componente se monta
 
  const [selectedMercaderia, setSelectedMercaderia] = useState<Mercaderia | null>(mercaderiaData[0] || null);
  
  //SELECT PRODUCTO


 
  const getPageNumbers = (totalPages: number, currentPage: number): (number | string)[] => {
    const maxMiddlePages = 4; // Número de páginas en el medio
    const firstPage = 1;
    const lastPage = totalPages;
  
    const pages: (number | string)[] = [];
  
    if (totalPages <= maxMiddlePages + 2) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
  
    const startPage = Math.max(2, currentPage - Math.floor(maxMiddlePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxMiddlePages - 1);
  
    // Ajustar el rango si estamos cerca de los extremos
    if (endPage === totalPages - 1) {
      pages.push(firstPage, "...", ...Array.from({ length: maxMiddlePages }, (_, i) => totalPages - maxMiddlePages + i));
    } else if (startPage === 2) {
      pages.push(...Array.from({ length: maxMiddlePages }, (_, i) => i + 1), "...", lastPage);
    } else {
      pages.push(
        firstPage,
        "...",
        ...Array.from({ length: maxMiddlePages }, (_, i) => startPage + i),
        "...",
        lastPage
      );
    }
  
    return pages;
  };
  

 //ABRIR MODAL
   // Manejador de teclado
     // Manejador de teclado
  const handleKeyDown = (event) => {
    
    const tagName = event.target.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea") {
      return;
    }

  if (event.key === "F5") {
    event.preventDefault(); // Evita que la página se recargue
    if (showModal) {
      closeModal();
    } else {
      openModal();
    }
  }

    if (event.key === "c" || event.key === "C") {
      setTipoSolicitudSeleccionado(1); // Selecciona la opción con value=1
    }
    
    if (event.key === "R" || event.key === "r") {
      setTipoSolicitudSeleccionado(2); // Selecciona la opción con value=1
    }
    if (event.key === "P" || event.key === "p") {
      setTipoOperacionSeleccionado(1); // Selecciona la opción con value=1
    }
    if (event.key === "T" || event.key === "t") {
      setTipoOperacionSeleccionado(2); // Selecciona la opción con value=1
    }
    if (event.key === "e" || event.key === "E") {
      setTipoOperacionSeleccionado(3); // Selecciona la opción con value=1
    }
  };
  
 // Enfocar el input cuando se cumpla la combinación
    useEffect(() => {
     if (
       tipoSolicitudSeleccionado === 1 &&
       (tipoOperacionSeleccionado === 1 || tipoOperacionSeleccionado === 2 || tipoOperacionSeleccionado === 3)
     ) {
       if (inputRef.current) {
         inputRef.current.focus();
       }
     }
   }, [tipoSolicitudSeleccionado, tipoOperacionSeleccionado]); // Escucha cambios en ambos estados
 
   
   useEffect(() => {
     window.addEventListener("keydown", handleKeyDown);
 
     return () => {
       window.removeEventListener("keydown", handleKeyDown);
     };
   }, [showModal]);

//ABRIR EL MODAL



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

// Este useEffect se ejecutará cada vez que cambie tipoSolicitudSeleccionado o tipoOperacionSeleccionado
useEffect(() => {
  // Aquí puedes resetear los datos de detalleMercaderia
  setDetalleMercaderia([]);  // Esto "reinicia" el array de detalleMercaderia

  // Si es necesario, también puedes hacer una nueva petición o lógica adicional
  // para obtener el detalle de la mercadería en función de los valores seleccionados
}, [tipoSolicitudSeleccionado, tipoOperacionSeleccionado]);







const [options, setOptions] = useState<Option[]>([]); // Opciones cargadas
const [optionsProveedor, setOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones cargadas
const [filteredOptions, setFilteredOptions] = useState<Option[]>([]); // Opciones filtradas
const [filteredOptionsCodigo, setFilteredOptionscodigo] = useState<Option[]>([]); // Opciones filtradas
const [filteredOptionsProveedor, setFilteredOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones filtradas
const [selected, setSelected] = useState<number | null>(null); // Índice seleccionado

const [search, setSearch] = useState(""); // Texto de búsqueda
const [searchcodigo, setSearchcodigo] = useState(""); // Texto de búsqueda

const [searchproveedor, setSearchproveedor] = useState(""); // Texto de búsqueda

const [show, setShow] = useState(false); // Controlar visibilidad del dropdown
const [selectedProducts, setSelectedProducts] = useState<ProductoSeleccionado[]>([]); // Productos seleccionados
//eleccionados


const dropdownRef = useRef<HTMLDivElement>(null);
const trigger = useRef<HTMLDivElement>(null);

const [detalleMercaderia, setDetalleMercaderia] = useState<DetalleSolicitudMercaderia[]>([]);
const [detalleMercaderiaFront, setDetalleMercaderiaFront] = useState<DetalleSolicitudMercaderia[]>([]);


const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown
const [dropdownOpenNombre, setDropdownOpenNombre] = useState(false); // Estado para controlar la visibilidad del dropdown


  // Usando useState para almacenar la cantidad inicial
  const [cantidadInicial, setCantidadInicial] = useState<number>(1); // El valor inicial es 0

 


   // Función para manejar el cambio del valor en el input
   
  
  
   

  //END VALOR INICIAL DE CANTIDAD

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setSearch(selectedProducts[0].name);
      setDropdownOpen(false); // Cierra el dropdown después de seleccionar
      setDropdownOpenNombre(false);
    }
  }, [selectedProducts]); // Asegúrate de no necesitar `setSearch` aquí, ya que lo actualizarás directamente

  //CANCELAR

  const closeModal = () => {
    // Restablece el estado a su valor inicial al cancelar
    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de proveedores
    setSearchproveedor(''); // Limpia el campo de búsqueda del proveedor
   // setShowModal(false); // Cierra el modal
    setDetalleMercaderia([]);
    setDetalleMercaderiaFront([]);
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
    setDetalleMercaderia([]);
      // Reinicia cantidadInicial a 1 cuando se cierra el modal
  setCantidadInicial(1); // Restablece el valor de cantidadInicial al valor inicial
  };

//END PROVEEDOR



// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  console.log(filteredOptions);  // Verifica qué hay dentro de filteredOptions
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








// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  setFilteredOptionscodigo(
    options.filter((option) =>
      option.value.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, options]);

// end CODIGO



useEffect(() => {
    console.log("DetalleMercaderia actualizado:", JSON.stringify(detalleMercaderiaFront, null, 2));
  }, [detalleMercaderiaFront]);
  

// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  setFilteredOptionsProveedor(
    optionsProveedor.filter((option) =>
      option.text.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, options]);
//END PROVEEDOR









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

  const handleRowClick = (factura: Mercaderia) => {
    // Si la factura ya está seleccionada, desmarcarla
    if (factura === selectedMercaderia) {
      setSelectedMercaderia(null);
    } else {
      setSelectedMercaderia(factura); // Seleccionar la nueva factura
    }
  
    // Expande la fila si la factura seleccionada no está expandida, o colapsa si ya está expandida
    if (factura === expandedMercaderia) {
      setExpandedMercaderia(null); // Colapsar la fila si ya está expandida
    } else {
      setExpandedMercaderia(factura); // Expandir la fila y mostrar detalles
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  // Filtrar datos según el término de búsqueda
  const filteredFacturaVen = mercaderiaData.filter((factura) =>
    factura.nSolicitud.toString().includes(searchTerm)
  );

 
 
 
 

  
  
 

 

  useEffect(() => {
    // Filtrar opciones según el texto de búsqueda por nombre y por código
    const filteredByName = options.filter((option) =>
      option.text.toLowerCase().includes(search.toLowerCase())
    );
    console.log("filtrando nombre aqui"+filteredByName);
  
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

  const openModalVer = (mercaderia:Mercaderia) => {


    setSelectedProducts([]); // Limpia la lista de productos
    setSearchcodigo(''); // Limpia el campo de búsqueda
    setSelectedProveedor([]); // Limpia la lista de productos
    setSearchproveedor('')
    setShowModalver(true); // Abre el modal
    

    setSelectedItem(mercaderia); // Establecer el artículo seleccionado
    
  };


//FILTAR GENERAL
const loadProveedorG = async (valor: string, tipo: string) => {
  try {
    console.log(`Buscando proveedores por ${tipo}: ${valor}...`);

    const endpoint =
      tipo === "nombre"
        ? `http://localhost:8080/api/proveedores/buscarnombre?nombre=${valor}`
        : `http://localhost:8080/api/proveedores/buscarcodigo?codigo=${valor}`;

    const response = await axios.get(endpoint);

    if (response.status === 200 && response.data && response.data.data) {
      console.log("Proveedores encontrados:", response.data.data);

      if (tipo === "nombre") {
        setFilteredOptionsProveedorNombre(
          response.data.data.map((prov) => ({
            label: (
              <span>
                {prov.codigoProveedor} - <u>{prov.nombre}</u>
              </span>
            ),
            displayText: `${prov.codigoProveedor} - ${prov.nombre}`, // Texto para el input
            value: prov.idProveedores,
          }))
        );
      } else {
        setFilteredOptionsProveedorCodigo(
          response.data.data.map((prov) => ({
            label: (
              <span>
                <u>{prov.codigoProveedor}</u> - {prov.nombre}
              </span>
            ),
            displayText: `${prov.codigoProveedor} - ${prov.nombre}`, // Texto para el input
            value: prov.idProveedores,
          }))
        );
      }
    } else {
      console.warn(`No se encontraron proveedores con el ${tipo} especificado.`);
      tipo === "nombre"
        ? setFilteredOptionsProveedorNombre([])
        : setFilteredOptionsProveedorCodigo([]);
    }
  } catch (error) {
    console.error(`Error al obtener proveedores por ${tipo}:`, error.message);
    tipo === "nombre"
      ? setFilteredOptionsProveedorNombre([])
      : setFilteredOptionsProveedorCodigo([]);
  }
};


const handleInputChangeProveedor = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim();
  if (selectedOptionEstadosProveedor === "nombre") {
   
    setProveedorNombre(value);
    if (value.length >= 1) {
      loadProveedorG(value, "nombre");
    } else {
      setFilteredOptionsProveedorNombre([]);
    }
  } else {
    setProveedorCodigo(value);
    if (value.length >= 1) {
      loadProveedorG(value, "codigo");
    } else {
      setFilteredOptionsProveedorCodigo([]);
    }
  }
};

const handleBlurProveedor = () => {
  setTimeout(() => {
    setFilteredOptionsProveedorCodigo([]);
    setFilteredOptionsProveedorNombre([]);
  }, 150);
};



const handleOptionClickProveedor = async (option: any) => {
  try {
    if (selectedOptionEstadosProveedor === "nombre") {
      setProveedorNombre(option.displayText); // Mostrar texto en el input
      setSelectedProveedor(option);
      setFilteredOptionsProveedorNombre([]);

      console.log("El ID que está: " + option.value);

      // Realizar la llamada a la API con el ID del proveedor seleccionado
      const response = await axios.get(
        `http://localhost:8080/api/productos/buscaridproveedor/${option.value}`
      );
      if (response.data.code === 200) {
        setProductos(response.data.data); // Actualizar el estado con los productos
      } else {
        console.warn("No se encontraron productos para este proveedor.");
      }
      console.log("productos mieco"+productos)
    } else {
      setProveedorCodigo(option.displayText); // Mostrar texto en el input
      setSelectedProveedor(option);
      setFilteredOptionsProveedorCodigo([]);

      console.log("El ID que está: " + option.value);

      // Realizar la llamada a la API con el ID del proveedor seleccionado
      const response = await axios.get(
        `http://localhost:8080/api/productos/buscaridproveedor/${option.value}`
      );
      if (response.data.code === 200) {
        setProductos(response.data.data); // Actualizar el estado con los productos
      } else {
        console.warn("No se encontraron productos para este proveedor.");
      }
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

  
useEffect(() => {
  console.log("productos actualizados de ahora -----:", productos);
}, [productos]);



const handleKeyDownProveedor = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const isNombre = selectedOptionEstadosProveedor === "nombre";
  const filteredOptions = isNombre ? filteredOptionsProveedorNombre : filteredOptionsProveedorCodigo;

  if (filteredOptions.length === 0) return; // Si no hay opciones, no hacer nada

  if (e.key === "ArrowDown") {
    // Mover hacia abajo
    setSelectedIndex((prevIndex) => {
      const nextIndex = Math.min(filteredOptions.length - 1, prevIndex + 1);
      scrollToOption(nextIndex); // Desplazar al nuevo índice
      return nextIndex;
    });
  } else if (e.key === "ArrowUp") {
    // Mover hacia arriba
    setSelectedIndex((prevIndex) => {
      const prevIndexValue = Math.max(0, prevIndex - 1);
      scrollToOption(prevIndexValue); // Desplazar al nuevo índice
      return prevIndexValue;
    });
  } else if (e.key === "Enter" && selectedIndex >= 0) {
    // Seleccionar opción con Enter
    handleOptionClickProveedor(filteredOptions[selectedIndex]);
  }
};

const scrollToOption = (index: number) => {
  if (optionRefs.current[index]) {
    optionRefs.current[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
};

// Reinicia el índice y desplaza al primer elemento al abrir la lista
useEffect(() => {
  if (
    (selectedOptionEstadosProveedor === "nombre" && filteredOptionsProveedorNombre.length > 0) ||
    (selectedOptionEstadosProveedor !== "nombre" && filteredOptionsProveedorCodigo.length > 0)
  ) {
    setSelectedIndex(0); // Reinicia al primer índice
    scrollToOption(0); // Asegura que la vista comience desde el inicio
  }
}, [filteredOptionsProveedorNombre, filteredOptionsProveedorCodigo, selectedOptionEstadosProveedor]);



    //INPUT BUSCAR NOMBRE NOMBRE--------
    const handleInputChangenombreProducto= (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("aqui")
      const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
      const regex = /^[A-Z0-9 _-]*$/; // Permite caracteres válidos
  
      if (regex.test(value)) {
        setSearchTermnombreProducto(value); // Actualiza el término de búsqueda
  
        // Si hay un temporizador activo, cancelarlo
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
  
        // Configurar un nuevo temporizador
        debounceTimeout.current = setTimeout(() => {
          if (value.trim() === "") {
            // Si el campo está vacío, mostrar todos los proveedores
          //  fetchProveedor(currentPage, 7); // Por ejemplo, 10 resultados por página
          } else {
            // Si hay un término de búsqueda, filtrar proveedores
           // buscarcodigoProveedores(value);
          }
        }, 500); // Espera 500 ms antes de ejecutar
      }
    };
 

    //INPUT BUSCAR NOMBRE proveedor
    const handleInputChangeCodigoProducto= (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("aqui")
      const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
      const regex = /^[A-Z0-9 _-]*$/; // Permite caracteres válidos
  
      if (regex.test(value)) {
        setSearchTermCodigoProducto(value); // Actualiza el término de búsqueda
  
        // Si hay un temporizador activo, cancelarlo
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
  
        // Configurar un nuevo temporizador
        debounceTimeout.current = setTimeout(() => {
          if (value.trim() === "") {
            // Si el campo está vacío, mostrar todos los proveedores
          //  fetchProveedor(currentPage, 7); // Por ejemplo, 10 resultados por página
          } else {
            // Si hay un término de búsqueda, filtrar proveedores
           // buscarcodigoProveedores(value);
          }
        }, 500); // Espera 500 ms antes de ejecutar
      }
    };
  
    
  
  // Filtrar productos en base al término de búsqueda y el campo seleccionado
  const filteredProductos = productos.filter((producto) => {
    if (selectedOptionEstadosProducto === "codigo") {
      return producto.producto?.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (selectedOptionEstadosProducto === "nombre") {
      return producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-0 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
         <div className="py-6 px-4 md:px-0 xl:px-0">
        {/* Contenedor flex para alinearlos horizontalmente con espacio entre */}
        <div className="flex justify-between items-center gap-4 ">
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
          className="flex items-center px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 hover:text-white 
                    sm:w-auto w-full text-center"
        >
          <MdAdd className="h-5 w-5 mr-2" />
          Nuevo
        </button>
        
       

        </div>
      </div>


      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4" >
              <th className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white xl:pl-11 ">
                Numero orden
              </th>
             
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                Proveedor
              </th>
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
               Fecha
              </th>
              <th className="min-w-[60px] py-2 px-4 font-medium text-black dark:text-white">
               Estado
              </th>
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
               Responsable
              </th>
              <th className="py-2 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFacturaVen.map((mercaderiaDataItem, key) => (
              <tr key={key}
              onClick={() => handleRowClick(mercaderiaDataItem)} // Manejar clic en la fila
              >
                <td className="border-b border-[#eee] py-2 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span className="font-medium text-black dark:text-white">
                    {mercaderiaDataItem.nSolicitud}
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-2  px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                     {mercaderiaDataItem.tSolicitud === "C" ? "Compra" :
                      mercaderiaDataItem.tSolicitud === "R" ? "Reposicion" :
                     mercaderiaDataItem.tSolicitud}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                <span className="text-black dark:text-white">
                  {
                    mercaderiaDataItem.tOperacion === "E" ? "Especial" :
                    mercaderiaDataItem.tOperacion === "T" ? "Tradicional" :
                    mercaderiaDataItem.tOperacion === "P" ? "Producto nuevo" :
                    mercaderiaDataItem.tOperacion // Si no coincide con ninguno, muestra el valor original
                  }
                </span>
              </td>
              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                <span className="text-black dark:text-white">
                {mercaderiaDataItem.fecha}
                </span>
              </td>
              <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
              <span className={`text-white text-sm  font-medium py-1 px-2  rounded-md 
                ${mercaderiaDataItem.estado === "A" ? "bg-green-500" :
                  
                  mercaderiaDataItem.estado === "P" ? "bg-yellow-500" : 
                  "bg-gray-500"}`
              }>
                {mercaderiaDataItem.estado}
              </span>
            </td>
            <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                <span className="text-black dark:text-white">
                Eduardo
                </span>
              </td>


               
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary"
                      onClick={() => openModalVer(mercaderiaDataItem)}
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

          </tbody>
        </table>
        {/* Paginación */}
        <div className="flex items-center justify-between mt-1 border-gray-200 text-left dark:border-strokedark px-4 py-3 sm:px-6">
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p className="text-sm text-gray-700 dark:text-white">
        Mostrando del{" "}
        <span className="font-medium">{currentPage * pageSize + 1}</span> al{" "}
        <span className="font-medium">
          {Math.min((currentPage + 1) * pageSize, mercaderiaData.length)}
        </span>{" "}
        de <span className="font-medium">{totalElementos}</span> resultados
      </p>
    </div>
    <div>
      <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md shadow-sm">
        {/* Botón Previous */}
        <button
          onClick={() => {
            if (currentPage > 0) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
          disabled={currentPage === 0}
        >
          <span className="sr-only">Previous</span>
          <MdArrowBack aria-hidden="true" className="text-gray-400" />
        </button>

        {/* Páginas numeradas */}
        {getPageNumbers(totalPages, currentPage).map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => pageNumber !== "..." && setCurrentPage(pageNumber - 1)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              pageNumber === currentPage + 1
                ? "bg-amber-600 text-white hover:bg-amber-500"
                : "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Botón Next */}
        <button
          onClick={() => {
            if (currentPage < totalPages - 1) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
          disabled={currentPage === totalPages - 1}
        >
          <span className="sr-only">Next</span>
          <MdArrowForward aria-hidden="true" className="text-gray-400" />
        </button>
      </nav>
    </div>
  </div>
</div>


        
            {/* Modal para agregarsolicitud mercaderia */}
           
            {showModal && (
  <div    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999
    ${transitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} 
    transition-all duration-300 ease-out`}
  >
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[1200px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className=" text-2xl font-bold mb-2 text-center">Agregar Consulta stock</h2> 
      <button
              type="button"
              className="absolute top-0 right-2 text-4xl  text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
              aria-label="Close"
              onClick={closeModal} // Cerrar el modal al hacer clic
            >
              ×
            </button>

{/* DIV DE BUSCA PROVEEDOR */}
<div className="px-4 md:px-0 xl:px-0">
  <div className="flex flex-col md:flex-row items-center w-full"> {/* Cambié flex-row a flex-col en pantallas pequeñas */}
    {/* Select */}
    <div className="w-full md:w-1/5 flex flex-row items-center mb-2 md:mb-0"> {/* Aseguramos que en móviles ocupe todo el ancho */}
      <MdArrowDropDown
        size={30}
        className="ml-2 text-gray-600 dark:text-gray-400"
        onClick={handleClick}
      />
  <select
  id="custom-select"
  value={selectedOptionEstadosProveedor}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedOptionEstadosProveedor(value);

    // Borra el contenido del input dependiendo de la opción seleccionada
    if (value === "nombre") {
      setProveedorCodigo(""); // Limpia el valor de código
    } else {
      setProveedorNombre(""); // Limpia el valor de nombre
    }
  }}
  className="w-full appearance-none bg-transparent outline-none transition focus:outline-none dark:bg-form-input"
>
  <option value="codigo">Código proveedor</option>
  <option value="nombre">Nombre proveedor</option>
</select>

    </div>

    {/* Input */}
    <div className="flex-grow  w-full relative">


    <input
          type="text"
          placeholder={`Escribe el ${
            selectedOptionEstadosProveedor === "nombre"
              ? "nombre del proveedor"
              : "código o nombre del proveedor"
          }`}
          className="w-full bg-transparent px-2 pr-10 py-1 text-black border border-gray-300 rounded-r-xl focus:border-primary focus:outline-none dark:text-white dark:border-gray-600 dark:focus:border-primary"
          value={
            selectedOptionEstadosProveedor === "nombre"
              ? proveedorNombre
              : proveedorCodigo
          }
          onChange={handleInputChangeProveedor}
          onBlur={handleBlurProveedor}
          onKeyDown={handleKeyDownProveedor}
        />

{/* Lista desplegable */}
{(selectedOptionEstadosProveedor === "nombre"
          ? filteredOptionsProveedorNombre.length > 0
          : filteredOptionsProveedorCodigo.length > 0) && (
            <ul
            ref={listRef} // Referencia al contenedor de la lista
            className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 z-50 overflow-y-auto max-h-[200px]">
        
            {(selectedOptionEstadosProveedor === "nombre"
              ? filteredOptionsProveedorNombre
              : filteredOptionsProveedorCodigo
            ).map((option, index) => (
                    
              <li
                key={index}
                ref={(el) => (optionRefs.current[index] = el!)}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  selectedIndex === index ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
                onMouseDown={() => handleOptionClickProveedor(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
          
        )}

    

           
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
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
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
        />
      </svg>
    </div>
  </div>
</div>

{/* DIV DE BUSCA PRODUCTO */}
{/* DIV DE BUSCA PRODUCTO */}
<div className="py-2 px-4 md:px-0 xl:px-0">
  <div className="flex flex-col md:flex-row items-center w-full">
    {/* Select */}
    <div className="w-full md:w-1/5 flex flex-row items-center mb-4 md:mb-0">
      <MdArrowDropDown
        size={30}
        className="ml-2 text-gray-600 dark:text-gray-400"
      />
      <select
        value={selectedOptionEstadosProducto}
        onChange={handleSelectChangeProducto}
        className="w-full appearance-none bg-transparent outline-none transition focus:outline-none dark:bg-form-input"
      >
        <option value="codigo" className="text-body dark:text-bodydark">
          Código producto
        </option>
        <option value="nombre" className="text-body dark:text-bodydark">
          Nombre producto
        </option>
      </select>
    </div>

    {/* Input */}
          <div className="flex-grow relative w-full">
            <input
              type="text"
              placeholder={
                selectedOptionEstadosProducto === "codigo"
                  ? "Escribe código del producto"
                  : "Escribe nombre del producto"
              }
              className="w-full bg-transparent px-2 pr-10 py-1 text-black border border-gray-300 rounded-r-xl focus:border-primary focus:outline-none dark:text-white dark:border-gray-600 dark:focus:border-primary"
              value={searchTerm}
              ref={inputRef}
              onChange={handleInputChange}
            />
          </div>
  </div>
</div>




  <div className="max-w-full overflow-x-auto">

  <div className="max-h-[200px] overflow-y-auto">
  <table className="w-full table-auto">
    <thead className="bg-gray-2 text-left dark:bg-meta-4 sticky top-0 z-10">
      <tr className="bg-gray-2 text-left dark:bg-meta-4">
        <th className="min-w-[150px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
          Codigo
        </th>
        <th className="min-w-[150px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
          Producto
        </th>
        <th className="min-w-[150px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
          S.C.S.
        </th>
        <th className="min-w-[150px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
          Reposición
        </th>
      </tr>
    </thead>

    <tbody>
    {filteredProductos && filteredProductos.length > 0 ? (
            filteredProductos.map((producto: any, index: number) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-2 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {producto.producto} {/* Código del producto */}
                </td>
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                  {producto.nombre} {/* Nombre del producto */}
                </td>
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                  {producto.stockLib} {/* Stock disponible */}
                </td>
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark">
                  {producto.stock} {/* Stock total */}
                </td>
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark text-right">
                  <div className="flex justify-end items-center space-x-3.5">
                    {/* Acciones */}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-2">
                No se encontraron productos.
              </td>
            </tr>
          )}
</tbody>

  </table>
</div>

</div>


<div className="max-w-full overflow-x-auto">
 <p className='text-1xl font-bold text-center'>Movimiento de los ultimos 6 meses</p> 
    
    </div>

<div className="max-w-full overflow-x-auto">

<table className="w-full table-auto">
      
<thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4" >
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11 ">
              
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Enero
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Diciembre
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Noviembre
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Octubre
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Setiembre
            </th>
            
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Agosto
            </th>
            <th className="min-w-[100px] py-0 px-4 font-medium text-black dark:text-white xl:pl-11">
              Medida
            </th>
            
          </tr>
        </thead>
        <tbody>
           <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              Compras
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>

           </tr>


           <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              Ventas
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>


           </tr>

           <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              Sucursal
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>


           </tr>
           <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              Stock
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>


           </tr>
        </tbody>
      </table>

</div>


<div className="max-w-full overflow-x-auto mt-2">

<table className="w-full table-auto">
      
        <tbody>
           

           <tr>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              VIA
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              MC
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              OF
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              9
           </td>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-whitexl:pl-11">
              TR
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              0
           </td>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              PROV
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
              U98780
           </td>
           <td className="border-b border-[#eee] dark:border-strokedark py-0 px-4 pl-9 font-medium text-black dark:text-white xl:pl-11">
              CP
           </td>
           <td className="border-b border-[#eee] py-0 px-4 pl-9 dark:border-strokedark xl:pl-11">
  <input
    type="text"
    placeholder="0"
    className="w-full bg-transparent pr-4 text-black focus:outline-none dark:text-white"
    
  />
</td>





           </tr>
        </tbody>
      </table>

</div>
      {/* Contenedor para los campos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


        </div>

        

        
  {/* TABLA PRODUCTOS */}

 
 {/* Tipo de operación, inicial select */}
<div className="relative my-2">
 

</div>


<hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />
     {/* Tipo de operación termina select */}
                      {/* Botones */}
                      <div className="flex justify-end gap-2">
                      

                        <button
                        
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                          
                            
                          Guardar
                        </button>
                        
                        <button
                        
                         className="px-4 py-2 bg-gray-600  text-white rounded hover:bg-gray-700 " onClick={closeModalVer}
                        >
                          
                            
                          Cancelar
                        </button>
                       
                        

                      </div>
                    </div>
                  </div>
                )}


              {showModalVer &&  selectedItem &&  (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-99999">
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[750px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className="text-3xl font-bold mb-4">Solicitud de Mercadería</h2> 
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
              <p className='px-2 text-2xl font-bold '>{selectedItem.nSolicitud}</p>
            </div>
           
           
          </div>

                
          {/* TABLA PRODUCTOS */}
          <div className="mb-4 space-y-2">
            
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Fecha Registro:</p>
              <p className='px-2 text-sm font-medium'>{selectedItem.fecha}</p>
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
              <p className="text-md  font-bold">Tipo de Solicitud:</p>
              <p className='px-2 text-sm font-medium'>
               
                <span className="text-gray-600 dark:text-white">
                     {selectedItem.tSolicitud === "C" ? "Compra mercaderia" :
                      selectedItem.tSolicitud === "R" ? "Reposicion" :
                      selectedItem.tSolicitud}
                  </span>
                
                </p>
            </div>
          <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Tipo de Operación:</p>
              <p className='px-2 text-sm font-medium'>
              
                <span className=" text-gray-600 dark:text-white">
                  {
                    selectedItem.tOperacion === "E" ? "Especial" :
                    selectedItem.tOperacion === "T" ? "Tradicional" :
                    selectedItem.tOperacion === "P" ? "Producto nuevo" :
                    selectedItem.tOperacion // Si no coincide con ninguno, muestra el valor original
                  }
                </span>
                </p>
            </div>
           
            <div className="flex justify-start items-center">
              <p className=" text-md  font-bold">Estado:</p>
              <p className='px-2 text-sm font-medium'>
              
                <span className={`text-white text-sm  font-medium py-1 px-2  rounded-md 
                ${selectedItem.estado === "A" ? "bg-green-500" :
                  
                  selectedItem.estado === "P" ? "bg-yellow-500" : 
                  "bg-gray-500"}`
              }>
                {selectedItem.estado}
              </span>
                </p>
            </div>
            <div className="flex justify-start items-center">
              <p className=" text-md  font-bold">Guia:</p>
              <p className='px-2 text-sm font-medium'>sin quia</p>
            </div>
           
           
          </div>

                
          {/* TABLA PRODUCTOS */}
          <div className="mb-4 space-y-2">
           
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Fecha de compra:</p>
              <p className='px-2 text-sm font-medium'>12-12-2024</p>
            </div>
            <div className="flex justify-start items-center">
              <p className="text-md  font-bold">Numero de compra:</p>
              <p className='px-2 text-sm font-medium'>234</p>
            </div>
          </div>


        </div>

      





        <div className="overflow-x-auto">
  <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
     
       {/* Condicional para mostrar la columna "Código" */}
       {selectedItem.detalleMercaderia.some(
          (mercaderia) => mercaderia.productoExistente?.producto
        ) && (
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
            Código
          </th>
        )}
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">Producto</th>
        {!selectedItem.detalleMercaderia.some(
          (mercaderia) => mercaderia.cliente
        ) && (
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">Proveedor</th>
      )}
       
       {selectedItem.tOperacion !== "E" ? (
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
          Proveedor
        </th>
      ) : (
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
          Cliente
        </th>
      )}

      {selectedItem.tOperacion == "P" && (
        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
          Observacion
        </th>
      )}
        <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-white">Cantidad</th>

       

      </tr>
    </thead>
    <tbody>
      {selectedItem.detalleMercaderia.map((mercaderia, index) => (
        <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600">
    
          
            
         
           {/* Mostrar la celda "Código" si hay productos válidos */}
           {selectedItem.detalleMercaderia.some(
              (mercaderia) => mercaderia.productoExistente?.producto.length > 0
            ) && (
              <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">
                {mercaderia.productoExistente?.producto || "-"}
              </td>
            )}
             <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">{(mercaderia.productoExistente?.nombre || mercaderia.productoNuevo) || "-"}</td>
         
             {selectedItem.tOperacion !== "E" ? (
          <td className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
            {(mercaderia.productoExistente?.proveedor?.nombre || mercaderia.proveedorNuevo)||"np"}
          </td>
        ) : (
          <td className="px-2 py-2 text-sm text-gray-700 dark:text-white">{(mercaderia.cliente ||  "-")}</td>
        )}

          {selectedItem.detalleMercaderia.some(
              (mercaderia) => mercaderia.productoNuevo.length > 0
            ) && (
          <td className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.observ}</td>

        )}
          <td className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-white justify-center">{mercaderia.cantidad}</td>
        </tr>
      ))}
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
        <td className="px-2 py-2 text-sm text-gray-700 dark:text-white"></td>
        <td className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white"></td>
        <td className="px-4 py-2 text-left text-2xl font-medium text-gray-700 dark:text-white">Total</td>
        <td className="px-4 py-2 text-center text-2xl font-medium text-gray-700 dark:text-white justify-center">
        {
        selectedItem.detalleMercaderia.reduce((total, mercaderia) => total + mercaderia.cantidad, 0)
      }
        </td>
      </tr>
    </tbody>
  </table>
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

      </div>


    </div>
    
  );
};

export default StockMercaderia;
