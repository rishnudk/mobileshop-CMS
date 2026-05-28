import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  "In Progress": "bg-sky-100 text-sky-800 hover:bg-sky-100",
  "Waiting Parts": "bg-violet-100 text-violet-800 hover:bg-violet-100",
  Completed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  Available: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  Busy: "bg-rose-100 text-rose-800 hover:bg-rose-100",
  "Off Duty": "bg-slate-200 text-slate-700 hover:bg-slate-200",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <Badge className={cn("rounded-full border-0 px-3 py-1 text-xs font-medium", statusStyles[value])}>
      {value}
    </Badge>
  );
}
