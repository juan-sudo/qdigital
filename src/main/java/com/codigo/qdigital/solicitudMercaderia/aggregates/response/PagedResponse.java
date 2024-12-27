package com.codigo.qdigital.solicitudMercaderia.aggregates.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PagedResponse<T> {
    private List<T> content;      // Lista de elementos
    private long totalElements;   // Total de elementos
    private int totalPages;       // Total de páginas
    private int currentPage;      // Página actual
}
