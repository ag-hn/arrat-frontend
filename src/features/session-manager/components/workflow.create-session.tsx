"use client";

import { FormIsRequiredIcon } from "@/components/icons/icons";
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
import { FormTextarea } from "@/components/primitives/form.text-area";
import { toast } from "@/hooks/use-toaster";
import { useRouter } from "@/lib/navigation.router";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type TransformedUnitsGroupingList } from "../types/transformers";
import { sessionFormDataSchema } from "../zod/schema.form";
import { FormSelectRelatedUnits } from "./form.select-related-units";
import { FormItemSessionData } from "./form.item-session-data";

const INTERNAL__GO_BACK_TEXT = "Go back";
const INTERNAL__SUBMIT_TEXT = "Submit";

export function WorkflowCreateSession({
  data,
  defaultColumnFilters,
  defaultGlobalFilter,
}: {
  data: TransformedUnitsGroupingList;
  defaultColumnFilters: ColumnFiltersState;
  defaultGlobalFilter: unknown;
}) {
  const { mutate, isLoading } = api.manager.sessionCreate.useMutation({
    onSuccess: () => {
      toast({
        duration: 10000,
        variant: "success",
        title: "Session Pipeline Started",
        description: <>This process may <i>take a while</i>, so check back later to view the new session in the list.</>,
      });

      control._reset();
      router.push("/session-manager/");
    },
    onError: (e) => {
      toast({
        duration: 10000,
        variant: "error",
        title: "Unable to Create Session",
        description: (<div>
          <span>{e.message ?? "Unable to create your session at this time. Try again at a later time. If this error persists, contact your system administrator."}</span>
        </div>),
      });
    },
    onMutate: () => {
      control._disableForm(true);
    },
    onSettled: () => {
      control._disableForm(false);
    },
  });

  const errorProps = useFormErrors();
  const router = useRouter();
  const form = useForm<z.infer<typeof sessionFormDataSchema>>({
    resolver: zodResolver(sessionFormDataSchema),
    defaultValues: {
      session_data: {
        id: "",
        name: "",
      },
      session_description: "",
      session_related_unit_ids: [],
    },
  });

  const {
    formState: { isSubmitting, isDirty, isValid },
    control,
  } = form;

  const goBackText = INTERNAL__GO_BACK_TEXT;
  const submitText = INTERNAL__SUBMIT_TEXT;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          mutate(values);
        })}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="session_data"
          render={({ field }) => (
            <FormItemSessionData {...field} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex flex-row gap-0.5">
                Associated Units <FormIsRequiredIcon />
              </FormLabel>
              <FormControl>
                <Suspense>
                  <FormSelectRelatedUnits 
                    {...field}
                    data={data}
                    defaultColumnFilters={defaultColumnFilters}
                    defaultGlobalFilter={defaultGlobalFilter}
                  />
                </Suspense>
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

          <Button
            type="submit"
            disabled={isSubmitting || isLoading || !isDirty || !isValid}
            isLoading={isSubmitting || isLoading}
          >
            {submitText}{" "}
          </Button>
        </div>
      </form>
    </Form>
  );
}
