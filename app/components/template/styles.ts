import { type TemplateType, type ColorScheme } from "@/context/TemplateContext";
import { cn } from "@/lib/utils";

interface StyleConfig {
  container: string;
  header: {
    title: string;
    subtitle: string;
  };
  section: {
    container: string;
    title: string;
    content: string;
  };
  text: {
    normal: string;
    muted: string;
  };
}

const baseStyles: StyleConfig = {
  container: "space-y-6",
  header: {
    title: "text-2xl font-bold",
    subtitle: "text-sm space-y-1",
  },
  section: {
    container: "space-y-4",
    title: "text-lg font-semibold mb-2",
    content: "space-y-4",
  },
  text: {
    normal: "text-sm",
    muted: "text-sm text-muted-foreground",
  },
};

const templateStyles: Record<TemplateType, StyleConfig> = {
  modern: {
    ...baseStyles,
    container: cn(baseStyles.container, "max-w-[210mm] mx-auto"),
    header: {
      title: cn(baseStyles.header.title, "tracking-tight"),
      subtitle: cn(baseStyles.header.subtitle, "text-muted-foreground"),
    },
    section: {
      ...baseStyles.section,
      title: cn(baseStyles.section.title, "border-b pb-1"),
    },
    text: baseStyles.text,
  },
  classic: {
    ...baseStyles,
    container: cn(baseStyles.container, "max-w-[210mm] mx-auto px-8"),
    header: {
      title: cn(baseStyles.header.title, "text-center uppercase tracking-wide"),
      subtitle: cn(baseStyles.header.subtitle, "text-center"),
    },
    section: {
      ...baseStyles.section,
      title: cn(
        baseStyles.section.title,
        "uppercase tracking-wide text-center"
      ),
    },
    text: baseStyles.text,
  },
  minimal: {
    ...baseStyles,
    container: cn(baseStyles.container, "max-w-[210mm] mx-auto"),
    header: {
      title: cn(baseStyles.header.title, "font-normal"),
      subtitle: baseStyles.header.subtitle,
    },
    section: {
      ...baseStyles.section,
      title: cn(baseStyles.section.title, "font-medium text-base uppercase"),
    },
    text: {
      normal: cn(baseStyles.text.normal, "leading-relaxed"),
      muted: cn(baseStyles.text.muted, "leading-relaxed"),
    },
  },
};

const colorSchemeStyles: Record<
  ColorScheme,
  { accent: string; muted: string }
> = {
  blue: {
    accent: "text-blue-600",
    muted: "text-blue-600/80",
  },
  green: {
    accent: "text-green-600",
    muted: "text-green-600/80",
  },
  purple: {
    accent: "text-purple-600",
    muted: "text-purple-600/80",
  },
  gray: {
    accent: "text-gray-600",
    muted: "text-gray-600/80",
  },
};

export function getTemplateStyles(
  template: TemplateType,
  colorScheme: ColorScheme
) {
  const styles = templateStyles[template];
  const colors = colorSchemeStyles[colorScheme];

  return {
    ...styles,
    header: {
      ...styles.header,
      title: cn(styles.header.title, colors.accent),
    },
    section: {
      ...styles.section,
      title: cn(styles.section.title, colors.accent),
    },
  };
}
