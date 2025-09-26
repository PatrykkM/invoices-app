package com.invoiceapp.invoices.api.web.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class InvoiceDto {
    private UUID id;
    private String invoiceNumber;
    private LocalDate issueDate;
    private LocalDate dueDate;
    private BuyerDto buyer;
    private List<InvoiceItemDto> items;
}
