import { ArrowRight, CircuitBoard } from "lucide-react";

interface ProjectSignalMapProps {
  nodes: string[];
  title: string;
}

export function ProjectSignalMap({ nodes, title }: ProjectSignalMapProps) {
  return (
    <div className="project-signal-map" aria-label={title}>
      <div className="grid gap-3 md:grid-cols-4">
        {nodes.map((node, index) => (
          <div key={node} className="relative">
            <div className="project-signal-map__node">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F4F8FC] text-[#4F9CF9]">
                <CircuitBoard aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="balanced-text text-sm font-semibold leading-5 text-[#1F2933]">{node}</span>
            </div>
            {index < nodes.length - 1 ? (
              <ArrowRight
                aria-hidden="true"
                className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#7AA2F7] md:block"
                strokeWidth={1.8}
              />
            ) : null}
          </div>
        ))}
      </div>
      <svg viewBox="0 0 720 120" className="mt-8 h-auto w-full text-[#4F9CF9]/42" fill="none" aria-hidden="true">
        <path className="signal-trace" d="M20 62H150C190 62 190 28 230 28H380" />
        <path className="signal-trace signal-trace--slow" d="M420 62H560C600 62 600 92 640 92H700" />
        <path className="signal-wave" d="M40 98C74 62 108 134 142 98C176 62 210 134 244 98C278 62 312 134 346 98" />
      </svg>
    </div>
  );
}
