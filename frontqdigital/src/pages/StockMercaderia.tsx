import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

import StockM from '../components/StockMercaderia/StockMercderia';

const StockMercaderia = () => {
  return (
    <>
      <Breadcrumb pageName="Consulta stock" />    
        <StockM  />
    </>
  );
};

export default StockMercaderia;
