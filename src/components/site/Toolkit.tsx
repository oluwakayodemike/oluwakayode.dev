import { Braces, Database, Layers, Wrench, type LucideIcon } from "lucide-react";
import { toolkit } from "@/data/portfolio";
import { ToolIcon } from "@/components/site/toolkitIcons";

// one quiet mark per group, chosen so the shape reads differently at a glance.
const ICONS: Record<string, LucideIcon> = {
  braces: Braces,
  layers: Layers,
  database: Database,
  wrench: Wrench,
};

export function Toolkit() {
  return (
    <dl className="space-y-6">
      {toolkit.map((group) => {
        const Icon = ICONS[group.icon] ?? Braces;
        return (
          <div key={group.label}>
            <dt className="mb-3 flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
              <Icon
                size={13}
                strokeWidth={1.5}
                aria-hidden="true"
                className="shrink-0 opacity-70"
              />
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2" aria-label={group.label}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 bg-tag px-3 py-1.5 text-[0.8125rem] leading-5 text-tag-foreground transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <ToolIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
