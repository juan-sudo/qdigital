
import { MdArrowBack, MdArrowForward,MdOutlineSettings,MdAutoDelete,MdEdit } from 'react-icons/md';

import React, { useState, useEffect ,useRef} from 'react';
import { MdAdd,MdPersonAddAlt1 } from 'react-icons/md';
import { Producto } from '../../types/Producto';


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







const Proveedores = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalCostos, setShowModalCostos] = useState(false);
  const [showModalDeta, setShowModalDeta] = useState(false); // Controla el 

  //PARA BOTON MODIFCAR
  const [isEditingCliente, setIsEditingCliente] = useState(false); // Controla si
  const [isEditingCosto, setIsEditingCosto] = useState(false); // Controla si
 
//PARA ABRIR CON ENTER

const [activeRow, setActiveRow] = useState<number>(0); // Fila activa inicial

 //transicion de modal
 const [transitioning, setTransitioning] = useState(false); // Para controlar el estado de la transición

 //MODAL CLIENTE
 const [selectedClienteItem, setSelectedClienteItem] = useState<Proveedor | null>(null); // Aquí se asegura que `selectedItem` sea de tipo `Mercaderia`
 
 //DETALLE PROVEEDOR
 const [selectedDetalleItem, setSelectedDetalleItem] = useState<Proveedor | null>(null); // Aquí se asegura que `selectedItem` sea de tipo `Mercaderia`
 
//MODAL COSTOS
const [selectedCostosItem, setSelectedCostosItem] = useState<Proveedor | null>(null); // Aquí se asegura que `selectedItem` sea de tipo `Mercaderia`
 
const [options, setOptions] = useState<Option[]>([]); // Opciones cargadas

const [filteredOptions, setFilteredOptions] = useState<Option[]>([]); // Opciones filtradas

const [search, setSearch] = useState(""); // Texto de búsqueda
const [searchcodigo, setSearchcodigo] = useState(""); // Texto de búsqueda

//PARA GUARDAR QUE ABBRA LISTO PARAESCIBIR.
const codigoInputRef = useRef<HTMLInputElement>(null); // Especifica el tipo HTMLInputElement


//FOCUS PARA BUSCAR DE INICIO.
const inputRef = useRef<HTMLInputElement | null>(null);


   // Función para manejar el cambio del valor en el input
   
  
  

//correo
const [isValidCorreo, setIsValidCorreo] = useState(true);
const [isValidCiudad, setIsValidCiudad] = useState(true);
const [isValidFonoProveedor, setIsValidFonoProveedor] = useState(true);
const [isValidDireccion, setIsValidDireccion] = useState(true);
const [isValidNombre, setIsValidNombre] = useState(true);
const [isValidCodigo, setIsValidCodigo] = useState(true);
const [isValidAtencion, setIsValidAtencion] = useState(true);
const [isValidCelular, setIsValidCelular] = useState(true);
const [isValidAdministrativo, setIsValidAdmnistrativo] = useState(true);
const [isValidPerdida, setIsValidPerdida] = useState(true);
const [isValidNdias, setIsValidNdias] = useState(true);
const [isValidFlete, setIsValidFlete] = useState(true);


//CLIENTE NUEVo
const [email, setEmail] = useState('');
const [ciudad, setCiudad] = useState('');
const [fonoProveedor, setFonoProveedor] = useState('');
const [direccion, setDireccion] = useState('');
const [nombre, setNombre] = useState('');
const [codigo, setCodigo] = useState('');
const [atencion, setAtencion] = useState('');
const [celular, setCelular] = useState('');
const [administrativo, setAdministrativo] = useState('');
const [perdida, setPerdida] = useState('');
const [ndias, setNdias] = useState('');
const [flete, setFlete] = useState('');

//TOCHET NUEVO CLIENTE
const [isTouchedEmail, setIsTouchedEmail] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedCiudad, setIsTouchedCiudad] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedFono, setIsTouchedFono] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedDireccion, setIsTouchedDireccion] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedNombre, setIsTouchedNombre] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedCodigo, setIsTouchedCodigo] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedAtencion, setIsTouchedAtencion] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedCelular, setIsTouchedCelular] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedAdministrativo, setIsTouchedAdministrativo] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedNdias, setIsTouchedNdias] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedPerdida, setIsTouchedPerdida] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedFlete, setIsTouchedFlete] = useState(false); // Para verificar si el campo fue tocado

//FORMATEAR LA FECHA

const [formattedDate, setFormattedDate] = useState<string>("");

//MAS FORMATERA FECHA
useEffect(() => {
  if (selectedDetalleItem && selectedDetalleItem.fechaRegistro) {
    const formatFechaRegistro = (fecha: string) => {
      const date = new Date(fecha);
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(date);
    };

    setFormattedDate(formatFechaRegistro(selectedDetalleItem.fechaRegistro));
  }
}, [selectedDetalleItem]);


//EDITA COSTOS


