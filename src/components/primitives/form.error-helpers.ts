import { type ComponentWithDefaultProps } from "@/types/utils";
import { useMemo, useState } from "react";

type ErrorOption = (Error | string)
export interface FormErrorsProps extends ComponentWithDefaultProps<HTMLOListElement> {
    errors: ErrorOption[]
}

export function useFormErrors() {
    const [errors, setErrors] = useState<ErrorOption[]>([])

    return useMemo(() => {
        return {
            errors,
            setErrors,
            replace: (...given: ErrorOption[]) => {
                setErrors(given)
            },
            add: (...given: ErrorOption[]) => {
                setErrors([...errors, ...given])
            },
            removeMany: (...given: ErrorOption[]) => {
                setErrors(errors.filter((e) => !given.includes(e)))
            },
            remove: (given: ErrorOption) => {
                setErrors(errors.filter((e) => e !== given))
            },
            clear: () => {
                setErrors([])
            },
        }
    }, [errors, setErrors])
}