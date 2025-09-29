package com.invoiceapp.invoices.module.repository;

import com.invoiceapp.invoices.module.model.Buyer;
import com.invoiceapp.invoices.module.model.InvoiceEntity;
import com.invoiceapp.invoices.module.model.InvoiceItem;
import jakarta.persistence.EntityManager;
import jakarta.validation.ConstraintViolationException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class InvoiceRepositoryTest {

    @Autowired
    InvoiceRepository repo;

    @Autowired
    EntityManager em;

    private InvoiceEntity sample() {
        var inv = new InvoiceEntity();
        inv.setInvoiceNumber("FV/2025/01/01");
        inv.setIssueDate(LocalDate.parse("2025-01-10"));
        inv.setDueDate(LocalDate.parse("2025-01-25"));
        inv.setBuyer(new Buyer("ABC Sp. z o.o.", "1234567890"));
        return inv;
    }

    private InvoiceEntity sampleWithItems() {
        var inv = sample();
        inv.setItems(new ArrayList<>(List.of(
                new InvoiceItem("Licencja", 2, new BigDecimal("500.00")),
                new InvoiceItem("Usługa", 1, new BigDecimal("1500.00"))
        )));
        return inv;
    }

    @Test
    @DisplayName("save -> findById: entity with items should be saved and fetched correctly")
    void saveAndFind_withItems() {
        var saved = repo.saveAndFlush(sampleWithItems());
        em.clear();

        var found = repo.findById(saved.getId()).orElseThrow();

        assertThat(found.getInvoiceNumber()).isEqualTo("FV/2025/01/01");
        assertThat(found.getBuyer().getName()).isEqualTo("ABC Sp. z o.o.");

        assertThat(found.getItems()).hasSize(2);
        assertThat(found.getItems())
                .extracting(InvoiceItem::getDescription)
                .containsExactlyInAnyOrder("Licencja", "Usługa");

        assertThat(found.getItems().getFirst().getNetPrice())
                .isEqualByComparingTo(new BigDecimal("500.00"));
    }

    @Test
    @DisplayName("update: changing dueDate and replacing items collection should persist changes")
    void update_basicAndItems() {
        var saved = repo.saveAndFlush(sampleWithItems());

        saved.setDueDate(LocalDate.parse("2025-02-01"));
        var newItems = new ArrayList<>(List.of(
                new InvoiceItem("Nowa pozycja", 3, new BigDecimal("700.00"))
        ));
        saved.setItems(newItems);

        var updated = repo.saveAndFlush(saved);
        em.clear();

        var found = repo.findById(updated.getId()).orElseThrow();

        assertThat(found.getDueDate()).isEqualTo(LocalDate.parse("2025-02-01"));
        assertThat(found.getItems()).hasSize(1);
        assertThat(found.getItems().getFirst().getDescription()).isEqualTo("Nowa pozycja");
        assertThat(found.getItems().getFirst().getQuantity()).isEqualTo(3);
        assertThat(found.getItems().getFirst().getNetPrice())
                .isEqualByComparingTo(new BigDecimal("700.00"));
    }

    @Test
    @DisplayName("deleteById: should remove record along with its items")
    void deleteById_removesRowAndItems() {
        var saved = repo.saveAndFlush(sampleWithItems());
        var id = saved.getId();

        repo.deleteById(id);
        repo.flush();

        assertThat(repo.findById(id)).isEmpty();
    }

    @Test
    @DisplayName("constraints: null invoiceNumber should trigger ConstraintViolationException (@NotBlank)")
    void nullInvoiceNumber_violatesNotNull() {
        var inv = sampleWithItems();
        inv.setInvoiceNumber(null);

        assertThatThrownBy(() -> repo.saveAndFlush(inv))
                .isInstanceOf(ConstraintViolationException.class)
                .hasMessageContaining("must not be blank");
    }

    @Test
    @DisplayName("constraints: null issueDate should trigger DataIntegrityViolationException (DB NOT NULL)")
    void nullIssueDate_violatesDbNotNull() {
        var inv = sampleWithItems();
        inv.setIssueDate(null);

        assertThatThrownBy(() -> repo.saveAndFlush(inv))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("update: replacing items with empty list should leave no rows in collection table")
    void update_replaceItemsWithEmptyList() {
        var saved = repo.saveAndFlush(sampleWithItems());

        saved.setItems(new ArrayList<>());
        repo.saveAndFlush(saved);
        em.clear();

        var found = repo.findById(saved.getId()).orElseThrow();
        assertThat(found.getItems()).isEmpty();
    }
}