const handleEditClickCosto = () => {
  if (!isEditingCosto) {
    // Convertir valores numéricos a cadenas
    setAdministrativo((selectedCostosItem?.adminProveedor ?? 0).toString());
    setPerdida((selectedCostosItem?.perdida ?? 0).toString());
    setFlete((selectedCostosItem?.flete ?? 0).toString());
    setNdias((selectedCostosItem?.ndias ?? 0).toString());
  }
  setIsEditingCosto(true); // Cambia a modo de edición
};


    //  F5 PARA MODFICAR CLIENTE
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault(); // Evita la acción predeterminada de recargar la página
          handleEditClickCosto(); // Activa el modo de edición
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Cleanup del listener al desmontar el componente
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isEditingCliente, selectedClienteItem]);

  const handleCancelClickCosto = () => {
    setIsEditingCosto(false); // Cancela la edición y vuelve al modo visualización
    setIsTouchedFlete(false); // Opcional: Resetea el estado de validación
  };

  //EDITARCLIENTE

  const handleEditClickCliente = () => {
    if (!isEditingCliente) {
      // Verificar si selectedClienteItem no es null
      setDireccion(selectedClienteItem?.direccion || ""); // Usa optional chaining
      setFonoProveedor(selectedClienteItem?.fono1 || ""); // Usa optional chaining
      setCiudad(selectedClienteItem?.ciudad || ""); // Usa optional chaining
      setEmail(selectedClienteItem?.correo || ""); // Usa optional chaining
      setAtencion(selectedClienteItem?.atencion || ""); // Usa optional chaining
      setCelular(selectedClienteItem?.celuVenta || ""); // Usa optional chaining
      
    }
    setIsEditingCliente(true); // Cambia a modo de edición
  };


    //  F5 PARA MODFICAR CLIENTE
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault(); // Evita la acción predeterminada de recargar la página
          handleEditClickCliente(); // Activa el modo de edición
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Cleanup del listener al desmontar el componente
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isEditingCliente, selectedClienteItem]);

  const handleCancelClickCliente = () => {
    setIsEditingCliente(false); // Cancela la edición y vuelve al modo visualización
    setIsTouchedDireccion(false); // Opcional: Resetea el estado de validación
  };


  //EMAIL
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Validación básica del correo
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidCorreo(emailPattern.test(value));
  };

  const handleBlur = () => {
    setIsTouchedEmail(true); // Marca el campo como tocado al salir del campo 
  };

  //CIUDAD

  const handleCiudadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setCiudad(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const ciudadPattern = /^[A-Z\s]+$/;
    setIsValidCiudad(ciudadPattern.test(value));
  };
  const handleBlurCiudad = () => {
    setIsTouchedCiudad(true); // Marca el campo como tocado al salir del campo
  };



  //FIONO
  const handleFonoProveedorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Eliminar cualquier carácter que no sea un número
    value = value.replace(/[^0-9]/g, '');

    setFonoProveedor(value);

  
    setIsValidFonoProveedor(value.length>0);
  };

  const handleBlurFono= () => {
    setIsTouchedFono(true); // Marca el campo como tocado al salir del campo
  };





  //DIRECCION

  const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setDireccion(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const fonoProveedorPattern = /^A-Z0-9_-/;
    setIsValidDireccion(fonoProveedorPattern.test(value));
  };

  const handleBlurDireccion= () => {
    setIsTouchedDireccion(true); // Marca el campo como tocado al salir del campo
  };

  //CEULAR
  const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Eliminar cualquier carácter que no sea un número
    value = value.replace(/[^0-9]/g, '');

    setCelular(value);

    // Validación: Aceptar solo números
    setIsValidCelular(value.length > 0);  // Validar si hay al menos un número
  };

  const handleBlurCelular = () => {
    setIsTouchedCelular(true); // Marca el campo como tocado al salir del campo
  };


  //TENCION
  const handleAtencionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setAtencion(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidAtencion(NombrePattern.test(value));
  };
  const handleBlurAtencion = () => {
    setIsTouchedAtencion(true); // Marca el campo como tocado al salir del campo
  };


  //NOMBRE
  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setNombre(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidNombre(NombrePattern.test(value));
  };
  const handleBlurNombre = () => {
    setIsTouchedNombre(true); // Marca el campo como tocado al salir del campo
  };

  //CODIGO
  //NOMBRE
  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setCodigo(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidCodigo(NombrePattern.test(value));
  };
  const handleBlurCodigo = () => {
    setIsTouchedCodigo(true); // Marca el campo como tocado al salir del campo
    

  };

  //ADMINISTRIVO
  const handleAdministrativoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setAdministrativo(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidAdmnistrativo(NombrePattern.test(value));
  };
  const handleBlurAdministrativo = () => {
    setIsTouchedAdministrativo(true); // Marca el campo como tocado al salir del campo
    

  };

  //PERDIDA
  const handlePerdidaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setPerdida(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidPerdida(NombrePattern.test(value));
  };
  const handleBlurPerdida = () => {

    setIsTouchedPerdida(true); // Marca el campo como tocado al salir del campo
    

  };


  //PERDIDA
  const handleFleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setFlete(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidFlete(NombrePattern.test(value));
  };
  const handleBlurFlete = () => {
    setIsTouchedFlete(true); // Marca el campo como tocado al salir del campo
    

  };

  //N DIAS
  const handleNdiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setNdias(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const NombrePattern = /^A-Z0-9_-/;
    setIsValidNdias(NombrePattern.test(value));
  };
  const handleBlurNdias = () => {
    setIsTouchedNdias(true); // Marca el campo como tocado al salir del campo
    

  };








  // Estado para almacenar los productos obtenidos
  const [proveedorData, setProveedorData] = useState<Proveedor[]>([]);
  
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const pageSize = 9 ;  // Puedes cambiar el tamaño de página aquí
  const [totalElementos, setTotalElements] = useState(0);

    // Función para obtener los datos desde el API
    const fetchProveedor = async (page: number, size: number) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/proveedores/proveedores?page=${page}&size=${size}`
        );
        console.log("Solicitud proveedores de hoy:", response);  // Muestra toda la respuesta
    
        if (response.status === 200 && response.data) {
          // Mapeamos los datos obtenidos de la API para ajustarlos a las interfaces
          const mappedData: Proveedor[] = response.data.data.content.map((item: any) => ({
            idProveedores: item.idProveedores,
            codigoProveedor: item.codigoProveedor,
            nombre: item.nombre,
            direccion: item.direccion, // string
            fono1: item.fono1,         // string
            ciudad: item.ciudad,       // string
            atencion: item.atencion,   // string
            celuVenta: item.celuVenta, // string
            ciudadVen: item.ciudadVen, // string
            adminProveedor: item.adminProveedor, // number
            perdida: item.perdida,               // number
            flete: item.flete,    
            ndias:item.ndias,               // number
            condPago: item.condPago,             // number
            docto: item.docto,                   // number
            chAdj: item.chAdj,
            correo: item.correo ,
            fechaRegistro: item.fechaRegistro  
          
          }));
    
          // Actualizamos el estado con los datos mapeados
          setProveedorData(mappedData);
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
    
      // Efecto para llamar a la API al montar el componente
      useEffect(() => {
        // Llamar a fetchMercaderia con los parámetros adecuados
        fetchProveedor(currentPage, 7); // Asegúrate de pasar el page y size correctos
      }, [currentPage]); // El useEffect se ejecuta cuando `currentPage` cambia

  // Estado para almacenar los productos obtenidos
  const [productos, setProductos] = useState<Producto[]>([]);

    // Función para cargar productos desde la API

    // Función para cargar productos desde la API
  const loadProductos = async () => {
    try {
      console.log("Realizando solicitud a la API...");
      const response = await axios.get("http://localhost:8080/api/proveedores");
      console.log("Respuesta completa de la API:", response); // Muestra toda la respuesta para depuración

      // Si la respuesta tiene los productos dentro de response.data.data
      setProductos(response.data.data || []); // Actualiza el estado con los productos
    } catch (error) {
      console.error("Error al obtener proveedor:", error);
    }
  };


    
    
    
      
      
      

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
    const guardarProveedor = () => { 

      if (!nombre.trim() || !codigo.trim()) {
        Swal.fire({
          title: "Campos vacíos",
          text: "Por favor, completa todos los campos antes de guardar.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return; // Detiene la ejecución si los campos están vacíos
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
          
            
          // Crear la nueva solicitud
          const nuevoProveedor = {
            codigoProveedor: codigo, // Asignar dinámicamente
            nombre: nombre// Asignar dinámicamente
            
          
          };
    
          // Agregar la nueva solicitud al arreglo de mercadería
        //  mercaderiaData.push(nuevaSolicitud);
    
          console.log("Proveedor guardada:", nuevoProveedor);

          
    
          // Mostrar mensaje de éxito
          axios.post('http://localhost:8080/api/proveedores', nuevoProveedor)
          .then((response) => {
            console.log('Respuesta del servidor:', response.data);
            Swal.fire({
              title: "¡Guardado!",
              text: "La solicitud de proveedor se guardó correctamente.",
              icon: "success",
              confirmButtonText: "OK",
            });
    
            setCodigo("")
            setNombre("")

            
          

            fetchProveedor(currentPage, 7); // Llama a la función con la página actual y
            closeModal();

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
    






    

  
    
    //CANCELAR

    const closeModal = () => {
      // Limpia los estados del modal y los campos
      setNombre("");
      setCodigo("");
      setIsTouchedCodigo(false);
      setIsValidCodigo(false);
      setIsTouchedNombre(false);
      setIsValidNombre(false);
  
      // Transición
      setTransitioning(false); // Inicia la transición de cierre
      setTimeout(() => {
        setShowModal(false); // Oculta el modal después de la animación
        inputRef.current?.focus(); // Mueve el foco al input de búsqueda
      }, 300);
    };

    //END CANCELAR




    const closeModalCliente = () => {
      
      setShowModalCliente(false); // Cierra el modal
    

  //TOCHABLE
    setIsTouchedEmail(false); 
    setIsTouchedAtencion(false);
    setIsTouchedCelular(false);
    setIsTouchedFono(false);
    setIsTouchedDireccion(false);
    setIsTouchedCiudad(false);

    //PORNE A NULL VALORES
    setDireccion( ""); // Usa optional chaining
    setFonoProveedor(""); // Usa optional chaining
    setCiudad( ""); // Usa optional chaining
    setEmail( ""); // Usa optional chaining
    setAtencion(""); // Usa optional chaining
    setCelular(""); // Usa optional chaining

    // Restablece el estado de edición del cliente
    setIsEditingCliente(false); // Aquí se asegura que vuelva al modo "Editar"

    inputRef.current?.focus(); // Mueve el foco al input de búsqueda
   

    };


    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault();
          handleEditClickCliente();
        } else if (event.key === "F3") {
          event.preventDefault();
    
          // Cierra el modal correspondiente basado en cuál está abierto
          if (showModalCliente) {
            closeModalCliente();
          } else if (showModal) {
            closeModal();
          }
         else if (showModalCostos) {
          closeModalCostos();
        }else if (showModalDeta) {
          closeModalDetalle();
        }
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [showModalCliente, showModal,showModalCostos, showModalDeta]);
    

  //ABRIR DETALLE PROVEEDOR


  const openModalDetallleProveedor = (proveedor:Proveedor) => {
    setShowModalDeta(true); // Abre el modal
    setSelectedDetalleItem(proveedor); // Establecer el artículo seleccionado
  };


  const tableRef = useRef<HTMLDivElement>(null); // Referencia a la tabla

  useEffect(() => {
    // Establecer el foco en la tabla al cargar el componente
    
    tableRef.current?.focus();
  }, []);

  const handleKeyDownDetalle = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log("manajndo con taclado")
    if (e.key === "ArrowDown") {
      setActiveRow((prev) => (prev + 1) % filteredFacturaVen.length); // Navegar hacia abajo
    } else if (e.key === "ArrowUp") {
      setActiveRow((prev) =>
        prev === 0 ? filteredFacturaVen.length - 1 : prev - 1
      ); // Navegar hacia arriba
    } else if (e.key === "Enter") {
      openModalDetallleProveedor(filteredFacturaVen[activeRow]); // Abrir modal
    }
  };

const closeModalDetalle = () => {
    
  setShowModalDeta(false); // Cierra el modal
  inputRef.current?.focus(); // Mueve el foco al input de búsqueda
 

};


  //ABRIR MODAL CLEINTE

  const openModalCliente = (proveedor:Proveedor) => {


    setShowModalCliente(true); // Abre el modal
    

    setSelectedClienteItem(proveedor); // Establecer el artículo seleccionado
    
  };

   // TECLADO ABRI MODAL CLIENTE TCLADO
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'F10') {
      openModalCliente();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Limpia el listener al desmontar el componente
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []); // Solo se ejecuta una vez al montar

 
  const closeModalCostos = () => {
    // Restablece el estado a su valor inicial al cancelar
    setShowModalCostos(false); // Cierra el modal
    
//TOCHABLE
  setIsTouchedAdministrativo(false); 
  setIsTouchedPerdida(false);
  setIsTouchedFlete(false);
  setIsTouchedNdias(false);


  //PORNE A NULL VALORES
  setAdministrativo( ""); // Usa optional chaining
  setPerdida(""); // Usa optional chaining
  setFlete( ""); // Usa optional chaining
  setNdias( ""); // Usa optional chaining


   // Restablece el estado de edición del cliente
   setIsEditingCosto(false); // Aquí se asegura que vuelva al modo "Editar"

   
   inputRef.current?.focus(); // Mueve el foco al input de búsqueda
   

  };
  


  const deleteProveedor = async (proveedor: Proveedor) => {
console.log("delete id "+proveedor.idProveedores)
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al proveedor "${proveedor.nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Realiza la solicitud DELETE al servidor
          const response = await fetch(`http://localhost:8080/api/proveedores/${proveedor.idProveedores}`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            Swal.fire(
              'Eliminado',
              `El proveedor "${proveedor.nombre}" ha sido eliminado exitosamente.`,
              'success'
            );
            fetchProveedor(currentPage, 7); // Llama a la función con la página actual y

            // Aquí puedes actualizar la lista de proveedores si es necesario
            // Por ejemplo, recargar los datos o eliminarlo del estado
          } else {
            const errorMessage = await response.text();
            Swal.fire(
              'Error',
              `No se pudo eliminar al proveedor. Detalles: ${errorMessage}`,
              'error'
            );
          }
        } catch (error) {
          Swal.fire(
            'Error',
            `Ocurrió un error al intentar eliminar al proveedor: ${error.message}`,
            'error'
          );
        }
      }
    });
  };
  

  const openModalCostos = (proveedor:Proveedor) => {


    setShowModalCostos(true); // Abre el modal
    console.log(proveedor);
    

    setSelectedCostosItem(proveedor); // Establecer el artículo seleccionado
    
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














  // Filtrar datos según el término de búsqueda
  const filteredFacturaVen = proveedorData.filter((factura) =>

    factura.codigoProveedor.toString().includes(searchTerm)
  );


  
 

 

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

  
  //MODAL ABRIR
  const openModal = () => {
    
    setTransitioning(true); // Inicia la transición de apertura
    setTimeout(() => setShowModal(true), 300); // Abre el modal después de la animación
   
  
  };

   // TECLADO PARA ENFOCAR A BUSCAR
   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F3") {
        inputRef.current?.focus(); // Enfoca el input al presionar F7
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Solo se ejecuta una vez al montar

  // TECLADO ABRI MODAL GUARDAR
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'F4') {
      openModal();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Limpia el listener al desmontar el componente
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []); // Solo se ejecuta una vez al montar

