package com.invoiceapp.invoices.web;

import com.invoiceapp.invoices.api.web.InvoicesMapper;
import com.invoiceapp.invoices.api.web.dto.BuyerDto;
import com.invoiceapp.invoices.api.web.dto.CreateInvoiceDto;
import com.invoiceapp.invoices.api.web.dto.InvoiceItemDto;
import com.invoiceapp.invoices.module.model.Buyer;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import com.invoiceapp.invoices.module.model.InvoiceItem;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class InvoicesMapperTest {

    private final InvoicesMapper mapper = Mappers.getMapper(InvoicesMapper.class);

    private CreateInvoiceDto sampleCreateDto() {
        var dto = new CreateInvoiceDto();
        dto.setInvoiceNumber("FV/2025/01/01");
        dto.setIssueDate(LocalDate.parse("2025-01-10"));
        dto.setDueDate(LocalDate.parse("2025-01-25"));
        dto.setBuyer(new BuyerDto("ABC Sp. z o.o.", "1234567890"));
        dto.setItems(List.of(
                new InvoiceItemDto("Licencja", 2, new BigDecimal("500.00")),
                new InvoiceItemDto("Usługa", 1, new BigDecimal("1500.00"))
        ));
        return dto;
    }

    private InvoiceEntity sampleEntityWithItems(UUID id) {
        var e = new InvoiceEntity();
        e.setId(id);
        e.setInvoiceNumber("FV/2025/01/01");
        e.setIssueDate(LocalDate.parse("2025-01-10"));
        e.setDueDate(LocalDate.parse("2025-01-25"));
        e.setBuyer(new Buyer("ABC Sp. z o.o.", "1234567890"));
        e.setItems(new ArrayList<>(List.of(
                new InvoiceItem("Licencja", 2, new BigDecimal("500.00")),
                new InvoiceItem("Usługa", 1, new BigDecimal("1500.00"))
        )));
        return e;
    }

    @Test
    @DisplayName("toEntity(CreateInvoiceDto): maps basic fields and items, id is ignored")
    void toEntity_fromCreateDto_mapsFieldsAndItems_andIgnoresId() {
        var dto = sampleCreateDto();

        var entity = mapper.toEntity(dto);

        assertThat(entity.getId()).isNull();
        assertThat(entity.getInvoiceNumber()).isEqualTo("FV/2025/01/01");
        assertThat(entity.getIssueDate()).isEqualTo(LocalDate.parse("2025-01-10"));
        assertThat(entity.getDueDate()).isEqualTo(LocalDate.parse("2025-01-25"));
        assertThat(entity.getBuyer().getName()).isEqualTo("ABC Sp. z o.o.");
        assertThat(entity.getItems()).hasSize(2);
        assertThat(entity.getItems()).extracting(InvoiceItem::getDescription)
                .containsExactlyInAnyOrder("Licencja", "Usługa");
        assertThat(entity.getItems()).extracting(InvoiceItem::getQuantity)
                .containsExactlyInAnyOrder(2, 1);
        assertThat(entity.getItems()).extracting(InvoiceItem::getNetPrice)
                .containsExactlyInAnyOrder(new BigDecimal("500.00"), new BigDecimal("1500.00"));
    }

    @Test
    @DisplayName("toDto(InvoiceEntity): maps basic fields and items to DTO")
    void toDto_fromEntity_mapsFieldsAndItems() {
        var entity = sampleEntityWithItems(UUID.randomUUID());

        var dto = mapper.toDto(entity);

        assertThat(dto.getId()).isEqualTo(entity.getId());
        assertThat(dto.getInvoiceNumber()).isEqualTo("FV/2025/01/01");
        assertThat(dto.getIssueDate()).isEqualTo(LocalDate.parse("2025-01-10"));
        assertThat(dto.getDueDate()).isEqualTo(LocalDate.parse("2025-01-25"));
        assertThat(dto.getBuyer().getName()).isEqualTo("ABC Sp. z o.o.");
        assertThat(dto.getItems()).hasSize(2);
        assertThat(dto.getItems()).extracting(InvoiceItemDto::getDescription)
                .containsExactlyInAnyOrder("Licencja", "Usługa");
        assertThat(dto.getItems()).extracting(InvoiceItemDto::getQuantity)
                .containsExactlyInAnyOrder(2, 1);
        assertThat(dto.getItems()).extracting(InvoiceItemDto::getNetPrice)
                .containsExactlyInAnyOrder(new BigDecimal("500.00"), new BigDecimal("1500.00"));
    }

    @Test
    @DisplayName("updateEntity(target, source): does not overwrite id and ignores nulls")
    void updateEntity_ignoresNulls_andKeepsId() {
        var existingId = UUID.randomUUID();
        var target = sampleEntityWithItems(existingId);

        var src = new CreateInvoiceDto();
        src.setInvoiceNumber("FV/2025/01/02");
        src.setIssueDate(null);
        src.setDueDate(LocalDate.parse("2025-02-01"));
        src.setBuyer(new BuyerDto("NEW Buyer", "9999999999"));
        src.setItems(null);

        mapper.updateEntity(target, src);

        assertThat(target.getId()).isEqualTo(existingId);
        assertThat(target.getInvoiceNumber()).isEqualTo("FV/2025/01/02");
        assertThat(target.getIssueDate()).isEqualTo(LocalDate.parse("2025-01-10"));
        assertThat(target.getDueDate()).isEqualTo(LocalDate.parse("2025-02-01"));
        assertThat(target.getBuyer().getName()).isEqualTo("NEW Buyer");
        assertThat(target.getItems()).hasSize(2);
        assertThat(target.getItems()).extracting(InvoiceItem::getDescription)
                .containsExactlyInAnyOrder("Licencja", "Usługa");
    }

    @Test
    @DisplayName("updateEntity(target, source): replaces items when source.items is provided (custom @AfterMapping)")
    void updateEntity_replacesItems_whenProvided() {
        var target = sampleEntityWithItems(UUID.randomUUID());

        var src = new CreateInvoiceDto();
        src.setInvoiceNumber("FV/2025/01/03");
        src.setIssueDate(LocalDate.parse("2025-01-12"));
        src.setDueDate(LocalDate.parse("2025-02-15"));
        src.setBuyer(new BuyerDto("Buyer 2", "2222222222"));
        src.setItems(List.of(
                new InvoiceItemDto("Nowa pozycja", 3, new BigDecimal("700.00"))
        ));

        mapper.updateEntity(target, src);

        assertThat(target.getItems()).hasSize(1);
        assertThat(target.getItems().getFirst().getDescription()).isEqualTo("Nowa pozycja");
        assertThat(target.getItems().getFirst().getQuantity()).isEqualTo(3);
        assertThat(target.getItems().getFirst().getNetPrice()).isEqualByComparingTo(new BigDecimal("700.00"));
    }

    @Test
    @DisplayName("toDtoList: maps list of entities to list of DTOs preserving size/order")
    void toDtoList_preservesSizeAndOrder() {
        var e1 = sampleEntityWithItems(UUID.randomUUID());
        var e2 = sampleEntityWithItems(UUID.randomUUID());

        var list = mapper.toDtoList(List.of(e1, e2));

        assertThat(list).hasSize(2);
        assertThat(list.get(0).getId()).isEqualTo(e1.getId());
        assertThat(list.get(1).getId()).isEqualTo(e2.getId());
    }
}
