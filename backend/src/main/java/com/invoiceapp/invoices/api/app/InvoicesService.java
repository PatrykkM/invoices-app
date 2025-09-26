package com.invoiceapp.invoices.api.app;

import com.invoiceapp.invoices.api.web.InvoicesMapper;
import com.invoiceapp.invoices.api.web.dto.CreateInvoiceDto;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import com.invoiceapp.invoices.module.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoicesService {
    private final InvoiceRepository repo;
    @Qualifier("invoicesMapper")
    private final InvoicesMapper mapper;

    public List<InvoiceEntity> getAllInvoices() { return repo.findAll(); }

    public InvoiceEntity getInvoiceById(UUID id) { return repo.findById(id).orElseThrow(); }

    public InvoiceEntity createInvoice(CreateInvoiceDto dto) { return repo.save(mapper.toEntity(dto)); }

    public InvoiceEntity updateInvoice(UUID id, CreateInvoiceDto dto) {
        var e = repo.findById(id).orElseThrow();
        mapper.updateEntity(e,dto);
        return e;
    }

    public void deleteInvoice(UUID id) { repo.deleteById(id); }
}

