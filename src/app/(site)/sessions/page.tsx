import { ForceSessionRedirect } from '@/features/session-viewer/components/force-session-redirect';

export const dynamic = "force-dynamic"

export default async function SessionsPage() {
  return (
    <div className="container grid place-items-center gap-8 px-4 py-8 h-full">
      <ForceSessionRedirect />
    </div>
  );
}

