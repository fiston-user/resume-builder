"use client";

import { WorkExperienceItem as WorkExperienceItemType } from "@/app/schemas/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2 } from "lucide-react";

interface WorkExperienceItemProps {
  experience: WorkExperienceItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkExperienceItem({
  experience,
  onEdit,
  onDelete,
}: WorkExperienceItemProps) {
  const dateRange = experience.current
    ? `${experience.startDate} - Present`
    : `${experience.startDate} - ${experience.endDate}`;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{experience.position}</h3>
            <p className="text-muted-foreground">
              {experience.company} • {experience.location}
            </p>
            <p className="text-sm text-muted-foreground">{dateRange}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm mb-4">{experience.description}</p>

        {experience.highlights.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h4 className="font-medium mb-2">Key Achievements</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {experience.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
