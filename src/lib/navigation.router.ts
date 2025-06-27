import { useTransitionRouter } from "@/components/next-view-transitions";
import { type NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const useRouter = () => {
  const router = useTransitionRouter()

  return {
    ...router,
    navigateAndReplaceHistory: (href: string, options?: NavigateOptions) => {
      router.refresh();
      router.replace(href, options);
    }
  }
}

