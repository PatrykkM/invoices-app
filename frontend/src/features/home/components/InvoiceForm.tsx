"use client";

import { useFieldArray, useForm } from "react-hook-form";

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
import { InvoiceFormValues } from "../schemas/invoiceForm";
import {
  invoiceDateFields,
  invoiceTextFields,
} from "../config/invoiceFormConfig";
import IacText from "@/src/components/ui/IacText";
import { PlusIcon } from "lucide-react";
import { colors } from "@/src/theme/colors";
import { ImportFromJsonButton } from "./ImportFromJsonButton";
import { cn } from "@/src/lib/utils";

const defaultValues: InvoiceFormValues = {
  invoiceNumber: "",
  issueDate: undefined,
  dueDate: undefined,
  buyer: { name: "", NIP: "" },
  items: [{ description: "", quantity: 1, netPrice: 0 }],
};

export function InvoiceForm({
  invoiceForm,
}: {
  invoiceForm: ReturnType<typeof useForm<InvoiceFormValues>>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: invoiceForm.control,
    name: "items",
  });

  return (
    <div className="flex-1 border-r border-base200 p-6">
      <Form {...invoiceForm}>
        <form className="flex flex-col gap-6">
          <FormRow>
            {invoiceTextFields.map((field) => (
              <FormField
                key={field.name}
                control={invoiceForm.control}
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
          </FormRow>
          <FormRow>
            {invoiceDateFields.map((field) => (
              <FormField
                key={field.name}
                control={invoiceForm.control}
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
          </FormRow>

          <div className="flex flex-col gap-2 rounded-xl bg-base50 px-6 pt-6">
            <div className="flex flex-row items-center gap-4">
              <IacText
                className="flex-[2]"
                text="Description"
                color="base400"
                size="sm"
              />
              <IacText
                className="flex-1"
                text="Qty"
                color="base400"
                size="sm"
              />
              <IacText
                className="flex-1"
                text="Net price"
                color="base400"
                size="sm"
              />
              <div className="w-[90px]" />
            </div>
            {fields.map((fieldItem, index) => (
              <div key={fieldItem.id} className="flex gap-4">
                <FormField
                  control={invoiceForm.control}
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
                  control={invoiceForm.control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          step={1}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          className="border-base300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={invoiceForm.control}
                  name={`items.${index}.netPrice`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step="0.01"
                          value={field.value ?? ""}
                          onChange={field.onChange}
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
                  className="w-[90px] font-bold"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1 pb-2 pt-4">
              <button
                type="button"
                onClick={() =>
                  append({ description: "", quantity: 1, netPrice: 0 })
                }
                className="flex items-center justify-center self-center rounded-full bg-accent200 p-2 transition hover:bg-accent200/80"
              >
                <PlusIcon color={colors.base0} size={20} />
              </button>
              <IacText
                text="Add Item"
                weight="bold"
                color="accent200"
                size="sm"
              />
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No items yet. Click add item to start.
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <ImportFromJsonButton form={invoiceForm} />
            <div className="flex gap-2">
              <Button
                type="button"
                variant={"outline"}
                size={"lg"}
                className="self-start font-bold"
                onClick={() => invoiceForm.reset(defaultValues)}
              >
                Reset
              </Button>

              <Button
                type="button"
                variant={"accent"}
                size={"lg"}
                className="self-start font-bold"
                onClick={() => invoiceForm.handleSubmit(() => {})()}
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

type FormRowProps = React.HTMLAttributes<HTMLDivElement>;

export function FormRow({ className, children, ...props }: FormRowProps) {
  return (
    <div className={cn("flex flex-row gap-4", className)} {...props}>
      {children}
    </div>
  );
}
