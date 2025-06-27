"use client";

import { FormIsRequiredIcon } from "@/components/icons/icons";
import { LoadingTable } from "@/components/loading.table";
import { Link } from "@/components/next-view-transitions";
import { Button } from "@/components/primitives/button";
import { buttonVariants } from "@/components/primitives/button.variants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitives/form";
import { useFormErrors } from "@/components/primitives/form.error-helpers";
import { FormErrors } from "@/components/primitives/form.errors";
import { FormInput } from "@/components/primitives/form.input";
import { FormTextarea } from "@/components/primitives/form.text-area";
import { Placeholder } from "@/components/primitives/placeholder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { sessionFormDataSchema } from "../zod/schema.form";
import { columns } from "./data-table.config-unit";

const INTERNAL__GO_BACK_TEXT = "Go back";
const INTERNAL__SUBMIT_TEXT = "Submit";

const overrides = {
  footer: false,
  pagination: true,
};

export function WorkflowCreateSessionLoading() {
  const errorProps = useFormErrors();
  const form = useForm<z.infer<typeof sessionFormDataSchema>>({
    resolver: zodResolver(sessionFormDataSchema),
    defaultValues: {
      session_data: {
        id: '',
        name: ''
      },
      session_description: "",
      session_related_unit_ids: [],
    },
  });

  const goBackText = INTERNAL__GO_BACK_TEXT;
  const submitText = INTERNAL__SUBMIT_TEXT;

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="session_data"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-0.5">
                Session Name <FormIsRequiredIcon />
              </FormLabel>
              <FormControl>
                <FormInput
                  disabled
                  placeholder="Enter unique session identifier or name..."
                  type="text"
                  {...field}
                  value={field.value.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-0.5">
                Description <FormIsRequiredIcon />
              </FormLabel>
              <FormControl>
                <FormTextarea
                  disabled
                  placeholder="Descriptive definition of how to use and understand the session..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="session_related_unit_ids"
          render={({ }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-0.5">
                Associated Units <FormIsRequiredIcon />
              </FormLabel>
              <FormControl>
                <div>
                  <Placeholder className="h-20 w-full" />
                  <LoadingTable
                    columns={columns}
                    rowCount={4}
                    overrides={overrides}
                  />
                  <Placeholder className="mt-3 h-32 w-full" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormErrors {...errorProps} />

        <div className="flex flex-row justify-end gap-2">
          <Link
            href={"/session-manager/"}
            className={buttonVariants({ variant: "ghost" })}
          >
            {goBackText}
          </Link>

          <Button type="submit" disabled isLoading>
            {submitText}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
