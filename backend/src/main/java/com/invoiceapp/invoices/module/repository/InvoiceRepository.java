package com.invoiceapp.invoices.module.repository;

import com.invoiceapp.invoices.module.model.InvoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvoiceRepository extends JpaRepository<InvoiceEntity, UUID> { }

