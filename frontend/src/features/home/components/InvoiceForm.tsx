"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/ui/datePicker";
import { invoiceFormSchema, InvoiceFormValues } from "../schemas/invoiceForm";
import {
  invoiceDateFields,
  invoiceTextFields,
} from "../config/invoiceFormConfig";

export function InvoiceForm() {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: "",
      invoiceDate: new Date(),
      dueDate: new Date(),
      buyer: { name: "", NIP: "" },
      items: [{ description: "", quantity: 1, netPrice: 0.01 }],
    },
  });

  return (
    <div className="flex-1">
      <Form {...form}>
        <form className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            {invoiceTextFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: rhfField }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={field.placeholder} {...rhfField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex flex-row gap-4">
            {invoiceDateFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: rhfField }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={rhfField.value}
                        onChange={rhfField.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
