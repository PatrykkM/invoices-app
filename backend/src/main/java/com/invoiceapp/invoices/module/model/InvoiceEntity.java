package com.invoiceapp.invoices.module.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "invoice")
@Getter
@Setter
@NoArgsConstructor()
public class InvoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(nullable = false, updatable = false)
    private UUID id;

    @NotBlank
    @Column(nullable = false, length = 64)
    private String invoiceNumber;

    @Column(nullable = false)
    private LocalDate issueDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Embedded
    private Buyer buyer;

    @ElementCollection
    private List<InvoiceItem> items = new ArrayList<>();
}