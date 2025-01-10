"use client";

import { EducationItem as EducationItemType } from "@/app/schemas/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit2, Trash2 } from "lucide-react";

interface EducationItemProps {
  education: EducationItemType;
  onEdit: () => void;
  onDelete: () => void;
}

export function EducationItem({
  education,
  onEdit,
  onDelete,
}: EducationItemProps) {
  const dateRange = education.current
    ? `${education.startDate} - Present`
    : `${education.startDate} - ${education.endDate}`;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{education.school}</h3>
            <p className="text-muted-foreground">
              {education.degree} in {education.field}
            </p>
            <p className="text-sm text-muted-foreground">
              {education.location} • {dateRange}
              {education.gpa && ` • GPA: ${education.gpa}`}
            </p>
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

        {education.description && (
          <p className="text-sm mb-4">{education.description}</p>
        )}

        {education.achievements.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h4 className="font-medium mb-2">Achievements & Activities</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {education.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
