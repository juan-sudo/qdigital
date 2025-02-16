
import { MdArrowBack, MdArrowForward,MdOutlineSettings,MdAutoDelete,MdEdit,MdCheck,MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import React, { useState, useEffect ,useRef} from 'react';
import { MdAdd,MdPersonAddAlt1, } from 'react-icons/md';
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


const RegionesYcomunas = {

  "regiones": [
      {
          "NombreRegion": "Arica y Parinacota",
          "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
      },
      {
          "NombreRegion": "Tarapacá",
          "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
  },
      {
          "NombreRegion": "Antofagasta",
          "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
  },
      {
          "NombreRegion": "Atacama",
          "comunas": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
  },
      {
          "NombreRegion": "Coquimbo",
          "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]
  },
      {
          "NombreRegion": "Valparaíso",
          "comunas": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]
  },
      {
          "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
          "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
  },
      {
          "NombreRegion": "Región del Maule",
          "comunas": ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
  },
      {
          "NombreRegion": "Región del Biobío",
          "comunas": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]
  },
      {
          "NombreRegion": "Región de la Araucanía",
          "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria", ]
  },
      {
          "NombreRegion": "Región de Los Ríos",
          "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]
  },
      {
          "NombreRegion": "Región de Los Lagos",
          "comunas": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]
  },
      {
          "NombreRegion": "Región Aisén del Gral. Carlos Ibáñez del Campo",
          "comunas": ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]
  },
      {
          "NombreRegion": "Región de Magallanes y de la Antartica Chilena",
          "comunas": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
  },
      {
          "NombreRegion": "Región Metropolitana",
          "comunas": ["Santiago centro","Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]
  }]
  }




const Proveedores = () => {

  //estados de input
  const [selectedOptionEstados, setSelectedOptionEstados] = useState("codigo"); 
  //select de por que quiere buscar
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };


  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermNombre, setSearchTermnombre] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalCostos, setShowModalCostos] = useState(false);
  const [showModalDeta, setShowModalDeta] = useState(false); // Controla el 
    //PARA BOTON DETALLLE PROVEEDOR
    const [isEditingClienteD, setIsEditingClienteD] = useState(false); // Controla si

  //PARA BOTON MODIFCAR
  const [isEditingCliente, setIsEditingCliente] = useState(false); // Controla si
  //PARA BOTN MODIFICAR BOTN COSTO
  const [isEditingCosto, setIsEditingCosto] = useState(false); // Controla si

//PROBAR MDAL ESTA EN GUADADO
const [isSaving, setIsSaving] = useState(false); // Para controlar si estamos en proceso de guardado

 
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


//MANEJAR ESTADO DE MODAL
const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el moda

   // Función para manejar el cambio del valor en el input
   
  
  

//correo
const [isValidCorreo, setIsValidCorreo] = useState(true);
const [isValidCorreoContacto, setIsValidCorreoContacto] = useState(true);
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
const [isValidRegion, setIsValidRegion] = useState(true);
const [isValidComuna, setIsValidComuna] = useState(true);

//CLIENTE NUEVo
const [email, setEmail] = useState('');
const [ciudad, setCiudad] = useState('');
const [fonoProveedor, setFonoProveedor] = useState('');
const [direccion, setDireccion] = useState('');
const [nombre, setNombre] = useState('');
const [region, setRegion] = useState('');
const [comuna, setComuna] = useState('');
const [correoContacto, setCorreoContacto] = useState('');
const [codigo, setCodigo] = useState('');
const [atencion, setAtencion] = useState('');
const [celular, setCelular] = useState('');
const [administrativo, setAdministrativo] = useState('');
const [perdida, setPerdida] = useState('');
const [ndias, setNdias] = useState('');
const [flete, setFlete] = useState('');

//TOCHET NUEVO CLIENTE
const [isTouchedEmail, setIsTouchedEmail] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedCorreoContacto, setIsTouchedisTouchedCorreoContacto] = useState(false); // Para verificar si el campo fue tocado
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
const [isTouchedRegion, setIsTouchedRegion] = useState(false); // Para verificar si el campo fue tocado
const [isTouchedComuna, setIsTouchedComuna] = useState(false); // Para verificar si el campo fue tocado


//FILTRAR OPCIONES
const [filteredOptionsR, setFilteredOptionsR] = useState<string[]>([]);

//FILTRAR OPCIONES comuna
const [filteredOptionsC, setFilteredOptionsC] = useState<string[]>([]);



const [opcionesC, setOpcionesC] = React.useState<string[]>([]); // Opciones dinámicas de comunas


//REGION ACROLL

const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<HTMLLIElement[]>([]);

//CSCROLL COMUNA
const listRefC = useRef<HTMLUListElement>(null);
  const optionRefsC = useRef<HTMLLIElement[]>([]);


 // Estado para el índice de la opción seleccionada en la lista
 const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Estado para el índice de la opción COMUNA
  const [selectedIndexC, setSelectedIndexC] = useState<number>(-1);

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


//EDITA COSTOS F5


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


    //  F5 PARA MODFICAR COST0
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault(); // Evita la acción predeterminada de recargar la página
       
           // Verifica el estado actual y realiza la acción correspondiente
           if (isEditingCosto) {
            handleCancelClickCosto(); // Cancela la edición si ya está en modo de edición
          } else {
            handleEditClickCosto(); // Activa el modo de edición

          }
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


  //EDITAR NOBRE EN DETALLE PROVEEDOR

  const handleEditClickClienteD= () => {
    if (!isEditingClienteD) {
      // Verificar si selectedClienteItem no es null
      setNombre(selectedDetalleItem?.nombre || ""); // Usa optional chaining
      setCodigo(selectedDetalleItem?.codigoProveedor || ""); // Usa optional chaining
      
    }
    setIsEditingClienteD(true); // Cambia a modo de edición
  };


    //  F5 PARA MODFICAR DETALLE
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault(); // Evita la acción predeterminada de recargar la página
          
          // Verifica el estado actual y realiza la acción correspondiente
          if (isEditingClienteD) {
            handleCancelClickClienteD(); // Cancela la edición si ya está en modo de edición
          } else {
            handleEditClickClienteD(); // Inicia la edición si no está en modo de edición
          }
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
    
      // Cleanup del listener al desmontar el componente
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isEditingClienteD, selectedDetalleItem]); // Dependencias relevantes



  const handleCancelClickClienteD = () => {
    setIsEditingClienteD(false); // Cancela la edición y vuelve al modo visualización
   // setIsTouchedDireccion(false); // Opcional: Resetea el estado de validación
  };

  



  //EDITARCLIENTE

  const handleEditClickCliente = () => {
    if (!isEditingCliente) {
      // Verificar si selectedClienteItem no es null
      setDireccion(selectedClienteItem?.direccion || ""); // Usa optional chaining
      setFonoProveedor(selectedClienteItem?.fono1 || ""); // Usa optional chaining
      setRegion(selectedClienteItem?.region || ""); // Usa optional chaining
      setComuna(selectedClienteItem?.comuna || ""); // Usa optional chaining
     // setCiudad(selectedClienteItem?.ciudad || ""); // Usa optional chaining
      setEmail(selectedClienteItem?.correo || ""); // Usa optional chaining
      setAtencion(selectedClienteItem?.atencion || ""); // Usa optional chaining
      setCelular(selectedClienteItem?.celuVenta || ""); // Usa optional chaining
      setCorreoContacto(selectedClienteItem?.correoContacto || ""); // Usa optional chaining
      
    }
    setIsEditingCliente(true); // Cambia a modo de edición
  };


    //  F5 PARA MODFICAR CLIENTE
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "F5") {
          event.preventDefault(); // Evita la acción predeterminada de recargar la página
         
          // Verifica el estado actual y realiza la acción correspondiente
          if (isEditingCliente) {
            handleCancelClickCliente(); // Cancela la edición si ya está en modo de edición
          } else {
            handleEditClickCliente(); // Activa el modo de edición

          }
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

//COMUNA
  
  // Manejo de cambio en el input de región
  const handleComunaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.trim(); // Eliminar espacios al inicio/final
  
    // Eliminar caracteres no deseados
    value = value.replace(/[^A-Za-z\s]/g, "");
  
    setComuna(value);
    setIsValidComuna(value.length > 0);
  
    // Filtrar opciones que coincidan con el texto ingresado
    const filtered = opcionesC.filter((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredOptionsC(filtered);
  };
  

// Manejo de clic en una opción
const handleOptionClickC = (option: string) => {
  setComuna(option);
  setFilteredOptionsC([]);
 // setSelectedIndexC(-1); // Restablece el índice seleccionado
};


const handleFocusComuna = () => {
  // Mostrar todas las opciones al enfocar si no hay texto en el input
  if (comuna.trim() === "") {
    setFilteredOptionsC(opcionesC);
  }
};

React.useEffect(() => {
  if (selectedIndexC >= 0 && listRefC.current && optionRefsC.current[selectedIndexC]) {
    // Asegurarse de que el elemento seleccionado esté visible
    optionRefsC.current[selectedIndexC].scrollIntoView({
      block: "nearest", // Alinear al contenedor
      behavior: "smooth", // Desplazamiento suave
    });
  }
}, [selectedIndexC]);



// Manejo de teclas
const handleKeyDownComuna = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "ArrowDown") {
    setSelectedIndexC((prevIndex) =>
      Math.min(filteredOptionsC.length - 1, prevIndex + 1)
    );
  } else if (e.key === "ArrowUp") {
    setSelectedIndexC((prevIndex) => Math.max(0, prevIndex - 1));
  } else if (e.key === "Enter" && selectedIndexC >= 0) {
    handleOptionClickC(filteredOptionsC[selectedIndexC]);
  }
};


