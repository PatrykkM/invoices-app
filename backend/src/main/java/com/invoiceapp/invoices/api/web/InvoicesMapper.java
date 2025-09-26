package com.invoiceapp.invoices.api.web;

import com.invoiceapp.invoices.api.web.dto.*;
import com.invoiceapp.invoices.module.model.*;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface InvoicesMapper {

    InvoiceDto toDto(InvoiceEntity entity);
    BuyerDto toDto(Buyer buyer);
    InvoiceItemDto toDto(InvoiceItem item);
    List<InvoiceDto> toDtoList(List<InvoiceEntity> entities);

    InvoiceEntity toEntity(CreateInvoiceDto dto);
    Buyer toEntity(BuyerDto dto);
    InvoiceItem toEntity(InvoiceItemDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget InvoiceEntity target, CreateInvoiceDto source);

    @AfterMapping
    default void replaceItems(CreateInvoiceDto src, @MappingTarget InvoiceEntity target) {
        if (src.getItems() != null) {
            target.getItems().clear();
            for (InvoiceItemDto dto : src.getItems()) {
                target.getItems().add(toEntity(dto));
            }
        }
    }
}
