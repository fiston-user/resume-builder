"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type ProjectItem as ProjectItemType } from "@/app/schemas/resume";

interface ProjectItemProps {
  project: ProjectItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectItem({ project, onEdit, onDelete }: ProjectItemProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{project.name}</h4>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <LinkIcon className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {project.role} •{" "}
              {project.current
                ? `${project.startDate} - Present`
                : `${project.startDate} - ${project.endDate}`}
            </p>
            <p className="text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            {project.highlights.length > 0 && (
              <ul className="text-sm list-disc list-inside space-y-1">
                {project.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
