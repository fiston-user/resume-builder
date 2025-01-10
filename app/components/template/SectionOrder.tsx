"use client";

import {
  useSectionOrder,
  type SectionType,
} from "@/context/SectionOrderContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableItemProps {
  id: string;
  title: string;
  visible: boolean;
  onToggle: () => void;
}

function SortableItem({ id, title, visible, onToggle }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative", isDragging && "z-50")}
    >
      <div
        className={cn(
          "flex items-center justify-between p-4 bg-white border rounded-lg",
          isDragging && "shadow-lg"
        )}
      >
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:text-primary"
          >
            <GripVertical className="h-5 w-5" />
          </button>
          <Label className="cursor-pointer" onClick={onToggle}>
            {title}
          </Label>
        </div>
        <Switch checked={visible} onCheckedChange={onToggle} />
      </div>
    </div>
  );
}

export function SectionOrder() {
  const { sections, setSections, toggleSection } = useSectionOrder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // @ts-expect-error - TODO: fix this
      setSections((items: any[]) => {
        const oldIndex = items.findIndex(
          (item: { id: UniqueIdentifier }) => item.id === active.id
        );
        const newIndex = items.findIndex(
          (item: { id: UniqueIdentifier }) => item.id === over.id
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Card className="p-4">
      <Label className="mb-4 block">Section Order & Visibility</Label>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sections.map((section) => (
              <SortableItem
                key={section.id}
                id={section.id}
                title={section.title}
                visible={section.visible}
                onToggle={() => toggleSection(section.id as SectionType)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Card>
  );
}
