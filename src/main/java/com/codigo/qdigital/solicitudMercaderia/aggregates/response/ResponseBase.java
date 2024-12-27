package com.codigo.qdigital.solicitudMercaderia.aggregates.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ResponseBase {
    private int code;
    private String message;
    private Object data;

}
