"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type SkillItem as SkillItemType } from "@/app/schemas/resume";

interface SkillItemProps {
  skill: SkillItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export function SkillItem({ skill, onEdit, onDelete }: SkillItemProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500";
      case "Intermediate":
        return "bg-green-500";
      case "Advanced":
        return "bg-purple-500";
      case "Expert":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{skill.name}</h4>
            <Badge variant="secondary">{skill.category}</Badge>
            <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
          </div>
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
      </CardContent>
    </Card>
  );
}
