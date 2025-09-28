package com.invoiceapp.invoices.api.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BuyerDto
{
    @NotBlank(message = "Buyer name is required")
    private String name;

    @NotBlank(message = "NIP is required")
    @JsonProperty("NIP")
    private String NIP;
}
