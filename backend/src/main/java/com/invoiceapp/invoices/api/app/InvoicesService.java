package com.invoiceapp.invoices.api.app;

import com.invoiceapp.invoices.module.model.InvoiceEntity;
import com.invoiceapp.invoices.module.repository.InvoiceRepository;
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

    public List<InvoiceEntity> list() { return repo.findAll(); }

    public InvoiceEntity getAllInvoices(UUID id) { return repo.findById(id).orElseThrow(); }

    public InvoiceEntity createInvoice(InvoiceEntity e) { return repo.save(e); }

    public InvoiceEntity updateInvoice(UUID id, InvoiceEntity changes) {
        var e = repo.findById(id).orElseThrow();
        e.setInvoiceNumber(changes.getInvoiceNumber());
        e.setIssueDate(changes.getIssueDate());
        e.setDueDate(changes.getDueDate());
        e.setBuyer(changes.getBuyer());
        e.getItems().clear();
        e.getItems().addAll(changes.getItems());
        return e;
    }

    public void deleteInvoice(UUID id) { repo.deleteById(id); }
}