//FOCUS GUARADR
 useEffect(() => {
      if (showModal && codigoInputRef.current) {
        codigoInputRef.current.focus(); // Enfoca el input del código
      }
 }, [showModal]);

//FOCUS CLIENTE

useEffect(() => {
  if (showModalCliente) {
    // Enfocar el input del código al abrir el modal
    if (codigoInputRef.current) {
      codigoInputRef.current.focus();
    }

   
  }
}, [showModalCliente, selectedClienteItem]);


//FOCUS COSTOS
useEffect(() => {
  if (showModalCostos) {
    // Enfocar el input del código al abrir el modal
    if (codigoInputRef.current) {
      codigoInputRef.current.focus();
    }

   
  }
}, [showModalCostos,selectedCostosItem]);

//ACTUALIZAR CLEINTE
const guardarCostoProveedor = () => { 
 
 
  // Verificar si los campos están vacíos
 // Verificar si alguno de los campos está vacío
 if (
   !administrativo.trim() ||
   !perdida.trim() ||
   !flete.trim() ||
   !ndias.trim() 
   
 ) {
 Swal.fire({
   title: "Campos vacíos",
   text: "Por favor, completa todos los campos antes de guardar.",
   icon: "warning",
   confirmButtonText: "OK",
 });
 return; // Detener la ejecución si los campos están vacíos
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
      
       
     // Crear la nueva solicitud
     const nuevoClienteProveedor = {
       codigoProveedor: selectedCostosItem?.codigoProveedor, // Asignar dinámicamente
       nombre: selectedCostosItem?.nombre,// Asignar dinámicamente
       adminProveedor:administrativo,
       perdida:perdida,
       flete:flete,
       ndias:ndias
       
     
     };

     // Agregar la nueva solicitud al arreglo de mercadería
   //  mercaderiaData.push(nuevaSolicitud);

     console.log("Proveedor guardada:", nuevoClienteProveedor);

     

     // Mostrar mensaje de éxito
     axios.put(`http://localhost:8080/api/proveedores/costo/${selectedCostosItem?.idProveedores}`, nuevoClienteProveedor)
     .then((response) => {
       console.log('Respuesta del servidor:', response.data);
       Swal.fire({
         title: "¡Guardado!",
         text: "El proveedor se guardó correctamente.",
         icon: "success",
         confirmButtonText: "OK",
       });

       setAdministrativo("")
       setPerdida("")
       setFlete("")
       setNdias("")
      

       
     

       fetchProveedor(currentPage, 7); // Llama a la función con la página actual y
       closeModalCostos();

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



//ACTUALIZAR CLEINTE
const guardarClienteProveedor = () => { 
 
 
     // Verificar si los campos están vacíos
    // Verificar si alguno de los campos está vacío
    if (
      !direccion.trim() ||
      !email.trim() ||
      !fonoProveedor.trim() ||
      !ciudad.trim() ||
      !atencion.trim() ||
      !celular.trim()
    ) {
    Swal.fire({
      title: "Campos vacíos",
      text: "Por favor, completa todos los campos antes de guardar.",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return; // Detener la ejecución si los campos están vacíos
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
         
          
        // Crear la nueva solicitud
        const nuevoClienteProveedor = {
          codigoProveedor: selectedClienteItem?.codigoProveedor, // Asignar dinámicamente
          nombre: selectedClienteItem?.nombre,// Asignar dinámicamente
          direccion:direccion,
          fono1:fonoProveedor,
          ciudad:ciudad,
          atencion:atencion,
          correo:email,
          celuVenta:celular
          
        
        };
  
        // Agregar la nueva solicitud al arreglo de mercadería
      //  mercaderiaData.push(nuevaSolicitud);
  
        console.log("Proveedor guardada:", nuevoClienteProveedor);

        
  
        // Mostrar mensaje de éxito
        axios.put(`http://localhost:8080/api/proveedores/cliente/${selectedClienteItem?.idProveedores}`, nuevoClienteProveedor)
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: "¡Guardado!",
            text: "El proveedor se guardó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          });
  
          setDireccion("")
          setFonoProveedor("")
          setCiudad("")
          setAtencion("")
          setEmail("")
          setCelular("")

          
        

          fetchProveedor(currentPage, 7); // Llama a la función con la página actual y
          closeModalCliente();

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


  
  
  return (
    <div
     className="rounded-sm border border-stroke bg-white px-5 pt-0 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
     tabIndex={0}
      onKeyDown={handleKeyDownDetalle} // Manejo de eventos del teclado
      ref={tableRef} // Referencia para el foco
      style={{ outline: "none" }} // Quitar el borde de enfoque
     
     >
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
              placeholder="Escribe número"
              className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              value={searchTerm}
              ref={inputRef} // Asigna la referencia al input
              onChange={(e) => {
                const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
                const regex = /^[A-Z0-9 _-]*$/; // Permite letras mayúsculas, números, espacios, guiones (-) y guiones bajos (_)
                if (regex.test(value)) {
                  setSearchTerm(value); // Actualiza el estado si cumple con el regex
                }
              }}
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


     {/*<div className="max-w-full overflow-x-auto"> aqui*/} 

      <div
      
    >
        <table className="w-full table-auto">

          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4" >
              <th className="min-w-[150px] py-2 px-4 font-medium text-black dark:text-white xl:pl-11 ">
                Código
              </th>
             
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                Proveedor
              </th>
              
              
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                Atención
              </th>
              <th className="min-w-[120px] py-2 px-4 font-medium text-black dark:text-white">
                Dias
              </th>
              
              
              <th className="py-2 px-4 font-medium text-black dark:text-white">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
          {filteredFacturaVen.map((proveedorDataItem, key) => (
                <tr
                key={key}
                className={`${
                  activeRow === key
                    ? "bg-blue-200 dark:bg-blue-600" // Fila activa
                    : "hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              
              >
                <td className="border-b border-[#eee] py-2 px-4 pl-9 dark:border-strokedark xl:pl-11"
                
                onClick={() => {
                  setActiveRow(key); // Activar fila al hacer clic
                  openModalDetallleProveedor(proveedorDataItem); // Abrir modal
                }}
                >
                  <span className="font-medium text-black dark:text-white">
                    {proveedorDataItem.codigoProveedor}
                  </span>
                
                </td>
                <td className="border-b border-[#eee] py-2  px-4 dark:border-strokedark"
                
                onClick={() => {
                  setActiveRow(key); // Activar fila al hacer clic
                  openModalDetallleProveedor(proveedorDataItem); // Abrir modal
                }}
                >
                <span className="font-medium text-black dark:text-white">
                    {proveedorDataItem.nombre}
                  </span>
                </td>
               
              
              <td className="border-b border-[#eee] py-2  px-4 dark:border-strokedark"
              
              onClick={() => {
                setActiveRow(key); // Activar fila al hacer clic
                openModalDetallleProveedor(proveedorDataItem); // Abrir modal
              }}
              >
                <span className="font-medium text-black dark:text-white">
                    {proveedorDataItem.atencion}
                  </span>
                </td>
                 
              <td className="border-b border-[#eee] py-2  px-4 dark:border-strokedark"
              
              onClick={() => {
                setActiveRow(key); // Activar fila al hacer clic
                openModalDetallleProveedor(proveedorDataItem); // Abrir modal
              }}
              >
                <span className="font-medium text-black dark:text-white">
                    {proveedorDataItem.ndias}
                  </span>
                </td>
               
              
          


               
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark text-right">
                      <div className="flex justify-end items-center space-x-3.5">
                        <button
                          className="hover:text-primary"
                          onClick={() => openModalCliente(proveedorDataItem)}
                        >
                          <MdPersonAddAlt1 />
                        </button>

                        <button
                          className="hover:text-primary"
                          onClick={() => openModalCostos(proveedorDataItem)}
                        >
                          <MdOutlineSettings />
                        </button>

                        <button
                          className="text-gray-500 hover:text-red-500 transition duration-300"
                          onClick={() => deleteProveedor(proveedorDataItem)}
                        >
                          <MdAutoDelete size={18} />
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
    
      <p className="text-sm text-gray-700 dark:text-white">
        {" "}
        <span className="font-medium">{currentPage * pageSize + 1}</span> al{" "}
        <span className="font-medium">
          {Math.min((currentPage + 1) * pageSize, proveedorData.length)}
        </span>{" "}
        de <span className="font-medium">{totalElementos}</span> 
      </p>
   

    <div className="flex justify-start   ">
   
    <p className="px-0 py-2 w-full sm:w-40 text-start text-md sm:text-md font-bold   ">
      F4 = Incorporar
    </p>
    <p className="px-0 py-2 w-full sm:w-40 text-start text-md sm:text-md font-bold ">
      F10 = Datos
    </p>
    <p className="px-0 py-2 w-full sm:w-40 text-start text-md sm:text-md font-bold ">
      F11 = Costos
    </p>
    <p className="px-0 py-2 w-full sm:w-40 text-start text-md sm:text-md font-bold ">
      F3 = Enfocar
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


        
            {/* Modal MODAL REGISTRAR  PROVEEDOR */}
           
            {showModal && (
  <div    className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999
    ${transitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} 
    transition-all duration-300 ease-out`}
  >
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[1000px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">


      <h2 className=" text-3xl font-bold mb-2 text-start">Agregar proveedor</h2> 
      

            <button
  type="button"
  className="absolute top-0 right-2 text-3xl text-gray-600 dark:text-white hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center  ease-in-out duration-200 sm:absolute sm:top-0 sm:right-2 lg:top-[5px] lg:right-[5px] rounded-lg"
  aria-label="Close"
  onClick={closeModal}
>
  ×
</button>
  {/* Separador */}

   {/* Separador */}
<hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  

  <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/2 relative mb-5 sm:mb-3  ">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Código
    </label>
    <input
      ref={codigoInputRef} // Vincula la referencia
      type="text"
      placeholder="TORRE"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCodigo && (!codigo )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCodigo && codigo 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={codigo}
      onChange={handleCodigoChange}
  
        onBlur={handleBlurCodigo}
        required
    />
      {isTouchedCodigo &&  !codigo && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0 ">
         *El codigo es obligatorio.
        </span>
      )}
  </div>

  {/* Nombre */}
  <div className="flex flex-col w-full sm:w-1/2 relative mb-5 sm:mb-3  ">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Nombre
    </label>
    <input
      type="text"
      placeholder="TELEFONICA CHILE S.A."
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedNombre && (!nombre )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedNombre && nombre 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={nombre}
      onChange={handleNombreChange}
  
        onBlur={handleBlurNombre}
        required
   />
   {isTouchedNombre &&  !nombre && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0 ">
         *El nombre es obligatorio.
        </span>
      )}
  </div>
</div>

{/* Separador */}
<hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

<div className="flex flex-col sm:flex-row justify-between  w-full">
  {/* Primer div: F5 = Modificar, F4 = Guardar, F3 = Anterior */}
  <div className="flex justify-center   w-full">
   
    <p className="px-0 py-2 w-full sm:w-50 text-start text-md sm:text-md font-bold   ">
      F4 = Guardar
    </p>
    <p className="px-0 py-2 w-full text-start text-md sm:text-md font-bold ">
      F3 = Anterior
    </p>
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
    <button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarProveedor}
    >
      Guardar
    </button>
    <button
  onClick={closeModal}
  className="px-3 py-1 text-sm bg-transparent text-gray-600 dark:text-white border border-gray-500 dark:border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white w-full sm:w-auto sm:px-4 sm:py-2 transition-all duration-300 ease-in-out"
>
  Anterior
</button>



  </div>
</div>





                    </div>
                  </div>
                )}


              {showModalCostos &&  selectedCostosItem &&  (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999">

    
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[1000px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className="text-3xl font-bold mb-4 text-start">Costos operacionales</h2> 
      <button
              type="button"
              className="absolute top-0 right-2 text-3xl text-gray-600 dark:text-white hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center  ease-in-out duration-200 sm:absolute sm:top-0 sm:right-2 lg:top-[5px] lg:right-[5px] rounded-lg"
 
              aria-label="Close"
              onClick={closeModalCostos} // Cerrar el modal al hacer clic
            >
              ×
            </button>

            
 {/* Separador */}
 <hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
 
   {/* Contenedor para los campos */}
   <div className=" ">
          
          {/* Tipo de solicitud */}
          <div className="mb-4  flex justify-between">


          <div className="flex justify-start items-center">
          <p className='text-1xl font-bold '>Proveedor: </p>
              <p className='px-2 text-1xl font-bold '>{selectedCostosItem.nombre}</p>
              
            </div>

            {selectedCostosItem.flete ? (
            <div className="flex justify-end items-center ">

            {!isEditingCosto ? (
          <button
            className="flex items-center  "
            onClick={handleEditClickCosto} // Activa el modo de edición
          >
            <MdEdit className="text-sm" />
            <span className='pl-2'>Modificar</span>
          </button>
        ) : (
          <button
            className="flex items-center py-2 px-4 "
            onClick={handleCancelClickCosto} // Cancela la edición
          >
            <MdEdit className="text-sm" />
            <span className='pl-2'>Cancelar</span>
          </button>
        )}

        </div>
          ) : (
            <div></div>

          )}
          </div>

         

        </div>

  
     

{/* CAPMPOS NUEVOS */}
        
           {!selectedCostosItem?.flete ? (

<div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 w-full">
{/* CAMPOS MODIFICAR */}
<div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Administrativo 
  </label>
 
  <input
    ref={codigoInputRef} // Vincula la referencia
    type="text"
    placeholder="5.00"
  className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedAdministrativo && (!administrativo )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedAdministrativo && administrativo 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={administrativo}
    onChange={handleAdministrativoChange}

      onBlur={handleBlurAdministrativo}
      required
  />
 
  {isTouchedAdministrativo &&  !administrativo && (
      <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
       *EL administrivo es obligatorio.
      </span>
    )}
</div>

{/* Nombre */}
<div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Pérdia
  </label>
  <input
    type="text"
    placeholder="5.00"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedPerdida && (!perdida )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedPerdida && perdida 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={perdida}
    onChange={handlePerdidaChange}

      onBlur={handleBlurPerdida}
      required
  />
  {isTouchedPerdida &&  !perdida && (
      <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
       *La perdida es obligatorio.
      </span>
    )}
</div>
{/* Nombre */}
<div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Flete
  </label>
  <input
    type="text"
    placeholder="5.00"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedFlete && (!flete )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedFlete && flete 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={flete}
    onChange={handleFleteChange}

      onBlur={handleBlurFlete}
      required
  />
  {isTouchedFlete &&  !flete && (
      <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
       *El flete es obligatorio.
      </span>
    )}
</div>
<div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    N° dias
  </label>

  <input
    type="text"
    placeholder="30"
 
  className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedNdias && (!ndias )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedPerdida && perdida 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={ndias}
    onChange={handleNdiasChange}

      onBlur={handleBlurNdias}
      required
  />
  {isTouchedNdias &&  !ndias && (
      <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
       *La perdida es obligatorio.
      </span>
    )}
</div>
</div>


) : (
    
   
  <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4 w-full">
  {/* CAMPOS MODIFICAR */}
  <div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Administrativo existente
    </label>
   

  {isEditingCosto ? (
    <input
      type="text"
      placeholder="5.00"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedAdministrativo && (!administrativo )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedAdministrativo && administrativo 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={administrativo}
      onChange={handleAdministrativoChange}
  
        onBlur={handleBlurAdministrativo}
        required
    />
  ) : (
    <p className='w-full py-2'>
          {selectedCostosItem.adminProveedor?.toFixed(2)}
        </p>
    )}
    {isTouchedAdministrativo &&  !administrativo && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *EL administrivo es obligatorio.
        </span>
      )}
  </div>

  {/* Nombre */}
  <div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Pérdia
    </label>
    {isEditingCosto ? (
    <input
      type="text"
      placeholder="5.00"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedPerdida && (!perdida )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedPerdida && perdida 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={perdida}
      onChange={handlePerdidaChange}
  
        onBlur={handleBlurPerdida}
        required
    />
  ) : (
    <p className='w-full py-2'>
          {selectedCostosItem.perdida?.toFixed(2)}
        </p>
    )}
    {isTouchedPerdida &&  !perdida && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *La perdida es obligatorio.
        </span>
      )}
  </div>
  {/* Nombre */}
  <div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Flete
    </label>
    {isEditingCosto ? (
    <input
      type="text"
      placeholder="5.00"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedFlete && (!flete )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedFlete && flete 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={flete}
      onChange={handleFleteChange}
  
        onBlur={handleBlurFlete}
        required
    />
     ) : (
    <p className='w-full py-2'>
          {selectedCostosItem.flete?.toFixed(2)}
        </p>
    )}
    {isTouchedFlete &&  !flete && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El flete es obligatorio.
        </span>
      )}
  </div>
  <div className="flex flex-col w-full  sm:w-1/2 relative mb-5 sm:mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      N° dias
    </label>
    {isEditingCosto ? (
    <input
      type="text"
      placeholder="5.00"
   
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedNdias && (!ndias )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedPerdida && perdida 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={ndias}
      onChange={handleNdiasChange}
  
        onBlur={handleBlurNdias}
        required
    />
     ) : (
    <p className='w-full py-2'>
          {selectedCostosItem.ndias}
        </p>
    )}
    {isTouchedNdias &&  !ndias && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *La perdida es obligatorio.
        </span>
      )}
  </div>
</div>


  )}



 


       


      
 
 {/* Separador */}
 <hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
 

     {/* Tipo de operación termina select */}
{/* Botones */}
<div className="flex flex-col sm:flex-row justify-between gap-2 w-full">
  {/* Primer div: F5 = Modificar, F4 = Guardar, F3 = Anterior */}
  <div className="flex justify-center gap-2  w-full ">

  {selectedCostosItem.flete ? (
  <>
    <p className="flex px-0 py-2 w-full sm:w-80 text-start text-md sm:text-md font-bold">
      F5 = Modificar
    </p>
    <p className="px-0 py-2 w-full sm:w-80  text-start text-md sm:text-md font-bold">
      F4 = Guardar
    </p>
    <p className="px-0 py-2 w-full text-start text-md sm:text-md font-bold">
      F3 = Anterior
    </p>
    
  </>
) : (
  <>
    <p className="px-0 py-2 w-full sm:w-80  text-start text-md sm:text-md font-bold">
      F4 = Guardar
    </p>
    <p className="px-0 py-2 w-full   text-start text-md sm:text-md font-bold">
      F3 = Anterior
    </p>
  </>
)}


  
    
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
    
  {selectedCostosItem.flete ? (
    <button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarCostoProveedor}
    >
      Actualizar
    </button>

  ):(

<button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarCostoProveedor}
    >
      Guardar
    </button>
  )}

    <button
  onClick={closeModalCostos}
  className="px-3 py-1 text-sm bg-transparent text-gray-600 dark:text-white border border-gray-500 dark:border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white w-full sm:w-auto sm:px-4 sm:py-2 transition-all duration-300 ease-in-out"
>
  Anterior
</button>



  </div>
</div>





                    </div>
                  </div>
                )}



{showModalCliente &&  selectedClienteItem &&  (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999">
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[1000px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className="text-3xl font-bold mb-4 text-start">Subproceso proveedor</h2> 
    {/* Botón de cierre */}
    <button
  type="button"
  className="absolute top-0 right-2 text-3xl text-gray-600 dark:text-white hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center  ease-in-out duration-200 sm:absolute sm:top-0 sm:right-2 lg:top-[5px] lg:right-[5px] rounded-lg"
  aria-label="Close"
  onClick={closeModalCliente}
>
  ×
</button>







           
 {/* Separador */}
<hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
      {/* Contenedor para los campos */}
      <div className=" ">
          
          {/* Tipo de solicitud */}
          <div className="mb-4  flex justify-between">


          <div className="flex justify-start items-center">
          <p className='text-1xl font-bold '>Proveedor: </p>
              <p className='px-2 text-1xl font-bold '>{selectedClienteItem.nombre}</p>
              
            </div>

            {selectedClienteItem.direccion ? (
            <div className="flex justify-end items-center ">

            {!isEditingCliente ? (
          <button
            className="flex items-center  "
            onClick={handleEditClickCliente} // Activa el modo de edición
          >
            <MdEdit className="text-sm" />
            <span className='pl-2'>Modificar</span>
          </button>
        ) : (
          <button
            className="flex items-center py-2 px-4 "
            onClick={handleCancelClickCliente} // Cancela la edición
          >
            <MdEdit className="text-sm" />
            <span className='pl-2'>Cancelar</span>
          </button>
        )}

        </div>
          ) : (
            <div></div>

          )}
          </div>

         

        </div>


         {/* DATOS CLIENTE NUEVO */}
         
         {!selectedClienteItem.direccion ? (
    <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Dirección
    </label>
    <input
      ref={codigoInputRef} // Vincula la referencia
      type="text"
      placeholder="CARRERA 1807 (DOUGLAS NAVARRO)"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedDireccion && (!direccion )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedDireccion && direccion 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
    value={direccion}
    onChange={handleDireccionChange}

      onBlur={handleBlurDireccion}
      required
   />
   {isTouchedDireccion &&  !direccion && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *LA direccion es obligatorio.
        </span>
      )}
  </div>

  {/* Fono  */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Fono
    </label>
    <input
    type="text"
    placeholder="385200"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedFono && (!fonoProveedor )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedFono && fonoProveedor 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    
    value={fonoProveedor}
    onChange={handleFonoProveedorChange}
    onBlur={handleBlurFono}
      required
  />
  {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
  {isTouchedFono &&  !fonoProveedor && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El fono es obligatorio.
        </span>
      )}
      
  </div>



  {/* Nombre */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Ciudad
    </label>
    <input
      type="text"
      placeholder="ANTOFAGAST"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCiudad && (!ciudad )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCiudad && ciudad 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={ciudad}
      onChange={handleCiudadChange}
      
      onBlur={handleBlurCiudad}
      required
   />
    {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
    {isTouchedCiudad && !ciudad &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *La ciudad es obligatorio.
        </span>
      )}
      
  </div>
  <div className="flex flex-col w-full sm:w-1/3 relative">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Correo
  </label>
  
  
  <input
    type="email"
    placeholder="example@gmail.com"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedEmail && (!email || !isValidCorreo)
          ? "border-red-500 focus:ring-red-500"
          : isTouchedEmail && email && isValidCorreo
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={email}
    onChange={handleEmailChange}
    onBlur={handleBlur}
    required
  />

  {/* Mensajes dinámicos */}
  {isTouchedEmail && !email && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * El correo es obligatorio.
    </span>
  )}
  {isTouchedEmail && email && !isValidCorreo && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * Por favor, ingrese un correo válido.
    </span>
  )}
</div>






</div>



   
  ) : (
    

   <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* CLIENTE MODIFICAR */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
   {/* Botón dinámico */}
  

    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
       Direccion
    </label>
   
    {isEditingCliente ? (
    <input
      type="text"
      placeholder="CARRERA 1807 (DOUGLAS NAVARRO)"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedDireccion && (!direccion )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedDireccion && direccion
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
    value={direccion}
    onChange={handleDireccionChange}

      onBlur={handleBlurDireccion}
      required
   />
      ) : (
    <p className='w-full py-2'>
          {selectedClienteItem.direccion}
        </p>
    )}
   {isTouchedDireccion &&  !direccion && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *LA direccion es obligatorio.
        </span>
      )}
  </div>

  {/* Fono */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Fono
    </label>
    {isEditingCliente ? (
    <input
    type="text"
    placeholder="385200"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedFono && (!fonoProveedor )
          ? "border-red-500 focus:ring-red-500"
          : isTouchedFono && fonoProveedor 
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    
    value={fonoProveedor}
    onChange={handleFonoProveedorChange}
    onBlur={handleBlurFono}
      required
  />
) : (
  <p className='w-full py-2'>
        {selectedClienteItem.fono1}
      </p>
  )}
  {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
  {isTouchedFono &&  !fonoProveedor && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El fono es obligatorio.
        </span>
      )}
      
  </div>



  {/* Ciudad */}
  <div className="flex flex-col w-full sm:w-1/4 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Ciudad
    </label>
    {isEditingCliente ? (
    <input
      type="text"
      placeholder="ANTOFAGAST"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCiudad && (!ciudad )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCiudad && ciudad 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={ciudad}
      onChange={handleCiudadChange}
      
      onBlur={handleBlurCiudad}
      required
   />
  ) : (
    <p className='w-full py-2'>
          {selectedClienteItem.ciudad}
        </p>
    )}

    {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
    {isTouchedCiudad && !ciudad &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *La ciudad es obligatorio.
        </span>
      )}
      
  </div>


   {/* CORREO */}
  <div className="flex flex-col w-full sm:w-1/3 relative">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Correo
  </label>
  {isEditingCliente ? (
  
  <input
    type="email"
    placeholder="example@gmail.com"
    className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
      ${
        isTouchedEmail && (!email || !isValidCorreo)
          ? "border-red-500 focus:ring-red-500"
          : isTouchedEmail && email && isValidCorreo
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={email}
    onChange={handleEmailChange}
    onBlur={handleBlur}
    required
  />
) : (
  <p className='w-full py-2'>
        {selectedClienteItem.correo}
      </p>
  )}

  {/* Mensajes dinámicos */}
  {isTouchedEmail && !email && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * El correo es obligatorio.
    </span>
  )}
  {isTouchedEmail && email && !isValidCorreo && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * Por favor, ingrese un correo válido.
    </span>
  )}
</div>






</div>

)}
 


 


           {/* Separador */}
<div className="mb-4 flex flex-row space-x-4 w-full">
  <div className="relative w-full flex justify-center items-center">
    {/* Línea con texto en el centro */}
    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
      <hr className="border-t dark:border-gray-600 border-gray-300" />
    </div>
    <p className="px-2 text-1xl font-bold bg-white dark:bg-gray-800 dark:text-white relative z-10">
      Antecedentes del vendedor
    </p>
  </div>
</div>



      
  {/* CONTACTO NUEVO */}

  {!selectedClienteItem.direccion ? (

  <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/2 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Atencion
    </label>
   
    <input
      type="text"
      placeholder="PEDRO GONZALEZ"
     className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedAtencion && (!atencion )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedAtencion && atencion 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={atencion}
      onChange={handleAtencionChange}
      onBlur={handleBlurAtencion}
      required
   />
 
    {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
    {isTouchedAtencion && !atencion &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El atencion es obligatorio.
        </span>
      )}
  </div>

  
  {/* Nombre */}
 {/* Celular */}
 <div className="flex flex-col w-full sm:w-1/2 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Celular
    </label>
   
    <input
      type="text"
      placeholder="098719634"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCelular && (!celular )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCelular && celular 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={celular}
      onChange={handleCelularChange}
      onBlur={handleBlurCelular}
      required
    />
  
     {isTouchedCelular && !celular &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El celular es obligatorio
        </span>
      )}
  </div>
</div>

) : (
<div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/2 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Atencion
    </label>
    {isEditingCliente ? (
    <input
      type="text"
      placeholder="PEDRO GONZALEZ"
     className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedAtencion && (!atencion )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedAtencion && atencion 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={atencion}
      onChange={handleAtencionChange}
      onBlur={handleBlurAtencion}
      required
   />
  ) : (
    <p className='w-full py-2'>
          {selectedClienteItem.atencion}
        </p>
    )}
    {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
    {isTouchedAtencion && !atencion &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El atencion es obligatorio.
        </span>
      )}
  </div>

  
  {/* Nombre */}
 {/* Celular */}
 <div className="flex flex-col w-full sm:w-1/2 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Celular
    </label>
    {isEditingCliente ? (
    <input
      type="text"
      placeholder="098719634"
      className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCelular && (!celular )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCelular && celular 
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={celular}
      onChange={handleCelularChange}
      onBlur={handleBlurCelular}
      required
    />
  ) : (
    <p className='w-full py-2'>
          {selectedClienteItem.celuVenta}
        </p>
    )}
     {isTouchedCelular && !celular &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El celular es obligatorio
        </span>
      )}
  </div>
</div>
 


)}

          
 {/* Separador */}
 <hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
     {/* Tipo de operación termina select */}
{/* Botones */}
<div className="flex flex-col sm:flex-row justify-between gap-2 w-full">
  {/* Primer div: F5 = Modificar, F4 = Guardar, F3 = Anterior */}
  <div className="flex justify-center gap-2  w-full">

  {selectedClienteItem.direccion ? (
  <>
    <p className="flex px-0 py-2 w-full sm:w-80 text-start text-md sm:text-md font-bold">
      F5 = Modificar
    </p>
    <p className="px-0 py-2 w-full sm:w-80  text-start text-md sm:text-md font-bold">
      F4 = Guardar
    </p>
    <p className="px-0 py-2 w-full text-start text-md sm:text-md font-bold">
      F3 = Anterior
    </p>
    
  </>
) : (
  <>
    <p className="px-0 py-2 w-full sm:w-80  text-start text-md sm:text-md font-bold">
      F4 = Guardar
    </p>
    <p className="px-0 py-2 w-full   text-start text-md sm:text-md font-bold">
      F3 = Anterior
    </p>
  </>
)}


  
    
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
    
  {selectedClienteItem.direccion ? (
    <button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarClienteProveedor}
    >
      Actualizar
    </button>

  ):(

<button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarClienteProveedor}
    >
      Guardar
    </button>
  )}

    <button
  onClick={closeModalCliente}
  className="px-3 py-1 text-sm bg-transparent text-gray-600 dark:text-white border border-gray-500 dark:border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white w-full sm:w-auto sm:px-4 sm:py-2 transition-all duration-300 ease-in-out"
