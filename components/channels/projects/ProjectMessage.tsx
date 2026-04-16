import { Message } from "@/components/ui/Message"
import { Embed } from "@/components/ui/Embed"
import { ModelViewer } from "@/components/channels/projects/ModelViewer"
import { VideoEmbed } from "@/components/channels/projects/VideoEmbed"
import type { Project } from "@/lib/data"

interface ProjectMessageProps {
  project: Project & {
    modelSrc?: string
    modelPoster?: string
    videoSrc?: string
    videoPoster?: string
    videoTitle?: string
  }
  timestamp: string
}

export function ProjectMessage({ project, timestamp }: ProjectMessageProps) {
  return (
    <Message
      authorName="Samuel Zhu"
      authorInitials="SZ"
      authorColor="#5865f2"
      timestamp={timestamp}
    >
      <Embed
        title={project.title}
        description={project.description}
        color={project.featured ? '#5865f2' : '#4e5058'}
        footer={project.context + (project.status === 'coming-soon' ? ' · Coming Soon' : '')}
      >
        {project.highlights.length > 0 && (
          <ul className="text-sm flex flex-col gap-1 my-1" style={{ color: 'var(--dc-text-muted)' }}>
            {project.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: 'var(--dc-blurple)', flexShrink: 0 }}>•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'var(--dc-bg-primary)', color: 'var(--dc-text-normal)' }}>
              {t}
            </span>
          ))}
        </div>
      </Embed>

      {/* 3D model viewer */}
      {(project.modelSrc !== undefined || project.status !== 'coming-soon') && (
        <ModelViewer
          src={project.modelSrc}
          poster={project.modelPoster}
          alt={project.title + ' 3D model'}
        />
      )}

      {/* Video embed */}
      {project.videoSrc && (
        <VideoEmbed
          src={project.videoSrc}
          poster={project.videoPoster}
          title={project.videoTitle ?? project.title + ' demo'}
        />
      )}
    </Message>
  )
}
