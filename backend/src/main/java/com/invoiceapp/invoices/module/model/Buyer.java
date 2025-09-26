package com.invoiceapp.invoices.module.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Embeddable
@Getter
@NoArgsConstructor()
@AllArgsConstructor
public class Buyer {
    @NotBlank
    private String name;
    private String NIP;
}