>
  Anterior
</button>



  </div>
</div>


                    </div>
                  </div>
                )}




{showModalDeta &&  selectedDetalleItem &&  (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-999">
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[800px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className="text-3xl font-bold mb-4 text-start">Detalle proveedor</h2> 

      <p></p>
    {/* Botón de cierre */}
    <button
  type="button"
  className="absolute top-0 right-2 text-3xl text-gray-600 dark:text-white hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 w-8 h-8 flex items-center justify-center  ease-in-out duration-200 sm:absolute sm:top-0 sm:right-2 lg:top-[5px] lg:right-[5px] rounded-lg"
  aria-label="Close"
  onClick={closeModalDetalle}
>
  ×
</button>







           
 {/* Separador */}
<hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  

<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
<div className="flex flex-row w-full sm:w-full relative items-start justify-start space-x-2">
  <p className="font-bold">Nombre :</p>
  <p>{selectedDetalleItem.nombre}</p>
</div>

    
    
</div>
<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
<div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-4">
  <p className="font-bold ">Codigo :</p>
  <p className=''>{selectedDetalleItem.codigoProveedor}</p>
</div>

    <div className="flex flex-row w-full sm:w-1/2 relative items-end justify-end space-x-4">
 
</div>
    
</div>


<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">


<div className="flex flex-row w-full sm:w-full relative items-start justify-start space-x-2">
  <p className="font-bold">Dirección :</p>
  <p>{selectedDetalleItem.direccion ? selectedDetalleItem.direccion : "No registrado"}</p>
</div>


      
</div>









<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Fono :</p>
  <p>{selectedDetalleItem.fono1 ? selectedDetalleItem.fono1 : "No registrado"}</p>
</div>

<div className="flex flex-col w-full sm:w-1/2 relative">
    
    </div>

      
</div>


<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Ciudad :</p>
  <p>{selectedDetalleItem.ciudad ? selectedDetalleItem.ciudad : "No registrado"}</p>
</div>

<div className="flex flex-col w-full sm:w-1/2 relative">
    
    </div>

      
</div>

<div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Fecha registro :</p>
  <p>{formattedDate}</p>
</div>

<div className="flex flex-col w-full sm:w-1/2 relative">
    
    </div>

      
</div>


<div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-center justify-center space-x-2 bg-gray-300 dark:bg-gray-700  rounded-md">
  <p className="font-bold text-2xl">Costos</p>
  
</div>

<div className="flex flex-row w-full sm:w-1/2 relative items-center justify-center space-x-2 bg-gray-300 dark:bg-gray-700  rounded-md">
  <p className="font-bold text-2xl">Contacto vendedor</p>
  
</div>

      
</div>


<div className="mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Administrativo :</p>
  <p>{selectedDetalleItem.adminProveedor ? selectedDetalleItem.adminProveedor : "No registrado"}</p>
</div>

<div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Contacto :</p>
  <p>{selectedDetalleItem.atencion ? selectedDetalleItem.atencion : "No registrado"}</p>
</div>

      
</div>

<div className="mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Perdida :</p>
  <p>{selectedDetalleItem.perdida ? selectedDetalleItem.perdida : "No registrado"}</p>
</div>

<div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Celular :</p>
  <p>{selectedDetalleItem.celuVenta ? selectedDetalleItem.celuVenta : "No registrado"}</p>
</div>

      
</div>
<div className="mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Flete :</p>
  <p>{selectedDetalleItem.flete ? selectedDetalleItem.flete : "No registrado"}</p>
</div>

<div className="flex flex-col w-full sm:w-1/2 relative">


    
    </div>

      
</div>

<div className="mb-2 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">

    <div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-2">
  <p className="font-bold">Número dias :</p>
  <p>{selectedDetalleItem.ndias ? selectedDetalleItem.ndias : "No registrado"}</p>
</div>

<div className="flex flex-row w-full sm:w-1/2 relative items-end justify-end space-x-2">
  <p className="font-bold">Responsable :</p>
  <p>JUAN PEREZ</p>
</div>

      
</div>



          
 {/* Separador */}
 <hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
     {/* Tipo de operación termina select */}
{/* Botones */}
<div className="flex flex-col sm:flex-row justify-between gap-2 w-full">
  {/* Primer div: F5 = Modificar, F4 = Guardar, F3 = Anterior */}
  <div className="flex justify-center gap-2  w-full">

  
   
    <p className="px-0 py-2 w-full text-start text-md sm:text-md font-bold">
      F3 = Anterior
    </p>
    



  
    
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
   
    <button
  onClick={closeModalDetalle}
  className="px-3 py-1 text-sm bg-transparent text-gray-600 dark:text-white border border-gray-500 dark:border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white w-full sm:w-auto sm:px-4 sm:py-2 transition-all duration-300 ease-in-out"
>
  Anterior
</button>



  </div>
</div>


                    </div>
                  </div>
                )}





      </div>


    </div>
    
  );
};

export default Proveedores;
