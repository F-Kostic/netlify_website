// ============================================================================
// Win98Portfolio.tsx  —  COMPONENT ONLY, no content here
// ============================================================================
// To update text, artwork, images, or videos: edit portfolioContent.ts
// To update shared types:                     edit portfolioTypes.ts
// ============================================================================

import { useState, useRef, useEffect, useCallback } from 'react';
import { background, desktopIcons, cvContent, contactContent, iconDefaults } from './portfolioContent';
import type { DesktopIcon, FolderItem, WindowState, Marquee } from './portfolioTypes';

// ============================================================================
// CHEVRON ICON
// ============================================================================
const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// SMART SUBMENU
// Measures itself on mount and flips upward if there isn't room below.
// ============================================================================
const SmartSubmenu = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (window.innerHeight - rect.top < rect.height) setOpenUpward(true);
    }
  }, []);

  return (
    <div ref={ref} style={{
      position: 'absolute', left: '100%', marginLeft: '4px', width: '192px',
      background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white',
      boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 50,
      ...(openUpward ? { bottom: 0 } : { top: 0 }),
      ...style,
    }}>
      {children}
    </div>
  );
};

// ============================================================================
// SUBMENU ROW
// Opens its submenu on hover. Stays open while the mouse is anywhere inside
// the row OR the submenu panel — closes only when both are left.
// To add a new submenu anywhere in the Start menu, use:
//   <SubmenuRow label="My Section"><div>...items...</div></SubmenuRow>
// ============================================================================
const SubmenuRow = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  const schedule = () => { cancel(); timer.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div
      style={{
        padding: '4px 8px', cursor: 'pointer', fontSize: '14px', position: 'relative',
        color: hovered ? 'white' : 'black', background: hovered ? '#0000AA' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
      onMouseEnter={() => { cancel(); setOpen(true); setHovered(true); }}
      onMouseLeave={() => { setHovered(false); schedule(); }}
    >
      {label}
      <ChevronRight size={12} />
      {open && (
        <SmartSubmenu>
          <div onMouseEnter={cancel} onMouseLeave={schedule}>
            {children}
          </div>
        </SmartSubmenu>
      )}
    </div>
  );
};

// ============================================================================
// WINDOW SIZE HOOK — tracks live viewport dimensions
// ============================================================================
const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};

// ============================================================================
// ICON LAYOUT — fills a column top-to-bottom, then starts the next column.
// ICON_W/H  = cell size (icon + label)
// PADDING   = gap from screen edges
// TASKBAR_H = space reserved at the bottom for the taskbar
// ============================================================================
const ICON_W = 80;
const ICON_H = 90;
const PADDING = 16;
const TASKBAR_H = 36;

const computeIconPositions = (icons: DesktopIcon[], viewportHeight: number) => {
  const usableHeight = viewportHeight - TASKBAR_H - PADDING;
  const iconsPerColumn = Math.max(1, Math.floor(usableHeight / ICON_H));
  return icons.map((icon, i) => {
    const col = Math.floor(i / iconsPerColumn);
    const row = i % iconsPerColumn;
    return {
      ...icon,
      x: PADDING + col * (ICON_W + PADDING),
      y: PADDING + row * ICON_H,
    };
  });
};

