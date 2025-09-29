package com.invoiceapp.invoices.app;

import com.invoiceapp.invoices.api.app.BusinessException;
import com.invoiceapp.invoices.api.app.InvoicesService;
import com.invoiceapp.invoices.api.web.InvoicesMapper;
import com.invoiceapp.invoices.api.web.dto.BuyerDto;
import com.invoiceapp.invoices.api.web.dto.CreateInvoiceDto;
import com.invoiceapp.invoices.api.web.dto.InvoiceItemDto;
import com.invoiceapp.invoices.module.model.Buyer;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import com.invoiceapp.invoices.module.repository.InvoiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvoicesServiceTest {

    @Mock InvoiceRepository repo;
    @Mock InvoicesMapper mapper;

    @InjectMocks InvoicesService service;

    private CreateInvoiceDto validDto;
    private InvoiceEntity mappedEntity;

    @BeforeEach
    void setUp() {
        validDto = new CreateInvoiceDto();
        validDto.setInvoiceNumber("FV/2025/01/01");
        validDto.setIssueDate(LocalDate.parse("2025-01-10"));
        validDto.setDueDate(LocalDate.parse("2025-01-25"));
        validDto.setBuyer(new BuyerDto("ABC Sp. z o.o.", "1234567890"));
        validDto.setItems(List.of(
                new InvoiceItemDto("Licencja", 2, new BigDecimal("500")),
                new InvoiceItemDto("Usługa", 1, new BigDecimal("1500"))
        ));

        mappedEntity = new InvoiceEntity();
        mappedEntity.setId(UUID.randomUUID());
        mappedEntity.setInvoiceNumber(validDto.getInvoiceNumber());
        mappedEntity.setIssueDate(validDto.getIssueDate());
        mappedEntity.setDueDate(validDto.getDueDate());
        mappedEntity.setBuyer(new Buyer("ABC Sp. z o.o.", "1234567890"));
    }

    @Test
    @DisplayName("createInvoice: happy path -> mapper.toEntity + repo.save")
    void createInvoice_happyPath() {
        when(mapper.toEntity(validDto)).thenReturn(mappedEntity);
        when(repo.save(mappedEntity)).thenReturn(mappedEntity);

        var result = service.createInvoice(validDto);

        assertThat(result).isSameAs(mappedEntity);
        verify(mapper).toEntity(validDto);
        verify(repo).save(mappedEntity);
        verifyNoMoreInteractions(mapper, repo);
    }

    @Test
    @DisplayName("createInvoice: dueDate < issueDate -> BusinessException")
    void createInvoice_businessRuleViolation() {
        var bad = new CreateInvoiceDto();
        bad.setInvoiceNumber("FV/X");
        bad.setIssueDate(LocalDate.parse("2025-01-10"));
        bad.setDueDate(LocalDate.parse("2025-01-05"));
        bad.setBuyer(new BuyerDto("ABC", "1234567890"));
        bad.setItems(List.of(new InvoiceItemDto("X", 1, new BigDecimal("1.00"))));

        var ex = assertThrows(BusinessException.class, () -> service.createInvoice(bad));
        assertThat(ex.getMessage()).contains("Due date cannot be before issue date");
        verifyNoInteractions(mapper, repo);
    }

    @Test
    @DisplayName("updateInvoice: found -> mapper.updateEntity on existing entity")
    void updateInvoice_happyPath() {
        var id = UUID.randomUUID();
        var existing = new InvoiceEntity();
        existing.setId(id);
        existing.setInvoiceNumber("FV/OLD");
        existing.setIssueDate(LocalDate.parse("2025-01-01"));
        existing.setDueDate(LocalDate.parse("2025-01-20"));
        existing.setBuyer(new Buyer("OLD", "111"));

        when(repo.findById(id)).thenReturn(Optional.of(existing));

        var result = service.updateInvoice(id, validDto);

        assertThat(result).isSameAs(existing);
        verify(repo).findById(id);
        verify(mapper).updateEntity(existing, validDto);
        verifyNoMoreInteractions(mapper, repo);
    }

    @Test
    @DisplayName("updateInvoice: not found -> NoSuchElementException")
    void updateInvoice_notFound() {
        var id = UUID.randomUUID();
        when(repo.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.updateInvoice(id, validDto));
        verify(repo).findById(id);
        verifyNoMoreInteractions(repo);
        verifyNoInteractions(mapper);
    }

    @Test
    @DisplayName("getAllInvoices: returns list from repository")
    void getAllInvoices_returnsList() {
        var e1 = new InvoiceEntity(); e1.setId(UUID.randomUUID());
        var e2 = new InvoiceEntity(); e2.setId(UUID.randomUUID());
        when(repo.findAll()).thenReturn(List.of(e1, e2));

        var list = service.getAllInvoices();

        assertThat(list).containsExactly(e1, e2);
        verify(repo).findAll();
        verifyNoMoreInteractions(repo);
        verifyNoInteractions(mapper);
    }

    @Test
    @DisplayName("getInvoiceById: found -> returns entity")
    void getInvoiceById_found() {
        var id = UUID.randomUUID();
        when(repo.findById(id)).thenReturn(Optional.of(mappedEntity));

        var result = service.getInvoiceById(id);

        assertThat(result).isSameAs(mappedEntity);
        verify(repo).findById(id);
        verifyNoMoreInteractions(repo);
        verifyNoInteractions(mapper);
    }

    @Test
    @DisplayName("getInvoiceById: not found -> NoSuchElementException")
    void getInvoiceById_notFound() {
        var id = UUID.randomUUID();
        when(repo.findById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.getInvoiceById(id));
        verify(repo).findById(id);
        verifyNoMoreInteractions(repo);
        verifyNoInteractions(mapper);
    }

    @Test
    @DisplayName("deleteInvoice: delegates to repo.deleteById")
    void deleteInvoice_callsRepo() {
        var id = UUID.randomUUID();

        service.deleteInvoice(id);

        verify(repo).deleteById(id);
        verifyNoMoreInteractions(repo);
        verifyNoInteractions(mapper);
    }
}
