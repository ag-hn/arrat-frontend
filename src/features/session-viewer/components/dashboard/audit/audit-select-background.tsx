"use client"


import { usePrimaryImageSegment } from '@/features/session-viewer/hooks/frames/segment.use-primary-image';
import { isAppSignFeature } from '@/lib/audit-utils';
import { cn } from '@/lib/utils';
import { type AppFeatureOption } from '@/server/zod/schema.audit';
import type { ComponentClassName } from '@/types/utility';
import { SharedImageDisplay } from './feature/shared.image-display';

export function AuditSelectBackground({ className, children, feature }: ComponentClassName & { feature: AppFeatureOption }) {
  return (
    <div className={cn("group top-0 left-0 absolute w-full h-full grid place-items-center", className)}>
      <AuditSelectBackgroundInternal feature={feature} >
        {children}
      </AuditSelectBackgroundInternal>
    </div>

  )
}

function AuditSelectBackgroundInternal({
  children,
  feature,
}: ComponentClassName & { feature: AppFeatureOption }) {
  const {
    url,
    res: { isLoading, error }
  } = usePrimaryImageSegment(feature, isAppSignFeature(feature) ? feature.properties.timestamp : undefined)

  return (
    <>
      <SharedImageDisplay
        className="absolute w-full"
        src={url}
        isLoading={isLoading}
        error={error}
        priority
        loading='eager'
        width={400}
        height={200} />

      {children}

      {/** Gradient Overlay */}
      <div className="transition-all cursor-pointer duration-500 absolute rounded-md w-full h-full bg-gradient-to-t from-slate-800/45 via-slate-800/25 to-slate-800/0" >
        <div className="opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-t from-slate-800/45 via-slate-800/25 to-slate-800/0"></div>
      </div>
    </>
  )
}
