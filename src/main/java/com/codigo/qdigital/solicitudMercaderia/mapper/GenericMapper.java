package com.codigo.qdigital.solicitudMercaderia.mapper;

import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.DetalleSolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProductoDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.ProveedorDTO;
import com.codigo.qdigital.solicitudMercaderia.aggregates.dto.SolicitudDTO;
import com.codigo.qdigital.solicitudMercaderia.entity.DetalleSolicitudMercaderiaEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProductoEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.ProveedorEntity;
import com.codigo.qdigital.solicitudMercaderia.entity.SolicitudMercaderiaEntity;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

@Service
public class GenericMapper {

    private static final ModelMapper modelMapper = new ModelMapper();
//PRODUCTO VS PROVEEDOR
    public ProductoDTO mapProductoEntityToProductoDTO(ProductoEntity triaje){
        return modelMapper.map(triaje, ProductoDTO.class);
    }

    public ProveedorDTO mapProveedorEntityToProveedorDTO(ProveedorEntity procedimiento){
        return modelMapper.map(procedimiento, ProveedorDTO.class);
    }
    //SOLICITUD VS DETALLESOLICITUD
    public SolicitudDTO mapSolicitudEntityToSolicitudDTO(SolicitudMercaderiaEntity triaje){
        return modelMapper.map(triaje, SolicitudDTO.class);
    }

    public DetalleSolicitudDTO mapDetalleSolicitudToDetalleSolicitudDTO(DetalleSolicitudMercaderiaEntity procedimiento){
        return modelMapper.map(procedimiento, DetalleSolicitudDTO.class);
    }





}
