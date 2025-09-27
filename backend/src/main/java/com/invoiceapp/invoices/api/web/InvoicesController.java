package com.invoiceapp.invoices.api.web;

import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.dto.CreateInvoiceDto;
import com.invoiceapp.invoices.api.web.dto.InvoiceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
public class InvoicesController {
    private final InvoicesService service;

    @Qualifier("invoicesMapper")
    private final InvoicesMapper mapper;

    @GetMapping
    public List<InvoiceDto> getInvoices() {
        return mapper.toDtoList(service.getAllInvoices());
    }

    @PostMapping
    public InvoiceDto create(@RequestBody CreateInvoiceDto req) {
        return mapper.toDto(service.createInvoice(req));
    }

    @PutMapping("/{id}")
    public InvoiceDto update(@PathVariable UUID id, @RequestBody CreateInvoiceDto req) {
        return mapper.toDto(service.updateInvoice(id, req));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        service.deleteInvoice(id);
    }
}