const handleBlurComuna = () => {
  setIsTouchedComuna(true);
  setTimeout(() => {
    setFilteredOptionsC([]); // Oculta la lista después de perder foco
  }, 150); // Retraso para permitir clics
};





   //REGION
  
  // Manejo de cambio en el input de región
// Filtrar opciones de regiones
const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim().replace(/[^A-Za-z\s]/g, "");
  setRegion(value);

  // Filtrar las regiones
  const filtered = RegionesYcomunas.regiones
    .map((r) => r.NombreRegion)
    .filter((regionName) =>
      regionName.toLowerCase().startsWith(value.toLowerCase())
    );
  setFilteredOptionsR(filtered);
};
 
  

// Manejo de clic en una opción

const handleOptionClick = (regionName: string) => {
  setRegion(regionName);
  setFilteredOptionsR([]);
  setComuna(""); // Reinicia la comuna seleccionada

  // Encuentra las comunas de la región seleccionada
  const regionData = RegionesYcomunas.regiones.find(
    (r) => r.NombreRegion === regionName
  );
  setOpcionesC(regionData ? regionData.comunas : []); // Actualiza las comunas disponibles
};


// Manejo de teclas
const handleKeyDownRegion = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "ArrowDown") {
    // Mover hacia abajo
    setSelectedIndex((prevIndex) =>
      Math.min(filteredOptionsR.length - 1, prevIndex + 1)
    );
  } else if (e.key === "ArrowUp") {
    // Mover hacia arriba
    setSelectedIndex((prevIndex) => Math.max(0, prevIndex - 1));
  } else if (e.key === "Enter" && selectedIndex >= 0) {
    // Seleccionar opción
    handleOptionClick(filteredOptionsR[selectedIndex]);
  }
};
React.useEffect(() => {
  if (selectedIndex >= 0 && listRef.current && optionRefs.current[selectedIndex]) {
    // Asegurarse de que el elemento seleccionado esté visible
    optionRefs.current[selectedIndex].scrollIntoView({
      block: "nearest", // Alinear al contenedor
      behavior: "smooth", // Desplazamiento suave
    });
  }
}, [selectedIndex]);

 

  const handleBlurRegion = () => {
    setIsTouchedRegion(true); // Marca el campo como tocado al salir del campo
    setTimeout(() => {
      setFilteredOptionsR([]); // Oculta la lista después de perder foco
    }, 150); // Retraso para permitir clics
  };
  

  const handleFocusRegion = () => {
    // Mostrar todas las opciones al enfocar si no hay texto en el input
    if (comuna.trim() === "") {
      setFilteredOptionsR(opciones);
    }
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

   //COOREO CONTACTO
   const handleCorreoContactoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCorreoContacto(value);

    // Validación básica del correo
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidCorreoContacto(emailPattern.test(value));
  };

  const handleBlurCorreoContacto = () => {
    setIsTouchedisTouchedCorreoContacto(true); // Marca el campo como tocado al salir del campo 
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


//NOMBREE DETALLE OROVEEDOR

  //DIRECCION

  const handleNombreDetalleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setNombre(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const fonoProveedorPattern = /^A-Z0-9_-/;
    setIsValidNombre(fonoProveedorPattern.test(value));
  };

  const handleBlurNombreDetalle= () => {
    setIsTouchedNombre(true); // Marca el campo como tocado al salir del campo
  };


  //CODIGO DETALLE OROVEEDOR

  //DIRECCION

  const handleCodigoDetalleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convertir el valor a mayúsculas
    setCodigo(value);

    // Validación: Aceptar solo letras (sin números ni caracteres especiales)
    const fonoProveedorPattern = /^A-Z0-9_-/;
    setIsValidCodigo(fonoProveedorPattern.test(value));
  };

  const handleBlurCodigoDetalle= () => {
    setIsTouchedCodigo(true); // Marca el campo como tocado al salir del campo
  };






  // Estado para almacenar los productos obtenidos
  const [proveedorData, setProveedorData] = useState<Proveedor[]>([]);
  
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const pageSize = 9 ;  // Puedes cambiar el tamaño de página aquí
  const [totalElementos, setTotalElements] = useState(0);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // Referencia para el temporizador


  // BUSCAR POR CODIGO
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
    const regex = /^[A-Z0-9 _-]*$/; // Permite caracteres válidos

    if (regex.test(value)) {
      setSearchTerm(value); // Actualiza el término de búsqueda

      // Si hay un temporizador activo, cancelarlo
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Configurar un nuevo temporizador
      debounceTimeout.current = setTimeout(() => {
        if (value.trim() === "") {
          // Si el campo está vacío, mostrar todos los proveedores
          fetchProveedor(currentPage, 7); // Por ejemplo, 10 resultados por página
        } else {
          // Si hay un término de búsqueda, filtrar proveedores
          buscarProveedores(value);
        }
      }, 500); // Espera 500 ms antes de ejecutar
    }
  };
