package com.invoiceapp.invoices.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invoiceapp.invoices.api.web.dto.*;
import org.junit.jupiter.params.provider.Arguments;
import org.springframework.beans.factory.annotation.Autowired;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

public abstract class BaseInvoicesWebTest {

    @Autowired
    protected ObjectMapper objectMapper;

    protected String asJson(Object o) throws Exception {
        return objectMapper.writeValueAsString(o);
    }
    protected CreateInvoiceDto validCreateDto() {
        var dto = new CreateInvoiceDto();
        dto.setInvoiceNumber("FV/2025/01/01");
        dto.setIssueDate(LocalDate.parse("2025-01-10"));
        dto.setDueDate(LocalDate.parse("2025-01-25"));
        dto.setBuyer(new BuyerDto("ABC Sp. z o.o.", "1234567890"));
        dto.setItems(List.of(
                new InvoiceItemDto("Licencja", 2, new BigDecimal("500")),
                new InvoiceItemDto("Usługa", 1, new BigDecimal("1500"))
        ));
        return dto;
    }

    protected InvoiceDto sampleResponse(UUID id) {
        return new InvoiceDto(
                id,
                "FV/2025/01/01",
                LocalDate.parse("2025-01-10"),
                LocalDate.parse("2025-01-25"),
                new BuyerDto("ABC Sp. z o.o.", "1234567890"),
                List.of(
                        new InvoiceItemDto("Licencja", 2, new BigDecimal("500")),
                        new InvoiceItemDto("Usługa", 1, new BigDecimal("1500"))
                )
        );
    }

    protected static Stream<Arguments> invalidBodies() {
        return Stream.of(
                Arguments.of("missing invoiceNumber", """
            {
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 2, "netPrice": 500 } ]
            }
            """),
                Arguments.of("blank invoiceNumber", """
            {
              "invoiceNumber": "",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 2, "netPrice": 500 } ]
            }
            """),
                Arguments.of("missing issueDate", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 2, "netPrice": 500 } ]
            }
            """),
                Arguments.of("missing dueDate", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 2, "netPrice": 500 } ]
            }
            """),
                Arguments.of("missing items", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" }
            }
            """),
                Arguments.of("empty items array", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": []
            }
            """),
                Arguments.of("item blank description", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "", "quantity": 2, "netPrice": 500 } ]
            }
            """),
                Arguments.of("item quantity < 1", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 0, "netPrice": 500 } ]
            }
            """),
                Arguments.of("item netPrice <= 0", """
            {
              "invoiceNumber": "FV/2025/01/01",
              "issueDate": "2025-01-10",
              "dueDate": "2025-01-25",
              "buyer": { "name": "ABC Sp. z o.o.", "NIP": "1234567890" },
              "items": [ { "description": "Licencja", "quantity": 2, "netPrice": 0 } ]
            }
            """)
        );
    }
}
