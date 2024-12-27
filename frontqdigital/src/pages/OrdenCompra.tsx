import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Orden from '../components/ordenCompra/OrdenCompra';


const OrdenCompra = () => {
  return (
    <>
      <Breadcrumb pageName="Orden Compra" />    
        <Orden  />
    </>
  );
};

export default OrdenCompra;