//INPUT BUSCAR NOMBRE
  const handleInputChangenombre= (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // Convierte a mayúsculas
    const regex = /^[A-Z0-9 _-]*$/; // Permite caracteres válidos

    if (regex.test(value)) {
      setSearchTermnombre(value); // Actualiza el término de búsqueda

      // Si hay un temporizador activo, cancelarlo
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Configurar un nuevo temporizador
      debounceTimeout.current = setTimeout(() => {
        if (value.trim() === "") {
          // Si el campo está vacío, mostrar todos los proveedores
          fetchProveedor(currentPage, 7); // Por ejemplo, 10 resultados por página
        } else {
          // Si hay un término de búsqueda, filtrar proveedores
          buscarcodigoProveedores(value);
        }
      }, 500); // Espera 500 ms antes de ejecutar
    }
  };

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
            region:item.region,       // string
            comuna:item.comuna,
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
            correoContacto: item.correoContacto ,
            fechaRegistro: item.fechaRegistro ,

          
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

     //BUSCAR NONBRE PROVEEDOR
     const buscarcodigoProveedores = async (nombre: string) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/proveedores/buscarnombre?nombre=${nombre}`);
        if (response.status === 200 && response.data) {
          const mappedData: Proveedor[] = response.data.data.map((item: any) => ({
            idProveedores: item.idProveedores,
            codigoProveedor: item.codigoProveedor,
            nombre: item.nombre,
            direccion: item.direccion,
            fono1: item.fono1,
            region: item.region,
            comuna: item.comuna,
            atencion: item.atencion,
            celuVenta: item.celuVenta,
            ciudadVen: item.ciudadVen,
            adminProveedor: item.adminProveedor,
            perdida: item.perdida,
            flete: item.flete,
            ndias: item.ndias,
            condPago: item.condPago,
            docto: item.docto,
            chAdj: item.chAdj,
            correo: item.correo,
            fechaRegistro: item.fechaRegistro,
          }));
    
          // Sobrescribe los datos actuales con los resultados de búsqueda
          setProveedorData(mappedData);
        }
      } catch (error) {
        console.error("Error al buscar proveedores:", error);
      }
    };

    //BUSCAR CODIGO PROVEEDOR
    const buscarProveedores = async (codigo: string) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/proveedores/buscarcodigo?codigo=${codigo}`);
        if (response.status === 200 && response.data) {
          const mappedData: Proveedor[] = response.data.data.map((item: any) => ({
            idProveedores: item.idProveedores,
            codigoProveedor: item.codigoProveedor,
            nombre: item.nombre,
            direccion: item.direccion,
            fono1: item.fono1,
            region: item.region,
            comuna: item.comuna,
            atencion: item.atencion,
            celuVenta: item.celuVenta,
            ciudadVen: item.ciudadVen,
            adminProveedor: item.adminProveedor,
            perdida: item.perdida,
            flete: item.flete,
            ndias: item.ndias,
            condPago: item.condPago,
            docto: item.docto,
            chAdj: item.chAdj,
            correo: item.correo,
            fechaRegistro: item.fechaRegistro,
          }));
    
          // Sobrescribe los datos actuales con los resultados de búsqueda
          setProveedorData(mappedData);
        }
      } catch (error) {
        console.error("Error al buscar proveedores:", error);
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


const guardarProveedor = () => { 
  // Si hay un guardado en proceso, no permitir ninguna acción
  if (isSaving) return;
  setIsSaving(true); // Establecer en true al comenzar el guardado



  // Verificar si alguno de los campos está vacío
  if (!nombre.trim() || !codigo.trim()) {
    Swal.fire({
      title: "Campos vacíos",
      text: "Por favor, completa todos los campos antes de guardar.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      inputRef.current?.focus();
    });
    setIsSaving(false); // Reestablecer isSaving
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
      const nuevoProveedor = {
        codigoProveedor: codigo,
        nombre: nombre
      };

      console.log("Proveedor guardado:", nuevoProveedor);

      // Realizar la solicitud al servidor
      axios.post('http://localhost:8080/api/proveedores', nuevoProveedor)
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: "¡Guardado!",
            text: "El proveedor se guardó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            setIsSaving(false); // Reestablecer isSaving
          });

          setCodigo("");
          setNombre("");

          fetchProveedor(currentPage, 7); // Recargar la lista
          closeModal();

        })
        .catch((error) => {
          console.error("Error al guardar el proveedor", error);
          Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al guardar el proveedor.",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            setIsSaving(false); // Reestablecer isSaving
          });
        });

    } else {
      Swal.fire({
        title: "Cancelado",
        text: "No se guardó el proveedor.",
        icon: "info",
        confirmButtonText: "OK",
      }).then(() => {
        setIsSaving(false); // Reestablecer isSaving
      });
    }

    inputRef.current?.focus();
  });
};

//GUADAR MODAL CON TECKAD F4


useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "F4") {
      event.preventDefault();

      if (!isModalOpen) {
        guardarProveedor(); // Llama a la función guardarProveedor cuando el modal está abierto
      } else {
    
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isModalOpen, nombre, codigo, isSaving]); // Dependencias actualizadas




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
    setIsTouchedRegion(false);
    setIsTouchedComuna(false);
    

    //PORNE A NULL VALORES
    setDireccion( ""); // Usa optional chaining
    setFonoProveedor(""); // Usa optional chaining
    setCiudad( ""); // Usa optional chaining
    setEmail( ""); // Usa optional chaining
    setAtencion(""); // Usa optional chaining
    setCelular(""); // Usa optional chaining
    setRegion("");
    setComuna("");

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
    if (showModalCliente || showModal || showModalCostos || showModalDeta || isSaving) return; // Si hay algún modal abierto o estamos guardando, no hacer nada

    console.log("manajndo con taclado")
    if (e.key === "ArrowDown") {
      setActiveRow((prev) => (prev + 1) % filteredFacturaVen.length); // Navegar hacia abajo
    } else if (e.key === "ArrowUp") {
      setActiveRow((prev) =>
        prev === 0 ? filteredFacturaVen.length - 1 : prev - 1
      ); // Navegar hacia arriba
    } else if (e.key === "F9") {
      e.preventDefault(); 
      openModalDetallleProveedor(filteredFacturaVen[activeRow]); // Abrir modal

    } else if (e.key === "F10") {
      e.preventDefault(); // Evitar comportamiento predeterminado del navegador para F10
      openModalCliente(filteredFacturaVen[activeRow]); // Abrir modal de cliente
    }
    else if (e.key === "F11") {
    e.preventDefault(); // Evitar comportamiento predeterminado del navegador para F10
    openModalCostos(filteredFacturaVen[activeRow]); // Abrir modal de cliente
   }
   else if (e.key === "F6") {
    e.preventDefault(); // Evitar comportamiento predeterminado de la tecla
    deleteProveedor(filteredFacturaVen[activeRow]); // Llama a la función para eliminar proveedor
  }

  };

const closeModalDetalle = () => {
     // Restablece el estado de edición del cliente

    
   //  isEditingClienteD
  setShowModalDeta(false); // Cierra el modal
  inputRef.current?.focus(); // Mueve el foco al input de búsqueda
 setNombre("");
 setCodigo("");

 setIsEditingClienteD(false); // Aquí se asegura que vuelva al modo "Editar"

};


  //ABRIR MODAL CLEINTE

  const openModalCliente = (proveedor:Proveedor) => {


    setShowModalCliente(true); // Abre el modal
    

    setSelectedClienteItem(proveedor); // Establecer el artículo seleccionado
    
  };

 

 
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
  
//LIMINAR PROVEEEDOR

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
       // Enfocar el campo de búsqueda después de confirmar o cancelar
    inputRef.current?.focus();
    });
  };


  
  
//modal costos
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








