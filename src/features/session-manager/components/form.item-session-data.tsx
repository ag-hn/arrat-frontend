import { FormIsRequiredIcon } from "@/components/icons/icons";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/primitives/form";
import { FormInput } from "@/components/primitives/form.input";
import { InformationToken } from "@/components/primitives/information-token";
import React, { type ChangeEvent } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import {
  type AppSessionDataFormData,
  type AppSessionFormData,
} from "../zod/schema.form";

/**
 * Validates and transforms a session name string by removing specified invalid characters.
 * 
 * __MATCHES SERVER LOGIC__
 * 
 * @param {string} given - The input session name to validate and transform.
 * @param {string[]} [invalidChars=[' ', ':', ';', '/', '\', '|', ',', '(', ')']] - An array of characters to remove from the string.
 * @returns {{error: string}|string} Returns an error object if invalid, otherwise the transformed string.
 */
export function replaceCharacters(given: string, ...invalidChars: string[]) {
  const chars = !invalidChars || invalidChars.length === 0 ? [' ', ':', ';', '/', '\\', '|', ',', '(', ')'] : invalidChars
  const escaped = chars.map(c => c.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('');
  const regex = new RegExp(`[${escaped}]`, 'g');
  return given.replace(regex, '');
}

export function FormItemSessionData({
  onChange: onChangeProp,
  value,
  ...props
}: ControllerRenderProps<AppSessionFormData, "session_data">) {
  const onChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const transformed = {
        id: replaceCharacters(e.target.value),
        name: e.target.value,
      } satisfies AppSessionDataFormData;

      onChangeProp(transformed);
    },
    [onChangeProp],
  );

  return (
    <FormItem>
      <FormLabel className="flex flex-row gap-0.5">
        Session Name <FormIsRequiredIcon />
      </FormLabel>
      <FormControl>
        <FormInput
          placeholder="Enter unique session identifier or name..."
          type="text"
          onChange={onChange}
          value={value.name}
          {...props}
        />
      </FormControl>

      <FormMessage />

      <span className="flex flex-row items-center gap-1 text-xs text-muted-foreground">
        <InformationToken
          iconBefore
          content={
            <React.Fragment>
              <p>Session Ids</p>
              <p className="text-xs">
                The unique identifier for the session to create. This value
                remove all illegal characters and cannot be shared between
                sessions.
              </p>
              <p className="text-sm">
                <span>Allowed: </span>
                {" "}<span className="font-semibold">A-z, 0-9, and .-_</span>
              </p>
            </React.Fragment>
          }
        >
          Session id
        </InformationToken>
        : {value.id}
      </span>
    </FormItem>
  );
}
