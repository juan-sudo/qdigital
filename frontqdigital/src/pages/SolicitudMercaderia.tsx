import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import Mercaderia from '../components/SolicitudMercaderia/SolicitudMercaderianuevo';

const SolicitudMercaderia = () => {
  return (
    <>
      <Breadcrumb pageName="Solicitud Mercaderia" />    
        <Mercaderia  />
    </>
  );
};

export default SolicitudMercaderia;
