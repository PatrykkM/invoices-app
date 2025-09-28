package com.invoiceapp.invoices.api.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateInvoiceDto {

    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    @Valid
    @NotNull(message = "Buyer is required")
    private BuyerDto buyer;

    @Valid
    @NotEmpty(message = "Invoice must contain at least one item")
    private List<InvoiceItemDto> items;
}