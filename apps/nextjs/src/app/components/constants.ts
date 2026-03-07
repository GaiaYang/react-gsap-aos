interface Tab {
  value: string;
  label: string;
}

export const tabs = [
  { value: "all", label: "動畫總覽" },
  { value: "large", label: "大量元素" },
  { value: "typography", label: "文章範例" },
] satisfies Tab[];
