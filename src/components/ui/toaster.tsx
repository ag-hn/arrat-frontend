"use client"

import { useToast } from "@/hooks/use-toaster"

import { Toast, ToastProvider, ToastViewport } from "@/components/ui/toast"

const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, ...props }) => {
        return <Toast key={id} {...props} />;
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

export { Toaster }
