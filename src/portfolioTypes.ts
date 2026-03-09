// ============================================================================
// portfolioTypes.ts
// ============================================================================
// Shared TypeScript interfaces. Import from here in both portfolioContent.ts
// and Win98Portfolio.tsx so the shape is defined in one place.
// ============================================================================

export interface FolderItem {
  name: string;
  type: 'info' | 'image' | 'video' | 'audio' | 'bandcamp';
  content?: string;
  url?: string;
}

export interface DesktopIcon {
  id: string;
  name: string;
  type: 'folder' | 'terminal' | 'info' | 'image' | 'video' | 'audio' | 'bandcamp';
  x?: number;
  y?: number;
  customIcon?: string | null;
  content?: string;
  items?: FolderItem[];
}

export interface WindowState {
  id: string;
  title: string;
  type: 'folder' | 'terminal' | 'info' | 'image' | 'video' | 'audio' | 'bandcamp';
  content?: string;
  items?: FolderItem[];
  icon?: DesktopIcon;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: { x: number; y: number; width: number; height: number };
  parentId?: string;           // id of the folder window this was opened from
  siblingItems?: FolderItem[]; // all items in that folder, for prev/next nav
  siblingIndex?: number;       // index of this item in siblingItems
}

export interface Marquee {
  startX: number;
  startY: number;
  width: number;
  height: number;
}