// Filtrar datos según los términos de búsqueda
const filteredFacturaVen = proveedorData.filter((factura) => {
  const matchesCodigo = searchTerm === "" || factura.codigoProveedor.toString().includes(searchTerm);
  const matchesNombre = searchTermNombre === "" || factura.nombre.toLowerCase().includes(searchTermNombre.toLowerCase());
  return matchesCodigo && matchesNombre;
});






  // Filtrar datos según el término de búsqueda
  //const filteredFacturaVen = proveedorData.filter((factura) =>

 //   factura.codigoProveedor.toString().includes(searchTerm)
 // );


  
 

 

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
    if (event.key === 'F8') {
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

const guardarCostoProveedor = () => { 
  // Verificar si alguno de los campos está vacío
  if (!administrativo.trim() || !perdida.trim() || !flete.trim() || !ndias.trim()) {
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
    title: "¿Deseas guardar el proveedor?",
    text: "Se actualizará proveedor.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, guardar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoClienteProveedor = {
        codigoProveedor: selectedCostosItem?.codigoProveedor,
        nombre: selectedCostosItem?.nombre,
        adminProveedor: administrativo,
        perdida: perdida,
        flete: flete,
        ndias: ndias,
      };

      console.log("Proveedor guardado:", nuevoClienteProveedor);

      axios
        .put(`http://localhost:8080/api/proveedores/costo/${selectedCostosItem?.idProveedores}`, nuevoClienteProveedor)
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);
          Swal.fire({
            title: "¡Guardado!",
            text: "El proveedor se guardó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Enfocar el campo de búsqueda después de que el modal de confirmación de éxito haya cerrado
            inputRef.current?.focus();
          });

          setAdministrativo("");
          setPerdida("");
          setFlete("");
          setNdias("");

          fetchProveedor(currentPage, 7); // Recargar la lista
          closeModalCostos();
        })
        .catch((error) => {
          console.error("Error al guardar el proveedor:", error);
          Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al guardar el proveedor.",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            // Enfocar el campo de búsqueda incluso si hubo un error
            inputRef.current?.focus();
          });
        });
    } else {
      Swal.fire({
        title: "Cancelado",
        text: "No se guardó proveedor.",
        icon: "info",
        confirmButtonText: "OK",
      }).then(() => {
        // Enfocar el campo de búsqueda si se cancela
        inputRef.current?.focus();
      });
    }
  });
};


//ACTUALIZAR DETALLE
const guardarDetalleProveedor = () => { 

  // Verificar si los campos están vacíos
  if (!nombre.trim() || !codigo.trim()) {
    Swal.fire({
      title: "Campos vacíos",
      text: "Por favor, completa todos los campos antes de guardar.",
      icon: "warning",
      confirmButtonText: "OK",
    }).then(() => {
      // Enfocar el campo después de mostrar el mensaje de advertencia
      inputRef.current?.focus();
    });
    return; // Detener la ejecución si los campos están vacíos
  }

  // Mostrar confirmación antes de guardar
  Swal.fire({
    title: "¿Deseas actualizar el proveedor?",
    text: "Se guardará el proveedor.",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, guardar",
    cancelButtonText: "Cancelar",
  }).then((result) => {

    if (result.isConfirmed) {
      // Crear un nuevo objeto de solicitud
      const nuevoClienteProveedor = {
        codigoProveedor: codigo, // Asignar dinámicamente
        nombre: nombre, // Asignar dinámicamente
      };

      console.log("Proveedor guardado:", nuevoClienteProveedor);

      // Realizar la solicitud al servidor
      axios.put(`http://localhost:8080/api/proveedores/detalle/${selectedDetalleItem?.idProveedores}`, nuevoClienteProveedor)
        .then((response) => {
          console.log('Respuesta del servidor:', response.data);
          Swal.fire({
            title: "¡Guardado!",
            text: "El proveedor se guardó correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Enfocar el campo después de que el mensaje de éxito se cierre
            inputRef.current?.focus();
          });

          setNombre("");
          setCodigo("");

          fetchProveedor(currentPage, 7); // Recargar la lista
          closeModalDetalle();

        })  
        .catch((error) => {
          console.error("Error al guardar el proveedor:", error);
          Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al guardar el proveedor.",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            // Enfocar el campo después de que el mensaje de error se cierre
            inputRef.current?.focus();
          });
        });

    } else {
      Swal.fire({
        title: "Cancelado",
        text: "No se guardó el proveedor.",
        icon: "info",
        confirmButtonText: "OK",
      }).then(() => {
        // Enfocar el campo después de que el mensaje de cancelación se cierre
        inputRef.current?.focus();
      });
    }
  });
};


