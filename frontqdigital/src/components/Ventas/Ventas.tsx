import React, { useState, useEffect } from 'react';
import { MdDelete, MdAdd } from 'react-icons/md';
import { FaRegEdit, FaEye } from 'react-icons/fa';
import { FacturaVenta } from '../../types/FacturaVenta';

const facturaVentaData: FacturaVenta[] = [
  {
    codigo: '11003-UM',
    producto: 'Apple Watch Series 7',
    cantidad: 100,
    unitario: 2,
    des1: 24.00,
    des2: 0.00,
    total: 24700,
  },
  {
    codigo: '15003-UM',
    producto: 'Apple Watch Series 7',
    cantidad: 100,
    unitario: 2,
    des1: 24.00,
    des2: 0.00,
    total: 24700,
  },
  {
    codigo: '12003-UM',
    producto: 'Apple Watch Series 7',
    cantidad: 100,
    unitario: 2,
    des1: 24.00,
    des2: 0.00,
    total: 24700,
  },
];

const Ventas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [facturasVen, setFacturaVen] = useState<FacturaVenta[]>(facturaVentaData);
  const [showModal, setShowModal] = useState(false);
  const [showVerModal, setShowVerModal] = useState(false); // Estado para el modal de ver
    // Inicializar selectedFactura con el primer elemento de facturaVentaData
    const [selectedFactura, setSelectedFactura] = useState<FacturaVenta | null>(facturaVentaData[0] || null);
    const [expandedFactura, setExpandedFactura] = useState<FacturaVenta | null>(null);

    const handleRowClick = (factura: FacturaVenta) => {
        // Si la factura ya está seleccionada, desmarcarla
        if (factura === selectedFactura) {
          setSelectedFactura(null);
        } else {
          setSelectedFactura(factura); // Seleccionar la nueva factura
        }
      
        // Expande la fila si la factura seleccionada no está expandida, o colapsa si ya está expandida
        if (factura === expandedFactura) {
          setExpandedFactura(null); // Colapsar la fila si ya está expandida
        } else {
          setExpandedFactura(factura); // Expandir la fila y mostrar detalles
        }
      };
  const [newFacturaVen, setNewFacturaVen] = useState<FacturaVenta>({
    codigo: '',
    producto: '',
    cantidad: 0,
    unitario: 0,
    des1: 0.00,
    des2: 0.00,
    total: 0,
  });

  const handleInputChangeFa = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewFacturaVen((prevFacturaVen) => ({
      ...prevFacturaVen,
      [name]: value,
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFacturaRececion = () => {
    setFacturaVen((prevFacturaRec) => [...prevFacturaRec, newFacturaVen]);
    setShowModal(false);
    setNewFacturaVen({
      codigo: '',
      producto: '',
      cantidad: 0,
      unitario: 0,
      des1: 0.00,
      des2: 0.00,
      total: 0,
    }); // Reset the form
  };

  
  
  const handleDeleteFactura = (factura: FacturaVenta) => {
    setFacturaVen((prevFacturaRec) =>
      prevFacturaRec.filter((f) => f.codigo !== factura.codigo)
    );
  };

  const filteredFacturaVen = facturasVen.filter((factura) =>
    factura.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Detectar la tecla "n"
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'n') {
        setShowModal(true); // Abrir el modal al presionar "n"
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openVerModal = (factura: FacturaVenta) => {
    console.log('Factura seleccionada:', factura); // Verifica que la factura correcta se selecciona
    setSelectedFactura(factura);
    setShowVerModal(true);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        {/* Contenedor flex para alinearlos horizontalmente con espacio entre */}
        <div className="flex justify-between items-center gap-4">
          {/* Buscador */}
          <input
            type="text"
            placeholder="110012"
            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            value={searchTerm}
            onChange={handleSearch}
          />

          {/* Botón Nueva Venta */}
          <button
            onClick={() => setShowModal(true)} // Abre el modal al hacer clic
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:text-white"
          >
            <MdAdd className="h-5 w-5 mr-2" /> {/* Icono de agregar */}
            Agregar venta
          </button>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Codigo</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Producto</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Cantidad</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Unitario</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Des 1</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Des 2</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Total</p>
        </div>
      </div>
      
      {filteredFacturaVen.map((factura, key) => (
        <div
          className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          key={key}
          onClick={() => handleRowClick(factura)} // Manejar clic en la fila
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{factura.codigo}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{factura.producto}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">${factura.cantidad}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{factura.unitario}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${factura.des1}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${factura.des2}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${factura.total}</p>
          </div>

          {/* Mostrar los botones solo si la fila está seleccionada */}
          {selectedFactura === factura && (
            <div className="col-span-8 flex justify-start space-x-4 mt-4">
              <button
                onClick={() => openVerModal(factura)} // Abrir el modal de ver
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <FaEye className="h-4 w-5 mr-2" />
                <span className="text-sm">Ver</span>
              </button>
              <button className="flex items-center text-yellow-500 hover:text-yellow-700">
                <FaRegEdit className="h-4 w-5 mr-2" />
                <span className="text-sm">Editar</span>
              </button>
              <button className="flex items-center text-red-500 hover:text-red-700">
                <MdDelete className="h-4 w-5 mr-2" />
                <span className="text-sm">Eliminar</span>
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Modal para agregar producto */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-99999">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h5 className="text-xl font-medium text-white dark:text-black">Crear factura</h5>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddFacturaRececion();
              }}
            >
              <input
                type="text"
                placeholder="Codigo"
                className="w-full mb-4 p-2"
                name="codigo"
                value={newFacturaVen.codigo}
                onChange={handleInputChangeFa}
              />
              <input
                type="text"
                placeholder="Producto"
                className="w-full mb-4 p-2"
                name="producto"
                value={newFacturaVen.producto}
                onChange={handleInputChangeFa}
              />
              <input
                type="number"
                placeholder="Cantidad"
                className="w-full mb-4 p-2"
                name="cantidad"
                value={newFacturaVen.cantidad}
                onChange={handleInputChangeFa}
              />
              <input
                type="number"
                placeholder="Unitario"
                className="w-full mb-4 p-2"
                name="unitario"
                value={newFacturaVen.unitario}
                onChange={handleInputChangeFa}
              />
              <input
                type="number"
                placeholder="Descuento 1"
                className="w-full mb-4 p-2"
                name="des1"
                value={newFacturaVen.des1}
                onChange={handleInputChangeFa}
              />
              <input
                type="number"
                placeholder="Descuento 2"
                className="w-full mb-4 p-2"
                name="des2"
                value={newFacturaVen.des2}
                onChange={handleInputChangeFa}
              />
              <input
                type="number"
                placeholder="Total"
                className="w-full mb-4 p-2"
                name="total"
                value={newFacturaVen.total}
                onChange={handleInputChangeFa}
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de ver detalles */}
      {showVerModal && selectedFactura && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-99999">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h5 className="text-xl font-medium text-black dark:text-white">Ver Detalles</h5>
      <p><strong>Codigo:</strong> {selectedFactura.codigo}</p>
      <p><strong>Producto:</strong> {selectedFactura.producto}</p>
      <p><strong>Cantidad:</strong> {selectedFactura.cantidad}</p>
      <p><strong>Unitario:</strong> {selectedFactura.unitario}</p>
      <p><strong>Descuento 1:</strong> {selectedFactura.des1}</p>
      <p><strong>Descuento 2:</strong> {selectedFactura.des2}</p>
      <p><strong>Total:</strong> {selectedFactura.total}</p>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="text-gray-500"
          onClick={() => setShowVerModal(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Ventas;
