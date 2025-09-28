package com.invoiceapp.invoices.api.web.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceItemDto {

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @DecimalMin(value = "0.01", message = "Net price must be greater than 0")
    private BigDecimal netPrice;
}
