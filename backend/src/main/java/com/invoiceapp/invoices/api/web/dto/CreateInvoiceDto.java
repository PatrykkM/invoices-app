package com.invoiceapp.invoices.api.web.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CreateInvoiceDto {
    @NotBlank private String invoiceNumber;
    @NotNull  private LocalDate issueDate;
    @NotNull  private LocalDate dueDate;
    private BuyerDto buyer;
    @NotNull @Size(min = 1) private List<InvoiceItemDto> items;
}
