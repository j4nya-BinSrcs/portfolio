import { Clock, Languages, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site.config";

const stats = [
  { icon: MapPin, label: "Location", value: siteConfig.location },
  { icon: Clock, label: "Timezone", value: siteConfig.timezone },
  {
    icon: Languages,
    label: "Languages",
    value: siteConfig.languages.join(" · "),
  },
];

export default function InfoCard() {
  return (
    <div className="flex items-stretch divide-x divide-line rounded-2xl border border-line bg-panel/80 px-3">
      {stats.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3"
        >
          <Icon className="h-4 w-4 shrink-0 text-mute" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-mute">
              {label}
            </p>
            <p className="text-[13px] font-medium leading-snug text-soft">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
