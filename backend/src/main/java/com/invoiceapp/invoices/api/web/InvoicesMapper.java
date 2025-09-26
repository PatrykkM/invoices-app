package com.invoiceapp.invoices.api.web;

import com.invoiceapp.invoices.api.web.dto.*;
import com.invoiceapp.invoices.module.model.*;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
)
public interface InvoicesMapper {

    InvoiceDto toDto(InvoiceEntity entity);
    BuyerDto toDto(Buyer buyer);
    InvoiceItemDto toDto(InvoiceItem item);
    List<InvoiceDto> toDtoList(List<InvoiceEntity> entities);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "items", source = "items")
    InvoiceEntity toEntity(CreateInvoiceDto dto);

    InvoiceItem toEntity(InvoiceItemDto dto);
    List<InvoiceItem> toEntity(List<InvoiceItemDto> dtos);

    Buyer toEntity(BuyerDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "items", ignore = true)
    void updateEntity(@MappingTarget InvoiceEntity target, CreateInvoiceDto source);

    @AfterMapping
    default void replaceItems(CreateInvoiceDto src, @MappingTarget InvoiceEntity target) {
        if (src.getItems() != null) {
            target.getItems().clear();
            target.getItems().addAll(toEntity(src.getItems()));
        }
    }
}