// ============================================================================
// SHARED MENU ITEM HOVER HANDLERS
// ============================================================================
const onMenuEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = '#0000AA';
  e.currentTarget.style.color = 'white';
};
const onMenuLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.background = 'transparent';
  e.currentTarget.style.color = 'black';
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const Win98Portfolio = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedFolderItems, setSelectedFolderItems] = useState<string[]>([]);
  const [marquee, setMarquee] = useState<Marquee | null>(null);

  const dragRef = useRef<{ isDragging: boolean; windowId: string | null; offsetX: number; offsetY: number }>
    ({ isDragging: false, windowId: null, offsetX: 0, offsetY: 0 });

  const resizeRef = useRef<{ isResizing: boolean; windowId: string | null; edge: string | null; startX: number; startY: number; startWidth: number; startHeight: number; startLeft: number; startTop: number }>
    ({ isResizing: false, windowId: null, edge: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 });

  const { width: viewportWidth, height: viewportHeight } = useWindowSize();
  const layoutIcons = computeIconPositions(desktopIcons, viewportHeight);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // --------------------------------------------------------------------------
  // WINDOW MANAGEMENT
  // --------------------------------------------------------------------------
  const openWindow = useCallback((icon: DesktopIcon) => {
    const id = `window-${Date.now()}`;
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
    setWindows(prev => [...prev, {
      id, title: icon.name, type: icon.type, content: icon.content,
      items: icon.items, icon,
      x: 100 + windows.length * 30, y: 50 + windows.length * 30,
      width: 500, height: 400, zIndex: maxZ + 1, minimized: false,
    }]);
    setActiveWindow(id);
  }, [windows]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindow(prev => {
      if (prev !== id) return prev;
      const remaining = windows.filter(w => w.id !== id);
      return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
    });
  }, [windows]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
    setActiveWindow(prev => prev === id ? null : prev);
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false } : w));
    setActiveWindow(id);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
    setActiveWindow(id);
  }, []);

  // Shutdown: close tab, fallback to blank if browser blocks it
  const handleShutdown = () => {
    window.close();
    setTimeout(() => { window.location.href = 'about:blank'; }, 300);
  };

  // --------------------------------------------------------------------------
  // DRAG & RESIZE
  // --------------------------------------------------------------------------
  const handleWindowMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    if (resizeRef.current.isResizing) return;
    if (!(e.target as HTMLElement).closest('.title-bar')) return;
    const win = windows.find(w => w.id === windowId);
    if (!win) return;
    dragRef.current = { isDragging: true, windowId, offsetX: e.clientX - win.x, offsetY: e.clientY - win.y };
    bringToFront(windowId);
  }, [windows, bringToFront]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, windowId: string, edge: string) => {
    e.stopPropagation();
    const win = windows.find(w => w.id === windowId);
    if (!win) return;
    resizeRef.current = { isResizing: true, windowId, edge, startX: e.clientX, startY: e.clientY, startWidth: win.width, startHeight: win.height, startLeft: win.x, startTop: win.y };
    bringToFront(windowId);
  }, [windows, bringToFront]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragRef.current.isDragging && dragRef.current.windowId) {
        setWindows(prev => prev.map(w =>
          w.id === dragRef.current.windowId
            ? { ...w, x: e.clientX - dragRef.current.offsetX, y: e.clientY - dragRef.current.offsetY }
            : w
        ));
      }
      if (resizeRef.current.isResizing && resizeRef.current.windowId) {
        const { windowId, edge, startX, startY, startWidth, startHeight, startLeft, startTop } = resizeRef.current;
        const dx = e.clientX - startX, dy = e.clientY - startY;
        setWindows(prev => prev.map(w => {
          if (w.id !== windowId) return w;
          let nw = startWidth, nh = startHeight, nx = startLeft, ny = startTop;
          if (edge.includes('e')) nw = Math.max(200, startWidth + dx);
          if (edge.includes('w')) { nw = Math.max(200, startWidth - dx); nx = startLeft + (startWidth - nw); }
          if (edge.includes('s')) nh = Math.max(150, startHeight + dy);
          if (edge.includes('n')) { nh = Math.max(150, startHeight - dy); ny = startTop + (startHeight - nh); }
          return { ...w, width: nw, height: nh, x: nx, y: ny };
        }));
      }
      if (marquee) {
        const w = e.clientX - marquee.startX, h = e.clientY - marquee.startY;
        setMarquee({ ...marquee, width: w, height: h });
        const ml = Math.min(marquee.startX, e.clientX), mt = Math.min(marquee.startY, e.clientY);
        const mr = Math.max(marquee.startX, e.clientX), mb = Math.max(marquee.startY, e.clientY);
        setSelectedIcons(desktopIcons.filter((_, i) => {
          const ic = layoutIcons[i];
          return !(ic.x! + ICON_W < ml || ic.x! > mr || ic.y! + ICON_H < mt || ic.y! > mb);
        }).map(ic => ic.id));
      }
    };
    const onUp = () => {
      dragRef.current = { isDragging: false, windowId: null, offsetX: 0, offsetY: 0 };
      resizeRef.current = { isResizing: false, windowId: null, edge: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 };
      setMarquee(null);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
  }, [windows, marquee, desktopIcons]);

  // --------------------------------------------------------------------------
  // FOLDER ITEM INTERACTION
  // --------------------------------------------------------------------------
  const handleFolderItemDoubleClick = (win: WindowState, item: FolderItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const base = { id: `${win.id}-${item.name}`, name: item.name, x: 0, y: 0 };
    if (item.type === 'info')  openWindow({ ...base, type: 'info',  content: item.content });
    if (item.type === 'image') openWindow({ ...base, type: 'image', content: item.url });
    if (item.type === 'video') openWindow({ ...base, type: 'video', content: item.url });
  };

  // --------------------------------------------------------------------------
  // WINDOW CONTENT RENDERER
  // --------------------------------------------------------------------------
  const renderWindowContent = (win: WindowState) => {
    if (win.type === 'folder' && win.items) {
      return (
        <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {win.items.map((item, idx) => {
            const key = `${win.id}-${item.name}`;
            const sel = selectedFolderItems.includes(key);
            return (
              <div key={idx}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px', cursor: 'pointer', backgroundColor: sel ? '#0000AA' : 'transparent', color: sel ? 'white' : 'black' }}
                onClick={() => setSelectedFolderItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [key])}
                onDoubleClick={(e) => handleFolderItemDoubleClick(win, item, e)}
              >
                <div style={{ width: '48px', height: '48px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.type === 'info' && (
                    <img src={iconDefaults.info} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  )}
                  {item.type === 'image' && (
                    <img src={iconDefaults.image} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  )}
                  {item.type === 'video' && (
                    <img src={iconDefaults.video} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                  )}
                </div>
                <span style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-word', width: '100%' }}>{item.name}</span>
              </div>
            );
          })}
        </div>
      );
    }
    if (win.type === 'info') return (
      <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap', color: 'black' }}>{win.content}</div>
    );
    if (win.type === 'image') return (
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img src={win.content} alt={win.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    );
    if (win.type === 'video') {
      const isYT = win.content?.includes('youtube.com') || win.content?.includes('youtu.be');
      return (
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {isYT
            ? <iframe src={win.content} style={{ width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            : <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}><source src={win.content} type="video/mp4" /></video>
          }
        </div>
      );
    }
    return null;
  };

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  const bgStyle = background.type === 'image'
    ? {
        background: `url(${background.image})`,
        backgroundSize: background.tiled ? 'auto' : 'cover',
        backgroundRepeat: background.tiled ? 'repeat' : 'no-repeat',
        backgroundPosition: !background.tiled ? 'center' : undefined,
      }
    : { background: background.color };

  const resizeHandles: Array<[string, string, React.CSSProperties]> = [
    ['ne', 'ne-resize', { top: 0, right: 0, width: '8px', height: '8px' }],
    ['nw', 'nw-resize', { top: 0, left: 0, width: '8px', height: '8px' }],
    ['se', 'se-resize', { bottom: 0, right: 0, width: '8px', height: '8px' }],
    ['sw', 'sw-resize', { bottom: 0, left: 0, width: '8px', height: '8px' }],
    ['n',  'n-resize',  { top: 0, left: '8px', right: '8px', height: '8px' }],
    ['s',  's-resize',  { bottom: 0, left: '8px', right: '8px', height: '8px' }],
    ['w',  'w-resize',  { left: 0, top: '8px', bottom: '8px', width: '8px' }],
    ['e',  'e-resize',  { right: 0, top: '8px', bottom: '8px', width: '8px' }],
  ];

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden', userSelect: 'none', margin: 0, padding: 0, ...bgStyle }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedIcons([]);
          setMarquee({ startX: e.clientX, startY: e.clientY, width: 0, height: 0 });
        }
      }}
      onClick={() => setStartMenuOpen(false)}
    >

      {/* ── DESKTOP ICONS ── auto-laid out, reflows on window resize ── */}
      {layoutIcons.map(icon => (
        <div key={icon.id}
          style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', width: `${ICON_W}px`, cursor: 'pointer', left: icon.x, top: icon.y, backgroundColor: selectedIcons.includes(icon.id) ? 'rgba(0,0,170,0.5)' : 'transparent' }}
          onClick={(e) => {
            e.stopPropagation();
            e.ctrlKey || e.metaKey
              ? setSelectedIcons(prev => prev.includes(icon.id) ? prev.filter(i => i !== icon.id) : [...prev, icon.id])
              : setSelectedIcons([icon.id]);
          }}
          onDoubleClick={(e) => { e.stopPropagation(); openWindow(icon); }}
        >
          <div style={{ width: '48px', height: '48px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon.type === 'folder' && (
              <img src={iconDefaults.folder} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            )}
            {icon.type === 'info' && (
              <img src={iconDefaults.info} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
            )}
          </div>
          <span style={{ fontSize: '12px', color: 'white', textAlign: 'center', textShadow: '1px 1px 2px black', lineHeight: '1.2', width: '100%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{icon.name}</span>
        </div>
      ))}

      {/* ── MARQUEE SELECT ── */}
      {marquee && (
        <div style={{ position: 'absolute', border: '1px solid #0000AA', background: 'rgba(0,0,170,0.2)', pointerEvents: 'none', left: Math.min(marquee.startX, marquee.startX + marquee.width), top: Math.min(marquee.startY, marquee.startY + marquee.height), width: Math.abs(marquee.width), height: Math.abs(marquee.height) }} />
      )}

      {/* ── WINDOWS ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {windows.filter(w => !w.minimized).map(win => (
          <div key={win.id}
            style={{ position: 'absolute', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', pointerEvents: 'auto', left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex, display: 'flex', flexDirection: 'column' }}
            onMouseDown={() => bringToFront(win.id)}
          >
            {/* Title bar */}
            <div className="title-bar"
              style={{ height: '24px', padding: '0 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'move', background: activeWindow === win.id ? 'linear-gradient(to right,#000080,#1084d0)' : '#808080' }}
              onMouseDown={(e) => handleWindowMouseDown(e, win.id)}
            >
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {/* Minimize */}
                <button style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px,1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                  onClick={() => minimizeWindow(win.id)}
                ><svg width="8" height="2" viewBox="0 0 8 2"><rect width="8" height="2" fill="#000" /></svg></button>
                {/* Maximize (placeholder) */}
                <button style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px,1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                ><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" /></svg></button>
                {/* Close */}
                <button style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FF6B6B'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#C0C0C0'; e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px,1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
                  onClick={() => closeWindow(win.id)}
                ><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
            </div>
            {/* Content area */}
            <div style={{ flex: 1, background: 'white', overflow: 'auto', borderTop: '2px solid #808080' }}>
              {renderWindowContent(win)}
            </div>
            {/* Resize handles */}
            {resizeHandles.map(([edge, cur, pos]) => (
              <div key={edge} style={{ position: 'absolute', cursor: cur, ...pos }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, edge)} />
            ))}
          </div>
        ))}
      </div>

      {/* ── TASKBAR ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px', background: '#C0C0C0', borderTop: '2px solid white', display: 'flex', alignItems: 'center', padding: '0 4px', gap: '4px', zIndex: 1100 }}>
        <button
          style={{ padding: '2px 8px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: 'black' }}
          onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px,1px)'; }}
          onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = ''; }}
          onClick={(e) => { e.stopPropagation(); setStartMenuOpen(o => !o); }}
        >
          <div style={{ width: '16px', height: '16px', background: 'linear-gradient(135deg,#FF0000,#FFAA00)', borderRadius: '2px' }} />
          <span>Start</span>
        </button>

        {windows.map(win => (
          <button key={win.id}
            style={{ padding: '2px 8px', border: '2px solid', fontSize: '14px', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer', background: activeWindow === win.id && !win.minimized ? '#808080' : '#C0C0C0', borderColor: activeWindow === win.id && !win.minimized ? 'black white white black' : 'white black black white', color: 'black' }}
            onClick={() => { if (win.minimized) restoreWindow(win.id); else if (activeWindow === win.id) minimizeWindow(win.id); else bringToFront(win.id); }}
          >{win.title}</button>
        ))}

        <div style={{ marginLeft: 'auto', padding: '0 8px', border: '2px solid', borderColor: '#808080 white white #808080', fontSize: '14px', color: 'black', flexShrink: 0, minWidth: '70px' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* ── START MENU ──
          To add a new submenu section, use:
            <SubmenuRow label="My Section">
              <div style={{...menuItemStyle}} onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave} onClick={...}>Item</div>
            </SubmenuRow>
      */}
      {startMenuOpen && (
        <div
          style={{ position: 'absolute', bottom: '28px', left: 0, width: '192px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 1200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '4px' }}>

            <SubmenuRow label="CV/Contact">
              <div style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                onClick={() => { openWindow({ id: 'cv-file', name: 'CV', type: 'info', x: 0, y: 0, content: cvContent }); setStartMenuOpen(false); }}
                onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave}
              >CV</div>
              <div style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                onClick={() => { openWindow({ id: 'contact-file', name: 'Contact', type: 'info', x: 0, y: 0, content: contactContent }); setStartMenuOpen(false); }}
                onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave}
              >Contact</div>
            </SubmenuRow>

            <SubmenuRow label="Artworks">
              {desktopIcons.filter(i => i.type === 'folder').map(folder => (
                <div key={folder.id} style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                  onClick={() => { openWindow(folder); setStartMenuOpen(false); }}
                  onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave}
                >{folder.name}</div>
              ))}
            </SubmenuRow>

            <div style={{ borderTop: '1px solid #808080', margin: '4px 0' }} />

            <div style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
              onClick={() => { setShowShutdown(true); setStartMenuOpen(false); }}
              onMouseEnter={onMenuEnter} onMouseLeave={onMenuLeave}
            >Shut Down...</div>

          </div>
        </div>
      )}

      {/* ── SHUTDOWN DIALOG ── */}
      {showShutdown && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
          <div style={{ background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', padding: '16px', width: '300px' }}>
            <div style={{ background: 'linear-gradient(to right,#000080,#1084d0)', padding: '4px 8px', margin: '-16px -16px 12px -16px' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Shut Down</span>
            </div>
            <div style={{ marginBottom: '16px', fontSize: '14px', color: 'black' }}>Are you sure you want to shut down?</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button style={{ padding: '4px 16px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', fontSize: '14px', cursor: 'pointer' }} onClick={() => setShowShutdown(false)}>No</button>
              <button style={{ padding: '4px 16px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', fontSize: '14px', cursor: 'pointer' }} onClick={handleShutdown}>Yes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Win98Portfolio;
