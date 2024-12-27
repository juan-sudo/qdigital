import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Recepcion from '../components/recepcionFactura/RecepcionFactura';

const RecepcionFactura = () => {
    return (
      <>
        <Breadcrumb pageName="Recepcion Factura" />    
          <Recepcion  />
      </>
    );
  };
  
  export default RecepcionFactura;
  