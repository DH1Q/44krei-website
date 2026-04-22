export type SiteContentType = "article" | "project" | "work";

export function getContentTypeIcon(contentType: SiteContentType): string {
  if (contentType === "article") return "✦";
  if (contentType === "work") return "▣";
  return "⌁";
}

export function getContentTypeLabel(contentType: SiteContentType): string {
  if (contentType === "article") return "文章";
  if (contentType === "work") return "作品";
  return "项目";
}

export function formatUpdatedLabel(updated: string): string {
  return `更新于 ${updated}`;
}

export function getListEntryMeta({
  contentType,
  updated,
}: {
  contentType: SiteContentType;
  updated: string;
}) {
  return {
    icon: getContentTypeIcon(contentType),
    label: `${getContentTypeLabel(contentType)} · ${formatUpdatedLabel(updated)}`,
  };
}
