package com.invoiceapp.invoices.web;

import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.InvoicesController;
import com.invoiceapp.invoices.api.web.InvoicesMapper;
import com.invoiceapp.invoices.api.web.dto.InvoiceDto;
import com.invoiceapp.invoices.module.model.Buyer;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.LocalDate;
import java.util.UUID;
import java.util.stream.Stream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InvoicesController.class)
class CreateInvoiceValidationTest  extends BaseInvoicesWebTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    InvoicesService service;

    @MockitoBean
    private InvoicesMapper mapper;

    @Test
    void shouldCreate_andReturn200() throws Exception {
        var reqJson = asJson(validCreateDto());

        var id = UUID.randomUUID();
        var entity = new InvoiceEntity();
        entity.setId(id);
        entity.setInvoiceNumber("FV/2025/01/01");
        entity.setIssueDate(LocalDate.parse("2025-01-10"));
        entity.setDueDate(LocalDate.parse("2025-01-25"));
        entity.setBuyer(new Buyer("ABC Sp. z o.o.", "1234567890"));

        InvoiceDto response = sampleResponse(id);

        given(service.createInvoice(any())).willReturn(entity);
        given(mapper.toDto(entity)).willReturn(response);

        mvc.perform(post("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id.toString()))
                .andExpect(jsonPath("$.invoiceNumber").value("FV/2025/01/01"))
                .andExpect(jsonPath("$.buyer.name").value("ABC Sp. z o.o."))
                .andExpect(jsonPath("$.items.length()").value(2));

        verify(service).createInvoice(any());
    }


    @ParameterizedTest(name = "{index} -> {0}")
    @MethodSource("com.invoiceapp.invoices.web.BaseInvoicesWebTest#invalidBodies")
    @DisplayName("POST /api/invoices → 400 for invalid body")
    void shouldReturn400ForInvalidBody(String _case, String json) throws Exception {
        mvc.perform(post("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(service);
    }
}