//ACTUALIZAR CLEINTE
const guardarClienteProveedor = () => { 
 
 
  const mensajes = [];

  if (!direccion.trim()) {
    mensajes.push("El campo 'Dirección' está vacío.");
  }
  if (!email.trim()) {
    mensajes.push("El campo 'Email' está vacío.");
  }
  if (!fonoProveedor.trim()) {
    mensajes.push("El campo 'Teléfono del proveedor' está vacío.");
  }
  if (!atencion.trim()) {
    mensajes.push("El campo 'Atención' está vacío.");
  }
  if (!celular.trim()) {
    mensajes.push("El campo 'Celular' está vacío.");
  }
  if (!region.trim()) {
    mensajes.push("El campo 'Región' está vacío.");
  }
  if (!comuna.trim()) {
    mensajes.push("El campo 'Comuna' está vacío.");
  }
  if (!correoContacto.trim()) {
    mensajes.push("El campo 'correo contacto' está vacío.");
  }


  // Si hay mensajes, significa que hay campos vacíos
  if (mensajes.length > 0) {
    Swal.fire({
      title: "Campos vacíos",
      html: `<ul>${mensajes.map((mensaje) => `<li>${mensaje}</li>`).join("")}</ul>`,
      icon: "warning",
      confirmButtonText: "OK",
    });
    return; // Detener la ejecución si los campos están vacíos
  }

 
    // Mostrar confirmación antes de guardar
    Swal.fire({
      title: "¿Deseas Actulizar el proveedor?",
      text: "Se guardará el proveedor.",
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
          celuVenta:celular,
          region:region,
          comuna:comuna,
          correoContacto:correoContacto
          
        
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
          setRegion("")
          setComuna("")

          
        

          fetchProveedor(currentPage, 7); // Llama a la función con la página actual y
          closeModalCliente();

        })  
        .catch((error) => {
          console.error("Error al guardar el proveedor:", error);
          Swal.fire({
            title: "¡Error!",
            text: "Hubo un problema al guardar el proveedor.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
      }
      
      else {
        Swal.fire({
          title: "Cancelado",
          text: "No se guardó el proveedor.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    });
  };



  //LIMPIA CUANDO CAMBIA EL SELECT PARA BUSCAR
  const handleSelectChange = (e) => {
    setSelectedOptionEstados(e.target.value);

    // Limpia los valores de los inputs al cambiar la opción
    if (e.target.value === "codigo") {
      setSearchTermnombre(""); // Limpia el valor de nombre
      fetchProveedor(currentPage, 7); 
    
     
    } else if (e.target.value === "nombre") {
      setSearchTerm(""); // Limpia el valor de código
      fetchProveedor(currentPage, 7);  
    }
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

          <div className="flex justify-start items-center gap-4 " >
          
          <div className=" w-32">
      

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedOptionEstados}
          onChange={handleSelectChange}
        //  onChange={(e) => {
          //  setSelectedOptionEstados(e.target.value);
          //  changeTextColor();
         // }}


          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          
          <option value="codigo" className="text-body dark:text-bodydark">
            Código
          </option>
          <option value="nombre" className="text-body dark:text-bodydark">
            Nombre
          </option>
         
        </select>

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>




           </div>
        
           <div className="relative">
           {selectedOptionEstados === "nombre" && (
  <input
    type="text"
    placeholder="Escribe proveedor"
    className="w-full bg-transparent px-2 pr-4 py-2 text-black border border-gray-300 focus:border-primary focus:outline-none dark:text-white dark:border-gray-600 dark:focus:border-primary xl:w-125 rounded-xl"
    value={searchTermNombre}
    ref={inputRef} // Asigna la referencia al input
    onChange={handleInputChangenombre} // Maneja cambios en el input
  />
)}



{selectedOptionEstados === "codigo" && (
  <input
    type="text"
    placeholder="Escribe código"
    className="w-full bg-transparent px-2 pr-4 py-2 text-black border border-gray-300 focus:border-primary focus:outline-none dark:text-white dark:border-gray-600 dark:focus:border-primary xl:w-125 rounded-xl"
    value={searchTerm}
    ref={inputRef} // Asigna la referencia al input
    onChange={handleInputChange} // Maneja cambios en el input
  />
)}

  <svg
    className="absolute right-0 top-1/2 -translate-y-1/2 fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary  mr-3"
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
                  N° Días Credito
                </th>
                
                
                <th className="py-2 px-4 font-medium text-black dark:text-white text-center ">
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
                
                
            


               
                <td className="border-b border-[#eee] py-2 px-4 dark:border-strokedark text-center ">
                      <div className="flex justify-center items-center space-x-3.5">
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
        <div className="flex items-start justify-between mt-1 border-gray-200 text-left dark:border-strokedark ">
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    
    <div className="flex justify-start   ">
   
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold   ">
      F8 Incorporar
    </p>
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold   ">
      F9 Modificar
    </p>
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold   ">
      F6 Eliminar
    </p>
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold ">
      F10 Datos
    </p>
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold ">
      F11 Costos
    </p>
    <p className="px-0 py-2 w-full sm:w-30 text-start text-sm sm:text-sm font-bold ">
      F3 Enfocar
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

<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    
    <p className="text-sm text-gray-700 dark:text-white">
      {" "}
      <span className="font-medium">{currentPage * pageSize + 1}</span> al{" "}
      <span className="font-medium">
        {Math.min((currentPage + 1) * pageSize, proveedorData.length)}
      </span>{" "}
      de <span className="font-medium">{totalElementos}</span> 
    </p>
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
      onClick={(e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado
        e.stopPropagation(); // Detener propagación del evento
        guardarProveedor(); // Lógica del botón
      }}
     
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

      <h2 className="text-3xl font-bold mb-4 text-start">Costos operacionales (%)</h2> 
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

  
 
 
        

          <div className="flex justify-between ">
            <div className='flex justify-start items-center'>
            <p className='text-1xl font-bold '>Proveedor: </p>
              <p className='px-2 text-1xl font-bold '>{selectedCostosItem.nombre}</p>
              
            </div>
            {selectedCostosItem.flete ? (
            <div className="flex justify-end items-end ">

            {!isEditingCosto ? (

          <button
             className="flex flex-col items-center gap-2 "
          onClick={handleEditClickCosto} // Activa el modo de edición
        >
         <div className="p-2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-full flex items-center justify-center">

          <svg
                          className="fill-current text-blue-700"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                        <span>Modificar</span>
        </button>
        
            ) : (

              

              <button
          className="flex flex-col items-center gap-2"
          onClick={handleCancelClickCosto} // Cancela la edición
        >
       
       <div className="p-2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-full flex items-center justify-center">

          <svg
                          className="fill-current text-blue-700"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                        <span className='pl-2'>No modificar</span>
        </button>
           
            )}

            </div>
            
            ) : (
            <div></div>

            )}

        
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
      

      onClick={(e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado
        e.stopPropagation(); // Detener propagación del evento
        guardarCostoProveedor(); // Lógica del botón
      }}
    >
      Actualizar
    </button>

  ):(

<button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
     
    
      onClick={(e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado
        e.stopPropagation(); // Detener propagación del evento
        guardarCostoProveedor(); // Lógica del botón
      }}
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
<div className="bg-white dark:bg-gray-800 p-6 shadow-2xl border border-gray-300 dark:border-gray-600 rounded-lg w-[90%] sm:w-[900px] max-h-[95vh] overflow-y-auto lg:overflow-y-visible relative">

      <h2 className="text-3xl font-bold mb-4 text-center">Subproceso proveedor</h2> 
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

  
    

         {/* DATOS CLIENTE NUEVO */}
         
         {!selectedClienteItem.direccion ? (

<div className="mb-4 flex flex-col  w-full">

    <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/3 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Dirección
    </label>
    <input
      ref={codigoInputRef} // Vincula la referencia
      type="text"
      placeholder="CARRERA 1807 (DOUGLAS NAVARRO)"
      className={`w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary        ${
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
  <div className="flex flex-col w-full sm:w-1/3 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Fono
    </label>

    <div className="relative">
    <span className="absolute left-4.5 top-3 text-gray-400 dark:text-gray-450">
  <svg
    className="stroke-current"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.6 2.2C7.5 2.1 8.3 2.6 8.7 3.4L10.4 7.3C10.8 8.2 10.5 9.2 9.7 9.8L8.2 11C9.7 14.1 11.9 16.3 15 17.8L16.2 16.3C16.8 15.5 17.8 15.2 18.7 15.6L22.6 17.3C23.4 17.7 23.9 18.5 23.8 19.4C23.6 21.4 22.1 23 20 23C15.4 23 11.2 21 7.8 17.6C4.4 14.2 2.4 10 2.4 5.4C2.4 3.3 4 1.8 6 1.6C6.2 1.6 6.4 1.6 6.6 2.2Z"
    />
  </svg>
</span>


    <input
    type="text"
    placeholder="066 385200"
    className={`w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary   
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
  </div>
  {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
  {isTouchedFono &&  !fonoProveedor && (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El fono es obligatorio.
        </span>
      )}
      
  </div>


   {/* CORREO */}
  <div className="flex flex-col w-full sm:w-1/3 relative">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Correo proveedor
  </label>
  
  <div className="relative">
  <span className="absolute left-4.5 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
  <input
    type="email"
    placeholder="example@gmail.com"
    className={`w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
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
</div>
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


<div className=" my-3 flex flex-row space-x-4 w-full"
>
  <div className="relative w-full flex justify-center items-center">
    {/* Línea con texto en el centro */}
    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
      <hr className="border-t dark:border-gray-600 border-gray-300" />
    </div>
    <p className="px-2 text-1xl font-bold bg-white dark:bg-gray-800 dark:text-white relative z-10">
     Ubicación
    </p>
  </div>
</div>


 {/* NUEBA FILA */}

 <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">


  {/* REGION */}
  <div className="flex flex-col w-full sm:w-1/2 relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Region
      </label>
      <input
        type="text"
        placeholder="Escribe para filtrar"
        className={`w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
           ${
         
          isTouchedRegion && !region?
           "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600"
        }`}
        value={region}
        onChange={handleRegionChange}
        
        //onFocus={handleFocusRegion}
        onFocus={() =>
          setFilteredOptionsR(
            RegionesYcomunas.regiones.map((r) => r.NombreRegion)
          )
        }
       // onBlur={() => setTimeout(() => setFilteredOptionsR([]), 150)}
        onBlur={handleBlurRegion}
        onKeyDown={handleKeyDownRegion}
        required
      />
       {isTouchedRegion && !region && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      *Seleciona una region
    </span>
  )}

      {filteredOptionsR.length > 0 && (
        <ul
          ref={listRef} // Referencia al contenedor de la lista
          className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 z-50 overflow-y-auto max-h-[200px]"
        >
          {filteredOptionsR.map((option, index) => (
            <li
              ref={(el) => (optionRefs.current[index] = el!)} // Asigna la referencia a cada elemento
              key={index}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                selectedIndex === index ? "bg-gray-200 dark:bg-gray-600" : ""
              }`}
              onMouseDown={() => handleOptionClick(option)} // Evitar conflicto con onBlur
            >
              <span>{option}</span>
              {selectedIndex === index && <MdCheck className="text-green-500" />}
            </li>
          ))}
        </ul>
      )}
    </div>

  {/* COMUNAS  */}
  <div className="flex flex-col w-full sm:w-1/2 relative">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Comuna
  </label>
  <input
    type="text"
    placeholder="Escribe para filtrar"
    className={`w-full rounded border border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
      
      ${
      isTouchedComuna && !comuna
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600"
    }`}
    value={comuna}
    onChange={handleComunaChange}
    onBlur={handleBlurComuna}
    onFocus={handleFocusComuna} // Mostrar lista al enfocar
    onKeyDown={handleKeyDownComuna}
    required
  />
  {isTouchedComuna && !comuna && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      *Escribe inicial de comuna y selecciona
    </span>
  )}

  {/* Lista de opciones filtradas */}
  {filteredOptionsC.length > 0 && (
    <ul
    ref={listRefC} // Referencia al contenedor de la lista
      className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 z-50 overflow-y-auto max-h-[200px]"
    >
      {filteredOptionsC.map((option, index) => (
        <li
        ref={(el) => (optionRefsC.current[index] = el!)} // Asigna la referencia a cada elemento
          key={index}
          className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
            selectedIndexC === index ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          onMouseDown={() => handleOptionClickC(option)} // Usar onMouseDown para evitar conflicto con onBlur
        >
         
          <span>{option}</span>
               
          {selectedIndexC === index && <MdCheck className="text-green-500" />}
              
            
        </li>
      ))}
    </ul>
  )}
</div>


  
 


</div>

</div>




   
  ) : (
    
<div className="  flex flex-col  w-full">

  <div className=" flex flex-col space-y-1 w-full">
 
{/* DIRECCIÓN */}
<div className="flex w-full items-center relative">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/5">
    DIRECCIÓN
  </label>
  {isEditingCliente ? (
    <>
    <span className="absolute left-45 ">
  <svg
    className="fill-current"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.66667C6.77855 1.66667 4.16667 4.27855 4.16667 7.5C4.16667 9.99583 6.6075 13.5867 8.35667 16.025C9.05583 17.025 10.9442 17.025 11.6433 16.025C13.3925 13.5867 15.8333 9.99583 15.8333 7.5C15.8333 4.27855 13.2215 1.66667 10 1.66667ZM10 9.16667C8.80955 9.16667 7.83333 8.19045 7.83333 7C7.83333 5.80955 8.80955 4.83333 10 4.83333C11.1904 4.83333 12.1667 5.80955 12.1667 7C12.1667 8.19045 11.1904 9.16667 10 9.16667Z"
        fill=""
      />
    </g>
  </svg>
</span>
<input
      type="text"
      placeholder="CARRERA 1807 (DOUGLAS NAVARRO)"
      className={`w-3/5 rounded border  border-stroke bg-gray py-2 pl-10 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
        ${
          isTouchedDireccion && !direccion
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={direccion}
      onChange={handleDireccionChange}
      onBlur={handleBlurDireccion}
      required
    />

    </>
   
  ) : (
    <>
    
    
    <p className="w-3/5 py-1 text-gray-800 dark:text-gray-200">
      {selectedClienteItem.direccion}
    </p>
    </>
  )}

 <div className="relative  w-1/5">

                {/* Tipo de solicitud */}
                <div className="absolute top-0 right-0 z-10 p-4 border border-dashed border-primary rounded-md">


            {selectedClienteItem.direccion ? (
            <div className="flex justify-end items-end ">

            {!isEditingCliente ? (

          <button
             className="flex flex-col items-center gap-2 "
          onClick={handleEditClickCliente} // Activa el modo de edición
        >
         <div className="p-2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-full flex items-center justify-center">

          <svg
                          className="fill-current text-blue-700"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                        <span>Modificar</span>
        </button>
        
            ) : (

              

              <button
          className="flex flex-col items-center gap-2"
          onClick={handleCancelClickCliente} // Cancela la edición
        >
       
       <div className="p-2 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-full flex items-center justify-center">

          <svg
                          className="fill-current text-blue-700"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        </div>
                        <span className='pl-2'>No modificar</span>
        </button>
           
            )}

            </div>

            ) : (
            <div></div>

            )}
            </div>

                      
                      </div>
 
  

  {/* Mensaje de error */}
  {isTouchedDireccion && !direccion && (
    <span className="text-sm text-red-600 absolute top-full left-0">
      * La dirección es obligatoria.
    </span>
  )}
</div>


{/* Fono */}
<div className="flex w-full items-center  relative">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/5">
    FONO
  </label>
  {isEditingCliente ? (
  <>
  <span className="absolute left-45 top-3 text-gray-400 dark:text-gray-450">
  <svg
    className="stroke-current"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.6 2.2C7.5 2.1 8.3 2.6 8.7 3.4L10.4 7.3C10.8 8.2 10.5 9.2 9.7 9.8L8.2 11C9.7 14.1 11.9 16.3 15 17.8L16.2 16.3C16.8 15.5 17.8 15.2 18.7 15.6L22.6 17.3C23.4 17.7 23.9 18.5 23.8 19.4C23.6 21.4 22.1 23 20 23C15.4 23 11.2 21 7.8 17.6C4.4 14.2 2.4 10 2.4 5.4C2.4 3.3 4 1.8 6 1.6C6.2 1.6 6.4 1.6 6.6 2.2Z"
    />
  </svg>
</span>
<input
      type="text"
      placeholder="385200"
      className={`w-3/5 rounded border  border-stroke bg-gray py-2 pl-10 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
        ${
          isTouchedFono && !fonoProveedor
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={fonoProveedor}
      onChange={handleFonoProveedorChange}
      onBlur={handleBlurFono}
      required
    />
  
  </>  
   
  ) : (
    <p className="w-4/5 py-1 text-gray-800 dark:text-gray-200">
      {selectedClienteItem.fono1}
    </p>
  )}
  {/* Mostrar mensaje de error */}
  {isTouchedFono && !fonoProveedor && (
    <span className="text-sm text-red-600 absolute top-full left-0">
      *El fono es obligatorio.
    </span>
  )}
</div>






  {/* CORREO */}
  <div className="flex w-full items-center  relative">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/5">
    CORREO PROVEEDOR
  </label>
  {isEditingCliente ? (
   <>
   <span className="absolute left-45 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
      type="email"
      placeholder="example@gmail.com"
      className={`w-3/5 rounded border  border-stroke bg-gray py-2 pl-10 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
        ${
          isTouchedEmail && (!email || !isValidCorreo)
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      value={email}
      onChange={handleEmailChange}
      onBlur={handleBlur}
      required
    />
   
   </>
  
  ) : (
    <p className="w-4/5 py-1  text-gray-800 dark:text-gray-200">
      {selectedClienteItem.correo}
    </p>
  )}

  {/* Mensajes de error */}
  {isTouchedEmail && !email && (
    <span className="text-sm text-red-600 absolute top-full left-0">
      * El correo es obligatorio.
    </span>
  )}
  {isTouchedEmail && email && !isValidCorreo && (
    <span className="text-sm text-red-600 absolute top-full left-0">
      * Por favor, ingrese un correo válido.
    </span>
  )}
</div>



</div>


<div className=" my-3 flex flex-row space-x-4 w-full"
>
  <div className="relative w-full flex justify-center items-center">
    {/* Línea con texto en el centro */}
    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
      <hr className="border-t dark:border-gray-600 border-gray-300" />
    </div>
    <p className="px-2 text-1xl font-bold bg-white dark:bg-gray-800 dark:text-white relative z-10">
     Ubicación
    </p>
  </div>
</div>


<div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">


{/* Region */}
<div className="flex w-full sm:w-1/2 items-center  relative">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/6">
    REGIÓN
  </label>
  {isEditingCliente ? (
    <>
    
    <span className="absolute top-1/2 left-20 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
        <input
      type="text"
      placeholder="Escribe para filtrar"
      className={`w-5/6 rounded border  border-stroke bg-gray py-2 pl-8 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
        ${
        isTouchedRegion && !region
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600"
      } relative`} // Se mantiene "relative" para que el ul se posicione bien debajo del input
      value={region}
      onChange={handleRegionChange}
      onFocus={() =>
        setFilteredOptionsR(RegionesYcomunas.regiones.map((r) => r.NombreRegion))
      }
      onBlur={handleBlurRegion}
      onKeyDown={handleKeyDownRegion}
      required
    />

    </>
    
  ) : (
    <p className="w-5/6 py-2 text-gray-800 dark:text-gray-200">
      {selectedClienteItem.region}
    </p>
  )}

  {/* Mensaje de error */}
  {isTouchedRegion && !region && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      *Selecciona una región
    </span>
  )}

  {/* Lista de opciones filtradas */}
  {filteredOptionsR.length > 0 && (
    <ul
      ref={listRef}
      className="absolute top-full ml-20 mt-1 w-5/6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 z-50 overflow-y-auto max-h-[200px]"
      style={{ left: '0' }} // Se asegura que el UL comience en la misma posición horizontal que el input
    >
      {filteredOptionsR.map((option, index) => (
        <li
          ref={(el) => (optionRefs.current[index] = el!)}
          key={index}
          className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
            selectedIndex === index ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          onMouseDown={() => handleOptionClick(option)}
        >
          <span>{option}</span>
          {selectedIndex === index && <MdCheck className="text-green-500" />}
        </li>
      ))}
    </ul>
  )}
</div>




  {/* COMUNAS  */}
  <div className="flex w-full sm:w-1/2 items-center  relative">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/6">
    COMUNA
  </label>
  {isEditingCliente ? (
    <>
    
    <span className="absolute top-1/2 left-22 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>

        <input
    type="text"
    placeholder="Escribe para filtrar"
    className={`w-5/6 ml-3 rounded border  border-stroke bg-gray py-2 pl-8 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
       ${
      isTouchedComuna && !comuna
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600"
    }`}
    value={comuna}
    onChange={handleComunaChange}
    onBlur={handleBlurComuna}
    onFocus={handleFocusComuna} // Mostrar lista al enfocar
    onKeyDown={handleKeyDownComuna}
    required
  />
    
    </>
 
) : (
  <p className='w-full ml-3 py-2'>
        {selectedClienteItem.comuna}
      </p>
  )}
  {isTouchedComuna && !comuna && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      *Escribe inicial de comuna y selecciona
    </span>
  )}

  {/* Lista de opciones filtradas */}
  {filteredOptionsC.length > 0 && (
    <ul
    ref={listRefC} // Referencia al contenedor de la lista
      className="absolute top-full mt-1 w-5/6 ml-20 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 z-50 overflow-y-auto max-h-[200px]"
    >
      {filteredOptionsC.map((option, index) => (
        <li
        ref={(el) => (optionRefsC.current[index] = el!)} // Asigna la referencia a cada elemento
          key={index}
          className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
            selectedIndexC === index ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          onMouseDown={() => handleOptionClickC(option)} // Usar onMouseDown para evitar conflicto con onBlur
        >
         
          <span>{option}</span>
               
          {selectedIndexC === index && <MdCheck className="text-green-500" />}
              
            
        </li>
      ))}
    </ul>
  )}
</div>


  
 


</div>



</div>


)}
 


 


           {/* Separador */}
<div className="mb-4 flex flex-row space-x-4 w-full"

>
  <div className="relative w-full flex justify-center items-center">
    {/* Línea con texto en el centro */}
    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
      <hr className="border-t dark:border-gray-600 border-gray-300" />
    </div>
    <p className="px-2 text-1xl font-bold bg-white dark:bg-gray-800 dark:text-white relative z-10">
      Contacto del vendedor
    </p>
  </div>
</div>



      
  {/* CONTACTO NUEVO */}

  {!selectedClienteItem.direccion ? (

  <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
  {/* Código */}
  <div className="flex flex-col w-full sm:w-1/3 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Atencion
    </label>
    <div className="relative">
    <span className="absolute left-4.5 top-3">
    <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                      </span>
    <input
      type="text"
      placeholder="PEDRO GONZALEZ"
     className={`w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary        ${
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
   </div>
 
    {/* Mostrar el mensaje de error si el campo está vacío o el correo no es válido */}
    {isTouchedAtencion && !atencion &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El atencion es obligatorio.
        </span>
      )}
  </div>

  
 
 {/* Celular */}
 <div className="flex flex-col w-full sm:w-1/3 relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Celular
    </label>
   
    <div className="relative">
    <span className="absolute left-4.5 top-3 text-gray-400 dark:text-gray-450">
  <svg
    className="stroke-current"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.6 2.2C7.5 2.1 8.3 2.6 8.7 3.4L10.4 7.3C10.8 8.2 10.5 9.2 9.7 9.8L8.2 11C9.7 14.1 11.9 16.3 15 17.8L16.2 16.3C16.8 15.5 17.8 15.2 18.7 15.6L22.6 17.3C23.4 17.7 23.9 18.5 23.8 19.4C23.6 21.4 22.1 23 20 23C15.4 23 11.2 21 7.8 17.6C4.4 14.2 2.4 10 2.4 5.4C2.4 3.3 4 1.8 6 1.6C6.2 1.6 6.4 1.6 6.6 2.2Z"
    />
  </svg>
</span>
    <input
      type="text"
      placeholder="098719634"
      className={`w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary         ${
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
    </div>
  
     {isTouchedCelular && !celular &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El celular es obligatorio
        </span>
      )}
  </div>

 {/* Correo de contacto */}
   {/* CORREO */}
   <div className="flex flex-col w-full sm:w-1/3 relative">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
    Correo contacto
  </label>
  
  <div className="relative">
  <span className="absolute left-4.5 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
  
  <input
    type="correoContacto"
    placeholder="example2@gmail.com"
    className={`w-full rounded border border-stroke bg-gray py-2 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary       ${
        isTouchedCorreoContacto && (!correoContacto || !isValidCorreoContacto)
          ? "border-red-500 focus:ring-red-500"
          : isTouchedCorreoContacto && correoContacto && isValidCorreoContacto
          ?"border-gray-300 dark:border-gray-600"
          : "border-gray-300 dark:border-gray-600"
      }`}
    value={correoContacto}
    onChange={handleCorreoContactoChange}
    onBlur={handleBlurCorreoContacto}
    required
  />
  </div>

  {/* Mensajes dinámicos */}
  {isTouchedCorreoContacto && !correoContacto && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * El correo es obligatorio.
    </span>
  )}
  {isTouchedCorreoContacto && correoContacto && !isValidCorreoContacto && (
    <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
      * Por favor, ingrese un correo válido.
    </span>
  )}
</div>


</div>

) : (
<div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-1 w-full">
  {/* ATENCION CONTACTO */}
  
  <div className="flex w-full sm:flex-1 items-center  relative">

    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 w-1/6">
      ATENCIÓN
    </label>
    {isEditingCliente ? (
      <>
      <span className="absolute left-20 top-3">
       <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                      </span>
    <input
      type="text"
      placeholder="PEDRO GONZALEZ"
     className={`w-5/6 ml-6 rounded border  border-stroke bg-gray py-2 pl-8 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
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
   
   </>
   
  ) 
  
  : (
    <p className='w-5/6 py-2 ml-6'>
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
 <div className="flex w-full sm:w-1/4 items-center  relative">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300  w-2/6">
      CELULAR
    </label>
    {isEditingCliente ? (
    <input
      type="text"
      placeholder="098719634"
      className={`w-4/6 rounded border  border-stroke bg-gray py-2 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
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
    <p className='w-4/6 py-2'>
          {selectedClienteItem.celuVenta}
        </p>
    )}
     {isTouchedCelular && !celular &&  (
        <span className="text-sm text-red-600 mt-0 absolute top-full left-0">
         *El celular es obligatorio
        </span>
      )}
  </div>

  
  <div className="flex w-full sm:flex-1 items-center space-x-4 relative">
  {/* Label */}
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 w-1/6">
    CORREO
  </label>

  {/* Input o texto */}
  {isEditingCliente ? (
    <>
     <span className="absolute left-15 top-3">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
  
    
   
    <input
      type="email"
      placeholder="example@gmail.com"
      className={`w-5/6 rounded border  border-stroke bg-gray py-2 pl-8 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary
      ${
        isTouchedCorreoContacto && (!correoContacto || !isValidCorreoContacto)
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600"
      }`}
      value={correoContacto}
      onChange={handleCorreoContactoChange}
      onBlur={handleBlurCorreoContacto}
      required
    />
     </>
  ) : (
    <p className="w-5/6 py-2">{selectedClienteItem.correoContacto}</p>
  )}

  {/* Mensajes dinámicos */}
  <div className="absolute top-full left-0 mt-1">
    {isTouchedCorreoContacto && !correoContacto && (
      <span className="text-sm text-red-600">* El correo es obligatorio.</span>
    )}
    {isTouchedCorreoContacto && correoContacto && !isValidCorreoContacto && (
      <span className="text-sm text-red-600">* Por favor, ingrese un correo válido.</span>
    )}
  </div>
</div>



</div>
 


)}

          
 {/* Separador */}
 <hr className="border-t dark:border-gray-600 border-gray-300 my-4 mx-auto"/>

  
     {/* Tipo de operación termina select */}
{/* Botones */}
<div className="flex flex-col sm:flex-row justify-between gap-2 w-full">
  {/* Primer div: F5 = Modificar, F4 = Guardar, F3 = Anterior */}
  <div className="flex justify-center gap-2 w-full">
    {selectedClienteItem.direccion ? (
      <>
        <p className="px-2 py-1 w-full sm:w-70 text-start text-md sm:text-md font-bold">
          F5 = Modificar
        </p>
        <p className="px-2 py-1 w-full sm:w-70 text-start text-md sm:text-md font-bold">
          F4 = Guardar
        </p>
        <p className="px-2 py-1 w-full text-start text-md sm:text-md font-bold">
          F3 = Anterior
        </p>
      </>
    ) : (
      <>
        <p className="px-2 py-1 w-full sm:w-80 text-start text-md sm:text-md font-bold">
          F4 = Guardar
        </p>
        <p className="px-2 py-1 w-full text-start text-md sm:text-md font-bold">
          F3 = Anterior
        </p>
      </>
    )}
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
    {selectedClienteItem.direccion ? (
      <button
        className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
        onClick={(e) => {
          e.preventDefault(); // Evitar el comportamiento predeterminado
          e.stopPropagation(); // Detener propagación del evento
          guardarClienteProveedor();
        }}
      >
        Actualizar
      </button>
    ) : (
      <button
        className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
        onClick={(e) => {
          e.preventDefault(); // Evitar el comportamiento predeterminado
          e.stopPropagation(); // Detener propagación del evento
          guardarClienteProveedor();
        }}
      >
        Guardar
      </button>
    )}

    <button
      onClick={closeModalCliente}
      className="px-3 py-2 text-sm bg-transparent text-gray-600 dark:text-white border border-gray-500 dark:border-gray-300 rounded-lg hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-white w-full sm:w-auto sm:px-4 sm:py-2 transition-all duration-300 ease-in-out"
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
  
<div className="flex flex-row w-full sm:w-full relative items-center justify-between">
  {/* Div de Nombre con 80% */}
  <div className="flex flex-row  w-full items-center space-x-2 flex-[8]">
  <p className="font-bold">Nombre :</p>
  {isEditingClienteD ? (
    <input
      type="text"
     
      className={`w-80 px-3 py-0 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedNombre && (!nombre )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedNombre && nombre
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
    value={nombre}
    onChange={handleNombreDetalleChange}

      onBlur={handleBlurNombreDetalle}
      required
   />
      ) : (
        <>
       
        <p>{selectedDetalleItem.nombre}</p>
        </>
    )}

  </div>

  {/* Div de botones con 20% */}
  <div className="w-full flex-[2] flex justify-end">
    {!isEditingClienteD ? (
       <button
       className="flex items-center  "
       onClick={handleEditClickClienteD} // Activa el modo de edición aquiiii
     >
       <MdEdit className="text-sm" />
        <span>Modificar</span>
        
     </button>
   ) : (
     <button
       className="flex items-center py-2 px-4 "
       onClick={handleCancelClickClienteD} // Cancela la edición
     >
       <MdEdit className="text-sm" />
       <span>No modificar</span>
     </button>
    )}
  </div>
</div>

    
    
</div>
<div className="mb-1 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 w-full">
<div className="flex flex-row w-full sm:w-1/2 relative items-start justify-start space-x-4">
  <p className="font-bold ">Codigo:</p>
  

  {isEditingClienteD ? (
    <input
      type="text"
     
      className={`w-100  px-3 py-0 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none border
        ${
          isTouchedCodigo && (!codigo )
            ? "border-red-500 focus:ring-red-500"
            : isTouchedCodigo && codigo
            ?"border-gray-300 dark:border-gray-600"
            : "border-gray-300 dark:border-gray-600"
        }`}
    value={codigo}
    onChange={handleCodigoDetalleChange}

      onBlur={handleBlurCodigoDetalle}
      required
   />
      ) : (
        <>
       
       <p className=''>{selectedDetalleItem.codigoProveedor}</p>
        </>
    )}
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
      F3 Anterior
    </p>

    <p className="px-0 py-2 w-full text-start text-md sm:text-md font-bold">
      F5 Modificar
    </p>
    



  
    
  </div>

  {/* Segundo div: Botones Guardar y Anterior */}
  <div className="flex flex-col sm:flex-row justify-end gap-2 w-full">
  <button
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto sm:px-4 sm:py-2 duration-300"
      onClick={guardarDetalleProveedor}
    >
      Actualizar
    </button>

   
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
