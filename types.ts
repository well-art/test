export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  type: 'pdf' | 'doc' | 'sheet';
  previewUrl?: string; // Mock url for preview
}

export interface CategoryGroup {
  name: string;
  items: DocumentItem[];
}

export type MainCategory = 'regulations' | 'flowcharts' | 'forms';

export interface SectionData {
  id: MainCategory;
  title: string;
  groups: CategoryGroup[];
}