package com.invoiceapp.invoices.web;

import com.invoiceapp.common.GlobalExceptionHandler;
import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.InvoicesController;
import com.invoiceapp.invoices.api.web.InvoicesMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;
import java.util.UUID;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InvoicesController.class)
@Import(GlobalExceptionHandler.class)
class GetInvoicesWebTest extends BaseInvoicesWebTest {

    @MockitoBean InvoicesService service;
    @MockitoBean InvoicesMapper mapper;

    @Test
    @DisplayName("GET /api/invoices -> 200 non empty Array")
    void shouldList_andReturn200_nonEmpty() throws Exception {
        var e1 = sampleEntity(UUID.randomUUID());
        var e2 = sampleEntity(UUID.randomUUID());
        var entities = List.of(e1, e2);
        var dtos = List.of(sampleResponse(e1.getId()), sampleResponse(e2.getId()));

        given(service.getAllInvoices()).willReturn(entities);
        given(mapper.toDtoList(entities)).willReturn(dtos);

        mvc.perform(get("/api/invoices"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    @DisplayName("GET /api/invoices -> 200 empty Array []")
    void shouldList_andReturn200_empty() throws Exception {
        given(service.getAllInvoices()).willReturn(List.of());
        given(mapper.toDtoList(List.of())).willReturn(List.of());

        mvc.perform(get("/api/invoices"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}
