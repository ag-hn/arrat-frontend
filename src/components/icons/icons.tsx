import { cn } from "@/lib/utils";
import {
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
  CopyIcon,
  Cross2Icon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  DownloadIcon,
  ExclamationTriangleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PaperPlaneIcon,
  PlusCircledIcon,
  PlusIcon,
  Share1Icon,
  SizeIcon,
  TwitterLogoIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { AsteriskIcon } from "lucide-react";
import { type SVGAttributes } from "react";

export const Icons = {
  logo: (props: IconProps) => <PaperPlaneIcon {...props} />,
  brands: {
    twitter: (props: IconProps) => <TwitterLogoIcon {...props} />,
  },
  actions: {
    close: (props: IconProps) => <Cross2Icon {...props} />,
    more: (props: IconProps) => <DotsVerticalIcon {...props} />,
    moreHorizontal: (props: IconProps) => <DotsHorizontalIcon {...props} />,
    copy: (props: IconProps) => <CopyIcon {...props} />,
    share: (props: IconProps) => <Share1Icon {...props} />,
    download: (props: IconProps) => <DownloadIcon {...props} />,
    upload: (props: IconProps) => <UploadIcon {...props} />,
    full: (props: IconProps) => <SizeIcon {...props} />,
    next: (props: IconProps) => <ChevronRightIcon {...props} />,
    previous: (props: IconProps) => <ChevronLeftIcon {...props} />,
  },
  scroll: {
    left: (props: IconProps) => <ChevronLeftIcon {...props} />,
    right: (props: IconProps) => <ChevronRightIcon {...props} />,
  },
  input: {
    error: (props: IconProps) => <ExclamationTriangleIcon {...props} />,
    append: (props: IconProps) => <PlusCircledIcon {...props} />,
    selected: (props: IconProps) => <CheckIcon {...props} />,
    passwordVisible: (props: IconProps) => <EyeOpenIcon {...props} />,
    passwordHidden: (props: IconProps) => <EyeClosedIcon {...props} />,
    plus: (props: IconProps) => <PlusIcon {...props} />,
    minus: (props: IconProps) => <MinusIcon {...props} />,
    search: (props: IconProps) => <MagnifyingGlassIcon {...props} />,
    expand: (props: IconProps) => <ChevronDownIcon {...props} />,
  },
  contextMenu: {
    radioSelected: (props: IconProps) => <CircleIcon {...props} />,
    checkSelected: (props: IconProps) => <CheckIcon {...props} />,
    more: (props: IconProps) => <ChevronRightIcon {...props} />,
  },
  alerts: {
    error: (props: IconProps) => <ExclamationTriangleIcon {...props} />,
    success: (props: IconProps) => <CheckCircledIcon {...props} />,
    default: (props: IconProps) => <InfoCircledIcon {...props} />,
  },
  delta: {
    increase: (props: IconProps) => <ArrowUpIcon {...props} />,
    moderateIncrease: (props: IconProps) => <ArrowTopRightIcon {...props} />,
    unchanged: (props: IconProps) => <ArrowRightIcon {...props} />,
    moderateDecrease: (props: IconProps) => <ArrowBottomRightIcon {...props} />,
    decrease: (props: IconProps) => <ArrowDownIcon {...props} />,
  },
  loading: ({ className, ...props }: SVGAttributes<unknown>) => (
    <svg
      aria-hidden="true"
      className={cn("size-4 animate-spin fill-stone-600 text-stone-200", className)}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>

  )
} as const;


export const FormIsRequiredIcon = ({ className, ...props}: SVGAttributes<unknown>) => <AsteriskIcon className={cn("text-destructive size-3", className)} {...props} />

export { 
  CalendarIcon, 
  SlashIcon as DashIcon, 
  RotateCcwIcon as ResetIcon,
} from "lucide-react"

export { 
  ChevronLeftIcon as PreviousMonthIcon,
  ChevronRightIcon as NextMonthIcon,
  ChevronsLeftIcon as PreviousYearIcon,
  ChevronsRightIcon as NextYearIcon,
} from "lucide-react"

export { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CheckIcon as IsSelectedIcon, 
  ChevronDownIcon as ScrollDownIcon 
} from "lucide-react"

export {
  PlusIcon as AccordionOpenIcon,
} from "lucide-react"

/** CheckboxIcons */
export {
  CheckIcon as CheckboxCheckIcon,
  MinusIcon as CheckboxIndeterminateIcon,
} from 'lucide-react'

