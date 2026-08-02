import type { ReactNode } from "react";
import { Clock, Languages, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 px-5 first:pl-0 last:pr-0">
      <div className="flex items-center gap-2 text-mute">{icon}</div>
      <p className="text-[11px] font-medium uppercase tracking-wider text-mute">
        {label}
      </p>
      <p className="text-sm font-medium text-soft">{value}</p>
    </div>
  );
}

export default function InfoCard() {
  return (
    <div className="grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-panel/80 px-5 py-4 shadow-[0_1px_0_0_rgba(246,242,232,0.03)_inset] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <Stat
        icon={<MapPin className="h-4 w-4" aria-hidden="true" />}
        label="Location"
        value={profile.location}
      />
      <Stat
        icon={<Clock className="h-4 w-4" aria-hidden="true" />}
        label="Timezone"
        value={profile.timezone}
      />
      <Stat
        icon={<Languages className="h-4 w-4" aria-hidden="true" />}
        label="Languages"
        value={profile.languages.join(" · ")}
      />
    </div>
  );
}
