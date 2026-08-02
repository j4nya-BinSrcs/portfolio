import { Clock, Languages, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

const stats = [
  { icon: MapPin, label: "Location", value: profile.location },
  { icon: Clock, label: "Timezone", value: profile.timezone },
  { icon: Languages, label: "Languages", value: profile.languages.join(" · ") },
];

export default function InfoCard() {
  return (
    <div className="flex items-stretch divide-x divide-line rounded-2xl border border-line bg-panel/80 px-2">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
          <Icon className="h-4 w-4 shrink-0 text-mute" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-mute">
              {label}
            </p>
            <p className="truncate text-sm font-medium text-soft">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
