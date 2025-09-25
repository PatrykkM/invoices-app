package com.invoiceapp.invoices.api.web;

import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.dto.InvoiceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
public class InvoicesController {
    private final InvoicesService service;

    @GetMapping
    public List<InvoiceDto> getInvoices() {
        return service.list().stream();
    }
}
