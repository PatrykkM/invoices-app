package com.invoiceapp.invoices.module.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class InvoiceItem {
    @Column(nullable=false)
    private String description;

    @Column(nullable=false)
    private int quantity;

    @Column(nullable=false, precision=14, scale=2)
    private BigDecimal netPrice;
}