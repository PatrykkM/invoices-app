package com.invoiceapp.invoices.web;

import com.invoiceapp.common.GlobalExceptionHandler;
import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.InvoicesController;
import com.invoiceapp.invoices.api.web.InvoicesMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.NoSuchElementException;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InvoicesController.class)
@Import(GlobalExceptionHandler.class)
class DeleteInvoicesWebTest extends BaseInvoicesWebTest {

    @MockitoBean InvoicesService service;
    @MockitoBean InvoicesMapper mapper;

    @Test
    @DisplayName("DELETE /api/invoices/{id} -> 204")
    void shouldDelete_andReturn204() throws Exception {
        var id = UUID.randomUUID();

        mvc.perform(delete("/api/invoices/{id}", id))
                .andExpect(status().isNoContent());

        verify(service).deleteInvoice(id);
    }

    @Test
    @DisplayName("DELETE /api/invoices/{id} -> for wrong UUID")
    void shouldReturn400_whenDeleteIdInvalid() throws Exception {
        mvc.perform(delete("/api/invoices/{id}", "bad-uuid"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }


    @Test
    @DisplayName("DELETE /api/invoices/{id} -> when not found")
    void shouldReturn404_whenInvoiceNotFound() throws Exception {
        var id = UUID.randomUUID();

        doThrow(new NoSuchElementException("Invoice not found"))
                .when(service).deleteInvoice(id);

        mvc.perform(delete("/api/invoices/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Invoice not found"));
    }
}
