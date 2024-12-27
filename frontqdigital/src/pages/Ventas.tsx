import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import Venta from '../components/Ventas/Ventas';

const Ventas = () => {
  return (
    <>
      <Breadcrumb pageName="Ventas" />    
        <Venta />
    </>
  );
};

export default Ventas;
