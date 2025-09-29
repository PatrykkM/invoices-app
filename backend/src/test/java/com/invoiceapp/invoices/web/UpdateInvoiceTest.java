package com.invoiceapp.invoices.web;

import com.invoiceapp.common.GlobalExceptionHandler;
import com.invoiceapp.invoices.api.app.BusinessException;
import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.InvoicesController;
import com.invoiceapp.invoices.api.web.InvoicesMapper;
import com.invoiceapp.invoices.module.model.Buyer;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.time.LocalDate;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InvoicesController.class)
@Import(GlobalExceptionHandler.class)
class UpdateInvoiceValidationTest extends BaseInvoicesWebTest {

    @MockitoBean
    InvoicesService service;

    @MockitoBean
    InvoicesMapper mapper;

    @Test
    @DisplayName("Should update invoice and return 200 OK")
    void shouldUpdateInvoice_andReturn200() throws Exception {
        var reqJson = asJson(validCreateDto());
        var id = UUID.randomUUID();

        var entity = new InvoiceEntity();
        entity.setId(id);
        entity.setInvoiceNumber("FV/2025/01/01");
        entity.setIssueDate(LocalDate.parse("2025-01-10"));
        entity.setDueDate(LocalDate.parse("2025-01-25"));
        entity.setBuyer(new Buyer("ABC Sp. z o.o.", "1234567890"));

        var response = sampleResponse(id);

        given(service.updateInvoice(any(), any())).willReturn(entity);
        given(mapper.toDto(entity)).willReturn(response);

        mvc.perform(put("/api/invoices/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.invoiceNumber").value("FV/2025/01/01"))
                .andExpect(jsonPath("$.buyer.name").value("ABC Sp. z o.o."))
                .andExpect(jsonPath("$.items.length()").value(2));

        verify(service).updateInvoice(any(), any());
    }

    @ParameterizedTest(name = "{index} -> {0}")
    @MethodSource("com.invoiceapp.invoices.web.BaseInvoicesWebTest#invalidBodies")
    @DisplayName("Should return 400 for invalid update body")
    void shouldReturn400ForInvalidUpdateBody(String _case, String json) throws Exception {
        var id = UUID.randomUUID();

        mvc.perform(put("/api/invoices/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("Should return 405 when ID is missing in path (PUT /api/invoices)")
    void shouldReturn405WhenIdIsMissing() throws Exception {
        var reqJson = asJson(validCreateDto());

        mvc.perform(put("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                .andExpect(status().isMethodNotAllowed());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("Should return 400 when ID has invalid format")
    void shouldReturn400WhenIdIsInvalid() throws Exception {
        var reqJson = asJson(validCreateDto());

        mvc.perform(put("/api/invoices/{id}", "not-a-uuid")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }

    @Test
    @DisplayName("PUT /api/invoices/{id} -> 415 when wrong Content-Type")
    void shouldReturn415_whenUnsupportedMediaType_put() throws Exception {
        var id = UUID.randomUUID();
        expectUnsupportedMediaType("PUT", "/api/invoices/" + id);
    }

    @Test
    @DisplayName("PUT /api/invoices/{id} → 400 when business exception (dueDate < issueDate)")
    void shouldReturn400_whenBusinessRuleFails_onPut() throws Exception {
        var id = UUID.randomUUID();

        given(service.updateInvoice(any(), any()))
                .willThrow(new BusinessException("Due date cannot be before issue date"));

        expectBusiness400("PUT", "/api/invoices/" + id, validCreateDto(),
                "Due date cannot be before issue date");

        verifyNoInteractions(mapper);
    }
}
