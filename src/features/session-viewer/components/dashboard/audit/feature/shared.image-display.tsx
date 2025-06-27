import { cn } from "@/lib/utils";
import { type ImageProps } from "next/image";
import Image from 'next/image'

export function SharedImageDisplay({
  isLoading = false,
  error = undefined,
  src,
  className,
  alt,
  ...rest
}: Omit<ImageProps, 'src' | 'alt'> & {
  isLoading?: boolean,
  error?: unknown,
  src?: string,
  alt?: string,
}) {
  if (!src || isLoading || error) {
    return (
      <Image
        alt={alt ?? "Feature image taken from road audit session"}
        className={cn(
          "aspect-video w-full rounded-md object-cover animate-pulse transition-all",
          className
        )}
        blurDataURL='/mock/placeholder.svg'
        placeholder='blur'
        src="/mock/placeholder.svg"
        {...rest}
      />
    )
  }

  return (
    <Image
      alt={alt ?? "Feature image taken from road audit session"}
      className={cn(
        "aspect-square w-full h-full rounded-md object-cover animate-in fade-in duration-500",
        className
      )}
      blurDataURL="/mock/placeholder.svg"
      placeholder="blur"
      src={src ?? "/mock/placeholder.svg"}
      {...rest}
    />
  )
}
