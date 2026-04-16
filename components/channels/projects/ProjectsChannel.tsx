import { ProjectMessage } from "@/components/channels/projects/ProjectMessage"
import { projects } from "@/lib/data"

// Extend projects with optional media fields
// Add modelSrc/videoSrc to lib/data.ts project entries when assets are ready
const TIMESTAMPS = ['Today at 12:00 AM', 'Today at 12:01 AM', 'Today at 12:02 AM']

export function ProjectsChannel() {
  return (
    <div className="flex flex-col gap-2 py-4">
      {projects.map((project, i) => (
        <ProjectMessage
          key={project.title}
          project={project}
          timestamp={TIMESTAMPS[i] ?? 'Today at 12:00 AM'}
        />
      ))}
    </div>
  )
}
