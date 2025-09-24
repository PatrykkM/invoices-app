"use client";

import { useFieldArray, useForm } from "react-hook-form";
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
import IacText from "@/src/components/ui/IacText";
import { PlusIcon } from "lucide-react";
import { colors } from "@/src/theme/colors";

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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <div className="border-base200 flex-1 border-r p-6">
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
                  <FormItem className="flex w-full max-w-[290px] flex-col">
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
          <div className="bg-base50 flex flex-col gap-2 rounded-xl px-6 pt-6">
            <div className="flex flex-row items-center gap-4">
              <IacText
                className="flex-[2]"
                text="Description"
                color="base400"
              />
              <IacText className="flex-1" text="Qty" color="base400" />
              <IacText className="flex-1" text="Net price" color="base400" />
              <div className="w-[90px]" />
            </div>
            {fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="flex gap-4">
                <FormField
                  control={form.control}
                  name={`items.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="flex flex-[2] flex-col">
                      <FormControl>
                        <Input
                          placeholder="Item description"
                          className="border-base300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          className="border-base300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`items.${index}.netPrice`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          className="border-base300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="w-[90px]"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 pb-2 pt-4">
              <button
                type="button"
                onClick={() =>
                  append({ description: "", quantity: 1, netPrice: 100 })
                }
                className="bg-accent200 hover:bg-accent200/80 flex items-center justify-center self-center rounded-full p-3 transition"
              >
                <PlusIcon color={colors.base0} size={20} />
              </button>
              <IacText text="Add Item" weight="bold" color="accent200" />
            </div>

            {fields.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No items yet. Click add item to start.
              </p>
            )}
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
