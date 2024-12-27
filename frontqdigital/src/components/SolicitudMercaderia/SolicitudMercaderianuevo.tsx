import { Mercaderia } from '../../types/SolicitudMercaderia';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import React, { useState, useEffect ,useRef} from 'react';
import { MdAdd,MdCleaningServices } from 'react-icons/md';
import { Producto } from '../../types/Producto';

import {  DetalleSolicitudMercaderia } from '../../types/DetalleSolicitudMercaderia';
import { Cliente } from '../../types/Cliente';
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
//end proveedoir


interface ProductoSeleccionado {
  id:number;
  code: string;
  name: string;
  cantidad?:number
  provee:Proveedor

}

interface ProveedorSeleccionado {
  value: number,
  text: string,
  codigo:string,
  selected: boolean,
  direccion:string,


}
//END SELECT



const SolicitudMercaderia = () => {

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
 
  const [proveedorNuevo, setProveedorNuevo] = useState(""); // Estado para manejar el valor del input
  const [productoNuevo, setProductoNuevo] = useState(""); // Estado para manejar el valor del input
  const [clienteNuevo, setClienteNuevo] = useState(""); // Estado para manejar el valor del input
const [inputMostrarProveedor, setInputMostrarProveedor] = useState(""); // Texto de búsqueda

  //transicion de modal
   const inputRef = useRef<HTMLInputElement>(null); // Referencia al input con el tipo correcto

   const handleResetInputs = () => {
    setProductoNuevo(""); // Reinicia el valor del input de producto
    setProveedorNuevo(""); // Reinicia el valor del input de proveedor
    setCantidadInicial(1); // Reinicia la cantidad a 1
    setClienteNombreCompleto(""); // Reinicia el valor del input del cliente
    setObservacion(""); // Reinicia el valor del input de observación
    setSearch(""); // Reinicia el valor del input de búsqueda del producto
    setSearchproveedor(""); // Reinicia el valor del input de búsqueda del proveedor
  };
  
 const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

const mostrarColumnasParaCliente = () => {
  return (
    tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 3 // Mercaderia especial
 
  );
};

const mostrarColumnasParaTradicional = () => {
  return (
    tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 2 // Mercaderia especial
  );
};
const mostrarColumnasParaProductoNuevo = () => {
  return (
    tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 1 // Mercaderia especial
  );
};

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

  // Función para obtener los datos desde el API
  const fetchMercaderia = async (page: number, size: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/solicitud/solicitudes?page=${page}&size=${size}`
      );
      console.log("Solicitud mercaderia de hoy:", response);  // Muestra toda la respuesta
  
      if (response.status === 200 && response.data) {
        // Mapeamos los datos obtenidos de la API para ajustarlos a las interfaces
        const mappedData: Mercaderia[] = response.data.data.content.map((item: any) => ({
          nSolicitud: item.nSolicitud,
          tSolicitud: item.tSolicitud,
          tOperacion: item.tOperacion,
          estado: item.estado,
          fecha: item.fecha,
          guia: item.guia,
          responsable: item.responsable,
          detalleMercaderia: item.detalles.map((detalle: any) => ({
            id: detalle.id,
            productoNuevo: detalle.producto || "",
            nombreNuevo: detalle.nombre,
            cantidad: detalle.cantidad,
            marca: detalle.marca || "",
            cliente: detalle.cliente || "",
            observ: detalle.observ || "",
            fComprom: detalle.fComprom || "",
            proveedorNuevo: detalle.proveedor || "",
            nCompra: detalle.nCompra || "",
            productoExistente: detalle.productoExistente || null,
          })),
        }));
  
        // Actualizamos el estado con los datos mapeados
        setMercaderiaData(mappedData);
        // Guardamos la información de paginación
        //setTotalElements(response.data.totalElements);
        setTotalElements(response.data.data.totalElements); // Aquí puede estar el error

        setTotalPages(response.data.data.totalPages);
        setCurrentPage(response.data.data.currentPage);
      }
    } catch (error) {
      console.error("Error al obtener los datos de mercadería:", error);
    }
  };
  
 // useEffect(()=>{
   // console.log("valor de elementos"+totalElementos)

  //}),([totalElementos]) 

  // Efecto para llamar a la API al montar el componente
    // Efecto para llamar a la API al montar el componente
    useEffect(() => {
      // Llamar a fetchMercaderia con los parámetros adecuados
      fetchMercaderia(currentPage, 7); // Asegúrate de pasar el page y size correctos
    }, [currentPage]); // El useEffect se ejecuta cuando `currentPage` cambia

 // Estado para almacenar los productos obtenidos
 const [productos, setProductos] = useState<Producto[]>([]);

   // Función para cargar productos desde la API

   // Función para cargar productos desde la API
const loadProductos = async () => {
  try {
    console.log("Realizando solicitud a la API...");
    const response = await axios.get("http://localhost:8080/api/productos");
    console.log("Respuesta completa de la API:", response); // Muestra toda la respuesta para depuración

    // Si la respuesta tiene los productos dentro de response.data.data
    setProductos(response.data.data || []); // Actualiza el estado con los productos
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

  useEffect(() => {
    loadProductos();
   
  }, []);

  // useEffect para imprimir los productos cuando se actualizan
useEffect(() => {
  console.log("Productos actualizados:", productos);
}, [productos]);
  
  
  
     // Función para manejar el cambio del valor en el input
     //OBSERVACION
     const handleInputChangeObservacion = (e: React.ChangeEvent<HTMLInputElement>) => {
      setObservacion(e.target.value); // Actualiza el estado con el valor actual
      
    };
    //PRODUCTO
    const handleInputChangeProductoNuevo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductoNuevo(e.target.value); // Actualiza el estado con el valor actual
  
    }
    //PROVEEDOR
    const handleInputChangeProveedorNuevo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProveedorNuevo(e.target.value); // Actualiza el estado con el valor actual
  
    }
//CLIENTE
    const handleInputChangeClienteNuevo = (e: React.ChangeEvent<HTMLInputElement>) => {
      setClienteNuevo(e.target.value); // Actualiza el estado con el valor actual
  
    }
    
      
    const handleInputChangeCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valor = e.target.value;
      setClienteNombreCompleto(valor); // Actualiza el estado del nombre completo del cliente
    
      // Actualiza el cliente en el estado `selectedCliente`
      setSelectCliente((prevCliente) => {
        if (prevCliente.length === 0) {
          return [{ id: null, nombreCompleto: valor }]; // Si no hay cliente, inicializa con un cliente sin ID
        }
    
        // Si hay cliente seleccionado, actualiza solo el nombre
        return prevCliente.map((cliente) => {
          return { ...cliente, nombreCompleto: valor }; // Solo se actualiza el nombre
        });
      });
    
      console.log("Valor actual del input:", valor); // Verifica si el valor del input se actualiza correctamente
    };
    
    
    

  // Cargar productos cuando el componente se monta
 
  const [selectedMercaderia, setSelectedMercaderia] = useState<Mercaderia | null>(mercaderiaData[0] || null);
  
  //SELECT PRODUCTO
 // Aquí evitamos que `productos` cause problemas antes de ser asignado
 const initialData = {
  options: productos.length > 0
    ? productos.map((producto) => ({
        value: producto.producto, // Asignamos el código del producto como valor
        text: producto.nombre, // El nombre del producto como texto
        selected: false // Puedes cambiar esta lógica según sea necesario
      }))
    : []
};


  // Crear un nuevo objeto de solicitud
  const guardarMercaderia = () => { 
    if(productoNuevo.length>0 || proveedorNuevo.length>0){
      return;
    }
    if (!tipoSolicitudSeleccionado || !tipoOperacionSeleccionado) {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona el tipo de solicitud y operación.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }
  

    if (!detalleMercaderiaFront || detalleMercaderiaFront.length === 0) {
      Swal.fire({
        title: "Error",
        text: "No hay detalles de mercadería para guardar.",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }
   
  
    // Mostrar confirmación antes de guardar
    Swal.fire({
      title: "¿Deseas guardar la solicitud?",
      text: "Se guardará la solicitud de mercadería con los detalles actuales.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {

      if (result.isConfirmed) {
        // Crear un nuevo objeto de solicitud
          // Mapear los valores numéricos seleccionados a los códigos correspondientes
          const tipoSolicitudMap: { [key: number]: string } = {
            1: "C", // Compra de mercadería
            2: "R", // Reposición desde bodega
          };
          
          const tipoOperacionMap: { [key: number]: string } = {
            1: "P", // Producto nuevo
            2: "T", // Tradicional
            3: "E", // Especial
          };
          
        // Crear la nueva solicitud
        const nuevaSolicitud = {
          tSolicitud: tipoSolicitudMap[tipoSolicitudSeleccionado], // Asignar dinámicamente
          tOperacion: tipoOperacionMap[tipoOperacionSeleccionado], // Asignar dinámicamente
          estado: "A", // Estado por defecto
          detalles: detalleMercaderiaFront.map((item) => ({
            cantidad: item.cantidad,
            marca: item.marca || " ", // Asignar "Sin marca" si está vacío
            cliente: item.cliente || " ", // Asignar "Sin cliente" si está vacío
            observ: item.observ || " ", // Asignar "Sin observaciones" si está vacío
            fComprom: item.fComprom || null, // Si no hay fecha, dejar como null
            proveedor: item.proveedorNuevo || " ", // Verificar que proveedorNuevo esté presente
            nCompra: item.nCompra || " ", // Si no hay número de compra, asignar valor por defecto
            idproductoExistente: item.productoExistente?.id  || null, // Asignar productoExistente si tiene id
            producto: item.productoNuevo || null, // Asignar productoNuevo si existe
          })),  
        };
  
        // Agregar la nueva solicitud al arreglo de mercadería
      //  mercaderiaData.push(nuevaSolicitud);
  
        console.log("Mercadería guardada:", nuevaSolicitud);

        
  
        // Mostrar mensaje de éxito
        axios.post('http://localhost:8080/api/solicitud', nuevaSolicitud)
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: "¡Guardado!",
            text: "La solicitud de mercadería se guardó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          });
  
          // Limpiar el estado de detalleMercaderia
          setDetalleMercaderiaFront([]);
          setTipoSolicitudSeleccionado(0);
          setTipoOperacionSeleccionado(0);
          setCantidadInicial(0);
          setClienteNuevo("");
          setProductoNuevo("");
          setProveedorNuevo("");
        

          fetchMercaderia(currentPage, 7); // Llama a la función con la página actual y

        })  
        .catch((error) => {
          console.error("Error al guardar la solicitud:", error);
          Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al guardar la solicitud.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
      }
      
      else {
        Swal.fire({
          title: "Cancelado",
          text: "No se guardó la solicitud de mercadería.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    });
  };

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

 const showAlert = () => {
  Swal.fire({
    title: '¡Hola!',
    text: 'Esta es una alerta de prueba.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
};

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

// Este useEffect se ejecutará cada vez que cambie tipoSolicitudSeleccionado o tipoOperacionSeleccionado
useEffect(() => {
  // Aquí puedes resetear los datos de detalleMercaderia
  setDetalleMercaderia([]);  // Esto "reinicia" el array de detalleMercaderia

  // Si es necesario, también puedes hacer una nueva petición o lógica adicional
  // para obtener el detalle de la mercadería en función de los valores seleccionados
}, [tipoSolicitudSeleccionado, tipoOperacionSeleccionado]);


 //END PONER EN CERO

 const mostrarProveedor = () => {
 
  return (
    (tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 1) || // Caso 1: Mercaderia nueva
    (tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 2)   // Caso 2: Mercaderia tradicional
    
  );
};



const mostrarCliente = () => {
  return (
    tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 3 // Mercaderia especial
  );
};

const mostrarObservaciones = () => {
  return (
    tipoSolicitudSeleccionado === 1 && tipoOperacionSeleccionado === 1 // Mercaderia nueva
  );
};





const [options, setOptions] = useState<Option[]>([]); // Opciones cargadas
const [optionsProveedor, setOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones cargadas
const [filteredOptions, setFilteredOptions] = useState<Option[]>([]); // Opciones filtradas
const [filteredOptionsCodigo, setFilteredOptionscodigo] = useState<Option[]>([]); // Opciones filtradas
const [filteredOptionsProveedor, setFilteredOptionsProveedor] = useState<OptionProveedor[]>([]); // Opciones filtradas
const [selected, setSelected] = useState<number | null>(null); // Índice seleccionado

const [search, setSearch] = useState(""); // Texto de búsqueda
const [searchcodigo, setSearchcodigo] = useState(""); // Texto de búsqueda
const [serchpro, setSearchpro] = useState(""); // Texto de búsqueda

const [searchproveedor, setSearchproveedor] = useState(""); // Texto de búsqueda

const [show, setShow] = useState(false); // Controlar visibilidad del dropdown
const [selectedProducts, setSelectedProducts] = useState<ProductoSeleccionado[]>([]); // Productos seleccionados
const [selectedProveedor, setSelectedProveedor] = useState<ProveedorSeleccionado[]>([]); // Productos seleccionados
const [selectedCliente, setSelectCliente] = useState<Cliente[]>([]); // Arreglo vacío como predeterminado


const dropdownRef = useRef<HTMLDivElement>(null);
const trigger = useRef<HTMLDivElement>(null);

const [detalleMercaderia, setDetalleMercaderia] = useState<DetalleSolicitudMercaderia[]>([]);
const [detalleMercaderiaFront, setDetalleMercaderiaFront] = useState<DetalleSolicitudMercaderia[]>([]);


const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar la visibilidad del dropdown
const [dropdownOpenNombre, setDropdownOpenNombre] = useState(false); // Estado para controlar la visibilidad del dropdown

const [dropdownOpenProveedor, setdropdownOpenProveedor] = useState(false); // Estado para controlar la visibilidad del dropdown

  // Usando useState para almacenar la cantidad inicial
  const [cantidadInicial, setCantidadInicial] = useState<number>(1); // El valor inicial es 0

  //VALOR INICIAL DE CANTIDAD

  const [observacion, setObservacion] = useState(""); // Estado para manejar el valor del input

  const [clienteNombreCompleto, setClienteNombreCompleto] = useState(""); // Estado para manejar el valor del input


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


   // Función para manejar el cambio del valor en el input
   
  
  
   

  //END VALOR INICIAL DE CANTIDAD

  useEffect(() => {
    if (selectedProducts.length > 0) {
      setSearch(selectedProducts[0].name);
      setDropdownOpen(false); // Cierra el dropdown después de seleccionar
      setDropdownOpenNombre(false);
    }
  }, [selectedProducts]); // Asegúrate de no necesitar `setSearch` aquí, ya que lo actualizarás directamente
  

const handleSelect = (index: number) => {
  select(index); // Selecciona el producto
  //setDropdownOpen(false); // Cierra el dropdown después de seleccionar
  const selectedOption = filteredOptions[index];
  setSearch(selectedOption.text); // Asigna el nombre
  setSearchcodigo(selectedOption.value); // Asigna el código
  setSearchpro(selectedOption.text);

  setDropdownOpen(false); // Cierra el dropdown después de la selección
  setDropdownOpenNombre(false);
};

  // Cuando el usuario empieza a escribir, mostramos el dropdown
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
   setDropdownOpen(true); // Muestra el dropdown al escribir
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
// Verifica cómo está estructurada tu data
useEffect(() => {
  const dbOptions: Option[] = initialData.options;
  console.log(dbOptions);  // Verifica los datos que se están cargando
  setOptions(dbOptions);
  setFilteredOptions(dbOptions);
}, []);


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

// Cargar opciones desde el objeto inicial
useEffect(() => {
 
  const dbOptions: Option[] = initialData.options;
  
  setOptions(dbOptions);
  setFilteredOptionscodigo(dbOptions);
}, []);

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
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchcodigo(value);
  console.log("Nuevo valor de búsqueda:", value);
};

// Función para manejar el cambio en el input de búsqueda por código
const handleSearchChangeProvedor = (e: React.ChangeEvent<HTMLInputElement>) => {
 
  const value = e.target.value;
  setSearchproveedor(value);
  setdropdownOpenProveedor(true)
};


useEffect(() => {
  const filtered = productos.filter(producto => {
    console.log("Filtrando producto:", producto);
    return producto.producto?.toLowerCase().includes(searchcodigo.toLowerCase());
  }).map(producto => ({
    value: producto.producto,
    text: `${producto.producto} - ${producto.nombre}`,
    selected: false
  }));
  console.log("Buscando con productos:", productos);

  console.log("estas filtrado:", filtered);
  setFilteredOptionscodigo(filtered);
  setDropdownOpen(filtered.length > 0); // Abrir solo si hay opciones filtradas
}, [searchcodigo, productos]);




  // Manejar la selección de un producto
  const handleSelectProduct = (selectedOption: Option) => {
    const selectedProduct = productos.find(producto => producto.producto === selectedOption.value);
    
    if (selectedProduct) {
      // Asegúrate de que 'proveedor' y 'nombre' existen
      const proveedorNombre = selectedProduct.proveedor?.nombre || "Proveedor no disponible"; // Valor por defecto
  
      // Crea un objeto 'proveedor' completo con valores por defecto para los campos faltantes
      const proveedor: Proveedor = {
        idProveedores: selectedProduct.proveedor?.idProveedores ?? 0,
        codigoProveedor: selectedProduct.proveedor?.codigoProveedor ?? "",
        nombre: proveedorNombre, // Asigna el nombre del proveedor
        direccion: selectedProduct.proveedor?.direccion ?? "",
        fono1: selectedProduct.proveedor?.fono1 ?? "",
        ciudad: selectedProduct.proveedor?.ciudad ?? "",
        atencion: selectedProduct.proveedor?.atencion ?? "",
        celuVenta: selectedProduct.proveedor?.celuVenta ?? "",
        ciudadVen: selectedProduct.proveedor?.ciudadVen ?? "",
        adminProveedor: selectedProduct.proveedor?.adminProveedor ?? 0,
        perdida: selectedProduct.proveedor?.perdida ?? 0,
        flete: selectedProduct.proveedor?.flete ?? 0,
        condPago: selectedProduct.proveedor?.condPago ?? 0,
        docto: selectedProduct.proveedor?.docto ?? 0,
        chAdj: selectedProduct.proveedor?.chAdj ?? "",
      };
  
      // Actualiza los estados
      setSelectedProducts([
        {

          id:selectedProduct.id,
          code: selectedProduct.producto,
          name: selectedProduct.nombre,
          provee: proveedor, // Asigna el objeto completo de 'proveedor'
        }
      ]);
  
      setSearchcodigo(selectedProduct.producto); // Actualiza el input con el código seleccionado
      setSearchpro(proveedorNombre); // Establece el nombre del proveedor (si disponible)
      setDropdownOpen(false); // Cierra el dropdown
    }
  };
  

// Filtrar opciones según el texto de búsqueda
useEffect(() => {
  setFilteredOptionscodigo(
    options.filter((option) =>
      option.value.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search, options]);

// end CODIGO


  
const agregarDetalleMercaderia = () => {
  const productoSeleccionado = selectedProducts[0];
  // const proveedorSeleccionado = selectedProveedor[0];
 
  setDetalleMercaderiaFront((prev) => {
    const updated = [...prev];

    // Verifica si el código del producto está vacío
    if (!productoSeleccionado?.code) {

      if(productoNuevo.length>0  ){
 // Si el código es vacío o undefined, agrega un nuevo registro sin hacer la búsqueda
 const newId =
 updated.length > 0
   ? Math.max(...updated.map((item) => item.id)) + 1 // Genera un nuevo ID
   : 1;

updated.push({
 id: newId,
 productoNuevo: productoNuevo,
 cantidad: cantidadInicial,
 marca: "",
 cliente: clienteNuevo ?? "Sin cliente", // Convierte null a "Sin cliente"
 observ: observacion,
 fComprom: "2024-12-25", // Ajusta la fecha según tu lógica
 proveedorNuevo: proveedorNuevo, // Ajusta este valor según tu lógica
 nCompra: "",
 productoExistente: {
   id: 0, // Valor predeterminado
   codProv: "", // Valor predeterminado
   stockLib: 0, // Valor predeterminado
   cantidad: 0, // Valor predeterminado
   producto: "", // Si el código está vacío, se asigna una cadena vacía
   nombre: "", // Si el nombre está vacío, se asigna una cadena vacía
   stDic2023: 0,
   compras: 0,
   ventas: 0,
   stAbr2024: 0,
 },
});

return updated; // Regresa el estado actualizado si no se hace búsqueda
      }
      return prev; 
     
    }
   
    if(productoSeleccionado.name.length>0){
 // Si el código no está vacío, busca el producto existente
 const existingIndexProducto = updated.findIndex(
  (d) => d.productoExistente.producto === productoSeleccionado.code
);

if (existingIndexProducto !== -1) {
  // Si el producto ya existe, incrementar la cantidad
  updated[existingIndexProducto] = {
    ...updated[existingIndexProducto],
    cantidad: updated[existingIndexProducto].cantidad + cantidadInicial, // Incrementar cantidad
  };
} else {
  // Si no existe, agrega un nuevo registro
  const newId =
    updated.length > 0
      ? Math.max(...updated.map((item) => item.id)) + 1
      : 1;

  updated.push({
    id: newId,
    productoNuevo: productoNuevo,
    cantidad: cantidadInicial,
    marca: "",
    cliente: clienteNuevo ?? "Sin cliente", // Convierte null a "Sin cliente"
    observ: observacion,
    fComprom: "2024-12-25",
    proveedorNuevo: proveedorNuevo,
    nCompra: "",
    productoExistente: {
      id: productoSeleccionado?.id??"",
      codProv: "",
      stockLib: 0,
      cantidad: 0,
      producto: productoSeleccionado?.code ?? "", // Si 'code' es vacío, asigna ""
      nombre: productoSeleccionado?.name ?? "", // Si 'name' es vacío, asigna ""
      stDic2023: 0,
      compras: 0,
      ventas: 0,
      stAbr2024: 0,
      proveedor: productoSeleccionado?.provee??"",  // Asigna el objeto completo de proveedor
      
    },
  });
}

return updated;

    }
    return prev; 
   
 // Regresa el estado actualizado
  });

  // Limpiar los valores después de agregar a la tabla
  setSelectedProducts([]); // Limpia los productos seleccionados
  setSelectedProveedor([]); // Limpia los proveedores seleccionados
  setSearchcodigo(""); // Limpiar el input de búsqueda de código
  setSearchproveedor(""); // Limpiar el input de búsqueda de proveedor
  setSearch(""); // Limpiar el input de búsqueda general
  setCantidadInicial(1); // Restablece el valor de cantidadInicial
  setObservacion(""); // Limpia la observación
  setSelectCliente([]); // Limpia los clientes seleccionados
  setProductoNuevo("");
  setProveedorNuevo("");
  setClienteNuevo("");

  // Limpiar el input del cliente
  setClienteNombreCompleto(""); // Limpiar el valor del input del cliente

    // Enfocar el input de observaciones después de agregar
    if (inputRef.current) {
      inputRef.current.focus();
    }
};



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
  console.log("aqui estan");
  setDetalleMercaderiaFront((detalleMercaderia) => {
    return detalleMercaderiaFront.map((mercaderia) =>
      mercaderia.id === id
        ? {
            ...mercaderia,
            cantidad:
              operation === "increase"
                ? mercaderia.cantidad + 1
                : Math.max(1, mercaderia.cantidad - 1), // Asegura que la cantidad no sea menor a 1
          }
        : mercaderia
    );
  });
};


// Función para eliminar un producto de la lista
const removeProduct = (id: number) => {
  setDetalleMercaderiaFront((prevMercaderia) =>
    prevMercaderia.filter((mercaderia) => mercaderia.id !== id)
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
    console.log("filtrando nombre"+filteredByName);
  
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

  const mostrarColumnas = () => {
 
    if (tipoSolicitudSeleccionado && tipoOperacionSeleccionado) {
   // Si tipoSolicitud es 1
   return (
     <>
      <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
      {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente())  && <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">CodigoTradicional</th>}
      {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente()) &&   <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">ProductoTradicional</th>}
 
      { mostrarColumnasParaProductoNuevo()  &&   <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">ProductoNuevo</th>}
 
      { mostrarColumnasParaProductoNuevo()  &&  <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">ProveedorNuevo</th>}
 
        <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Cantidad</th>
       
     { mostrarColumnasParaTradicional()  &&  <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">ProveedorTradicional</th>}
     {mostrarColumnasParaCliente()  && <th className="px-1 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">Cliente</th> }
        
       {mostrarObservaciones()  && <th className="px-1 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">Observaciones</th> }
        <th className=" py-2  text-sm font-medium text-gray-700 dark:text-white w-15">
  <span className="flex justify-center items-center">
    Acciones
  </span>
 </th>
 
      </tr>
    </thead>
    <tbody>

  {detalleMercaderiaFront.length > 0 ? (
    detalleMercaderiaFront.map((mercaderia, index) => (
      <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600">
            {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente())  &&  <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.productoExistente.producto}</td>}
            {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente())  &&  <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.productoExistente.nombre}</td>}
            { mostrarColumnasParaProductoNuevo() && <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.productoNuevo}</td>}
         
        {mostrarColumnasParaProductoNuevo()&& <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.proveedorNuevo}  </td>}
       
        <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(mercaderia.id, "decrease")}
              className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              -
            </button>
            <span className="mx-2 w-6 text-center" >{mercaderia.cantidad}</span>
            <button
              onClick={() => updateQuantity(mercaderia.id, "increase")}
              className="px-2 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </td>
        
       
        { ( mostrarColumnasParaTradicional())&&
        <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white"> {mercaderia.productoExistente?.proveedor?.nombre} </td>}
       
        {mostrarColumnasParaCliente()   &&  <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia?.cliente}</td>}
       
         {/* Mostrar Observaciones solo si la condición es verdadera */}
         {mostrarColumnasParaProductoNuevo() &&  <td className="px-4 py-2  text-left text-sm font-medium text-gray-700 dark:text-white">{mercaderia.observ}</td>}
              
 
         <td className="py-2 text-sm text-gray-700 dark:text-white">
   <div className="flex justify-center items-center relative group">
     <button
       className="hover:text-[red]"
       onClick={() => removeProduct(mercaderia.id)}
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
         />
         <path
           d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
         />
         <path
           d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
         />
         <path
           d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
         />
       </svg>
     </button>
 
     {/* Tooltip */}
     <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2">
       Eliminar
     </div>
   </div>
 </td>
 
 
      </tr>
    ))
  ) : (
    <span></span>
  )}
 
  {/* Always show this row at the bottom to add a new product */}
  <tr >
  {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente())  && 
  <td className=" py-2 text-sm text-gray-700 dark:text-white">
    <div className="relative w-full">
        {/* Búsqueda por código */}
        <input
          type="text"
          value={searchcodigo}
          onChange={handleSearchChange} // Llama a la función cuando el texto cambia
          placeholder="Código"
          className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
            focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
            dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
        />
         {searchcodigo && (
      <button
        onClick={handleClearSearch} // Limpiar el valor del input
        className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
        {/* Dropdown para mostrar productos filtrados */}
        {dropdownOpen && filteredOptionsCodigo.length > 0 && (
          <div ref={dropdownRef} className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white dark:bg-gray-800 shadow-md">
            <ul className="w-full">
              {filteredOptionsCodigo.slice(0, 4).map(option => (
                <li
                  key={option.value}
                  onClick={() => handleSelectProduct(option)} // Selecciona el producto
                  className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {option.value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
 
      
      
      </td>
   }




    {( mostrarColumnasParaTradicional() || mostrarColumnasParaCliente())  && 
    <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
    <div className="relative w-full"> {/* Contenedor padre para controlar ancho */}
    <input
  type="text"
  value={search}
  //onChange={(e) => setSearch(e.target.value)} // Actualiza el estado para la búsqueda por nombre
  onChange={handleInputChange} // Actualiza el estado para la búsqueda por 
  placeholder="Producto"
  className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
    focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
    dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
 />
 {/* Botón de "x" para limpiar el input, solo se muestra si hay texto */}
 {search && (
      <button
        onClick={handleClearSearch} // Limpiar el valor del input
        className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
 
  {search && dropdownOpenNombre &&(
    <div
      ref={dropdownRef}
      className="absolute z-10 mt-1 w-full rounded border border-gray-300 bg-white dark:bg-gray-800 shadow-md"
    >
      <ul className="w-full">
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
    }
 
 
 { mostrarColumnasParaProductoNuevo()  && 
 
    <td className="px-1 py-2  text-gray-700 dark:text-white">
    <div className="relative w-full"> {/* Contenedor padre para controlar ancho */}
    <input
  type="text"
  value={productoNuevo}
  ref={inputRef} 
  //onChange={(e) => setSearch(e.target.value)} // Actualiza el estado para la búsqueda por nombre
  onChange={handleInputChangeProductoNuevo} // Actualiza el estado para la búsqueda por 
  placeholder="Producto nuevo"
  className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
 />
 {/* Botón de "x" para limpiar el input, solo se muestra si hay texto */}
 {search && (
      <button
        onClick={handleClearSearch} // Limpiar el valor del input
        className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
 
 </div>
 
 </td>
 
   }
 
 {mostrarColumnasParaProductoNuevo()   && 
 <td className="px-1 py-2 text-center ">
  <input
   type="text"
           value={proveedorNuevo} // Enlaza el input con el estado
        onChange={handleInputChangeProveedorNuevo} // Llama a la función cada vez que el usuario escribe
 
       
   className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
    placeholder="proveedor nuevo"
  />
 </td>}
 
 <td className=" py-2 text-sm text-gray-700 dark:text-white whitespace-nowrap text-center w-20">
 <div className="inline-flex items-center justify-center gap-1 ">
   {/* Botón de disminución */}
   <button
     onClick={() => updateCantidadInicial("decrease")}
     className="px-2 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
     tabIndex={-1} // Usa -1 como número
   >
     -
   </button>
 
   {/* Input de cantidad */}
   <input
     value={cantidadInicial} // Vinculamos el input al estado
     onChange={(e) => setCantidadInicial(Number(e.target.value))} // Permite cambiar la cantidad manualmente
     size={1}
     className="w-15 py-2 text-center  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1 no-arrows"
     type='number'// Ajusta el ancho del input type
     min="1" // Establece el valor mínimo permitido en 1
     onKeyDown={(e) => {
       if (e.key === "Enter") {
         agregarDetalleMercaderia();
       }
     }}
   />
 
   {/* Botón de incremento */}
   <button
     onClick={() => updateCantidadInicial("increase")}
     className="px-2 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
     tabIndex={-1} // Usa -1 como número
   >
     +
   </button>
 </div>
 
 
          </td>
 
      
 
 
 {(mostrarColumnasParaTradicional())&& <td className="px-1 py-2 text-center">
  <input
            value={serchpro}
  //onChange={(e) => setSearch(e.target.value)} // Actualiza el estado para la búsqueda por nombre
  //onChange={handleInputChange} // Actualiza el estado para la búsqueda por 
 
   className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
    placeholder="proveedor tradicional"
    disabled
  />
 </td>}
     
      {mostrarColumnasParaCliente()&& <td className="px-1 py-2 text-center">
  <input
           value={clienteNuevo} // Enlaza el input con el estado
        onChange={handleInputChangeClienteNuevo} // Llama a la función cada vez que el usuario escribe
   className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
    placeholder="cliente"
    onKeyDown={(e) => {
     if (e.key === "Enter") {
       agregarDetalleMercaderia();
     }
   }}
  />
 </td>}
      
 {mostrarColumnasParaProductoNuevo()   && <td className="px-1 py-2 text-center w-40" >
  <input
           value={observacion} // Enlaza el input con el estado
        onChange={handleInputChangeObservacion} // Llama a la función cada vez que el usuario escribe
        onKeyDown={(e) => {
         if (e.key === "Enter") {
           agregarDetalleMercaderia();
         }
       }}
   className="w-full px-3 py-2  border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white
          focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
          dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
    placeholder="Observacion"
  />
 </td>}
  
 
 
 
 <td className="py-2 text-sm text-gray-700 dark:text-white">
   <div className="flex justify-center items-center relative group">
     <button
       className="hover:text-green-500 focus:outline-none select-none"
       onClick={handleResetInputs} // Llama a la función de reinicio al hacer clic
       tabIndex={-1}
     >
       <MdCleaningServices size={20} /> {/* Aquí se usa el ícono de la escoba */}
     </button>
     
     {/* Tooltip */}
     <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-700 text-white text-xs rounded py-1 px-2">
       Limpiar
     </div>
   </div>
 </td>
 
 
 
    
  </tr>
 </tbody>
 
 
  </table>
         </>
   );
 }
 else{
   null
 }
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
                Numero
              </th>
              <th className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white">
                Tipo Solicitud
              </th>
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                Numero operacion
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

      <h2 className=" text-3xl font-bold mb-4">Agregar solicitud de Mercadería</h2> 
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

       
{/* Tipo de solicitud */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-2">Tipo de solicitud</label>
  <select
  id="tipoSolicitud"
  onChange={(e) => setTipoSolicitudSeleccionado(Number(e.target.value))}
  value={tipoSolicitudSeleccionado || ''}
  className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
      focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
      dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
>
  <option value="">Seleccionar tipo de solicitud</option>
  <option value={1}>Compra de mercaderia</option>
  <option value={2}>Reposicion desde bodega</option>
</select>

</div>

       
        {/* TABLA PRODUCTOS */}
<div className="mb-4 ">
  <label className="block text-sm font-medium mb-2">Tipo de Operación</label>
  <select
  id="tipoOperacion"
  onChange={(e) => setTipoOperacionSeleccionado(Number(e.target.value))}
  value={tipoOperacionSeleccionado || ''}
  className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white 
      focus:border-[#acabeb] focus:ring-[rgba(88,_86,_214,.25)] focus:ring-1 focus:outline-none
      dark:focus:border-[#acabeb] dark:focus:ring-[rgba(88,_86,_214,.25)] dark:focus:ring-1"
>
<option value="">Seleccionar tipo de operación</option>
  <option value={1}>Producto nuevo</option>
  <option value={2}>Tradicional</option>
  <option value={3}>Especial</option>
</select>
</div>

        </div>

        

        
  {/* TABLA PRODUCTOS */}

 
 {/* Tipo de operación, inicial select */}
<div className="relative my-2">
 
{mostrarColumnas()}



</div>


<hr className="border-t border-gray-300 dark:border-gray-600 mb-4" />
     {/* Tipo de operación termina select */}
                      {/* Botones */}
                      <div className="flex justify-end gap-2">
                      

                        <button
                        
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={guardarMercaderia}
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

export default SolicitudMercaderia;
