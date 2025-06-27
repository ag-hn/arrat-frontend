"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { useSessionAndAuditParams } from '@/features/session-viewer/hooks/audit/use-audit-path-params';
import { useConstants } from '@/features/session-viewer/hooks/frames/use-constants';
import { useAuditFrameQueryParams } from '@/features/session-viewer/hooks/use-audit-frame-query-params';
import { useCurrentSessionDetails } from '@/features/session-viewer/hooks/viewer/use-session-list';
import { extractUnit } from '@/lib/audit-utils';
import { cn } from '@/lib/utils';
import { INTERNAL__getUnitImageUrlGivenBase } from '@/server/aws/shared';
import Image from 'next/image';

export function SignImages({
  className,
  timestamp,
}: {
  className?: string,
  timestamp: string
}) {
  const { set } = useAuditFrameQueryParams()
  const params = useSessionAndAuditParams()
  const auditKey = params.id?.param ?? ''

  const { data: constants } = useConstants()
  const { data: details, isLoading, error } = useCurrentSessionDetails()

  if (error) {
    return null
  }

  if (isLoading) {
    return (
      <div className={cn("flex flex-wrap justify-center md:justify-start gap-2", className)}>
        <Skeleton className='aspect-video h-64' />
      </div>
    )
  }

  if (!constants || !details?.files || !auditKey || !timestamp) {
    return null
  }

  const unit = extractUnit(auditKey)
  if (!unit) {
    return null
  }

  const url = INTERNAL__getUnitImageUrlGivenBase(constants.serverImagesUrl, details.files, params.session, unit, timestamp)

  return (
    <div className={cn("flex flex-wrap justify-center md:justify-start gap-2", className)}>
      <button
        key={timestamp}
        onClick={() => set(timestamp)}
        className={'aspect-video max-h-64'}
      >
        <Image
          alt="Product image"
          className="rounded-md object-cover animate-in fade-in duration-500"
          blurDataURL="/mock/placeholder.png"
          placeholder="blur"
          height="800"
          src={url}
          width="800"
        />
      </button>
    </div>
  );
}

