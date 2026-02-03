import { useState, useRef, useEffect, useCallback } from 'react';

// ============================================================================
// CHEVRON ICON COMPONENT
// ============================================================================
// Simple arrow icon used in the Start menu for submenus
const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================
// These define the structure of our data objects

// Desktop icon properties (icons on the desktop background)
interface DesktopIcon {
  id: string;
  name: string;
  type: 'folder' | 'terminal' | 'info' | 'image' | 'video';
  x: number;
  y: number;
  customIcon?: string | null;
  content?: string;
  items?: FolderItem[];
}

// Items inside a folder
interface FolderItem {
  name: string;
  type: 'info' | 'image' | 'video';
  content?: string;
  url?: string;
}

// Window state properties
interface WindowState {
  id: string;
  title: string;
  type: 'folder' | 'terminal' | 'info' | 'image' | 'video';
  content?: string;
  items?: FolderItem[];
  icon?: DesktopIcon;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
}

// Selection marquee (drag-select box) properties
interface Marquee {
  startX: number;
  startY: number;
  width: number;
  height: number;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const Win98Portfolio = () => {
  // --------------------------------------------------------------------------
  // CONSTANTS
  // --------------------------------------------------------------------------
  const GRID_SIZE = 100;
  const GRID_OFFSET_X = 20;
  const GRID_OFFSET_Y = 20;
  
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  // All windows currently open
  const [windows, setWindows] = useState<WindowState[]>([]);
  
  // Desktop icons configuration (folders, files, etc.)
  // CUSTOMIZE: Add/remove/edit desktop icons here
  const [desktopIcons] = useState<DesktopIcon[]>([
    { 
      id: 'about',
      name: 'About',
      type: 'info',
      x: 20,
      y: 320,
      content: 'CV Here'
    },
    { 
      id: 'contact',
      name: 'Contact',
      type: 'info',
      x: 20,
      y: 420,
      content: 'Email: email@filipkostic.computer\n\nInstagram: @flipkostic'
    },
    { 
      id: 'Pro Mouse Grip', 
      name: 'Pro Mouse Grip (2025)', 
      type: 'folder', 
      x: 20, 
      y: 20, 
      customIcon: null,
      items: [
        { name: 'Info', type: 'info', content: 'Pro Mouse Grip (1-7), (2025)\n\nVariable size hands on 13x13x31.5" mousepad pedestal\n\nSilicon-Copper cold cast' },
        // CUSTOMIZE: Replace these placeholder images with your own artwork URLs
        // Format: { name: 'filename.jpg', type: 'image', url: 'YOUR_IMAGE_URL' }
        { name: 'Pro Mouse Grip 1', type: 'image', url: '/images/ProMouseGrip/SingleHand_01.png' },
        { name: 'Pro Mouse Grip 2', type: 'image', url: '/images/ProMouseGrip/SingleHand_02.png' }
        // CUSTOMIZE: To add more images, add a comma above and paste:
        // { name: 'myimage.jpg', type: 'image', url: 'https://your-image-url.com/image.jpg' },
      ]
    },
    {
      id: 'Bed PC',
      name: 'Bed PC (2022)',
      type: 'folder',  
      x: 20,
      y: 120,
      customIcon: null,
      items: [
        { name: 'Info', type: 'info', content: 'Bed PC, (2022)\n\nCustom built water cooled computer built into the frame of a Bed. Variable screens, blanket, pillows, variable peripheries including Keyboard, mouse, streaming microphone, webcams.' }, // ✅ Added colon
        { name: 'Bed PC 2', type: 'image', url: '/images/BedPC/BedPC_Scherben_Main.jpg' },
        { name: 'Bed PC Home', type: 'image', url: '/images/BedPC/BedPC_Home.jpg' },
        { name: 'Bed PC(Twin)', type: 'image', url: '/images/BedPC/Bed_PC_HS_Twin.jpg' },
        { name: 'BedPC(Twin) Install', type: 'image', url: '/images/BedPC/BedPC_HS_Install.jpg' }
      ]
    },
    { 
      id: 'BootyBayOpenStudios', 
      name: 'Booty Bay Open Studios', 
      type: 'folder', 
      x: 20, 
      y: 220, 
      customIcon: null,
      items: [
        { name: 'Info', type: 'info', content: 'Booty Bay Open Studios (2020)\n\nHD Video, 7:18 TRT' },
        // CUSTOMIZE: Replace with your own video URL
        { name: 'Booty Bay Open Studios(202)', type: 'video', url: 'https://www.youtube.com/embed/EccTUHy3V8A' }
      ]
    }
  ]);
  
  // CUSTOMIZE: Edit these content strings for About and Contact info
  const aboutContent = 'CV Here';
  const contactContent = 'Email: email@filipkostic.computer\n\nInstagram: @flipkostic';
  
  // UI state management
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [startSubmenu, setStartSubmenu] = useState<string | null>(null);
  const [showShutdown, setShowShutdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedFolderItems, setSelectedFolderItems] = useState<string[]>([]);
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  
  // Refs for tracking drag and resize operations
  const dragRef = useRef<{
    isDragging: boolean;
    windowId: string | null;
    offsetX: number;
    offsetY: number;
  }>({ isDragging: false, windowId: null, offsetX: 0, offsetY: 0 });
  
  const resizeRef = useRef<{
    isResizing: boolean;
    windowId: string | null;
    edge: string | null;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
  }>({ isResizing: false, windowId: null, edge: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 });

  // --------------------------------------------------------------------------
  // CLOCK EFFECT
  // --------------------------------------------------------------------------
  // Updates the taskbar clock every second

  // --------------------------------------------------------------------------
  // CLOCK EFFECT
  // --------------------------------------------------------------------------
  // Updates the taskbar clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------------------------------
  // UTILITY FUNCTIONS
  // --------------------------------------------------------------------------
  // Snap icons to grid positions (currently not used but available)
  const snapToGrid = (value: number, offset: number): number => {
    return Math.round((value - offset) / GRID_SIZE) * GRID_SIZE + offset;
  };

  // --------------------------------------------------------------------------
  // WINDOW MANAGEMENT FUNCTIONS
  // --------------------------------------------------------------------------
  // Opens a new window from a desktop icon or folder item
  const openWindow = useCallback((icon: DesktopIcon) => {
    const windowId = `window-${Date.now()}`;
    const maxZ = windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 0;
    const newWindow: WindowState = {
      id: windowId,
      title: icon.name,
      type: icon.type,
      content: icon.content,
      items: icon.items,
      icon: icon,
      x: 100 + windows.length * 30,
      y: 50 + windows.length * 30,
      width: 500,
      height: 400,
      zIndex: maxZ + 1,
      minimized: false
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(windowId);
  }, [windows]);

  // Closes a window by its ID
  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setActiveWindow(prev => {
      if (prev === id) {
        const remaining = windows.filter(w => w.id !== id);
        return remaining.length > 0 ? remaining[remaining.length - 1].id : null;
      }
      return prev;
    });
  }, [windows]);

  // Minimizes a window (hides it but keeps it in taskbar)
  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
    setActiveWindow(prev => prev === id ? null : prev);
  }, []);

  // Restores a minimized window
  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, minimized: false } : w
    ));
    setActiveWindow(id);
  }, []);

  // Brings a window to the front (highest z-index)
  const bringToFront = useCallback((id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      );
    });
    setActiveWindow(id);
  }, []);

  const handleShutdown = () => {
    window.location.reload();
  };

  const handleWindowMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    if (resizeRef.current.isResizing) return;
    
    const target = e.target as HTMLElement;
    const titleBar = target.closest('.title-bar');
    if (!titleBar) return;

    const window = windows.find(w => w.id === windowId);
    if (!window) return;

    dragRef.current = {
      isDragging: true,
      windowId,
      offsetX: e.clientX - window.x,
      offsetY: e.clientY - window.y
    };

    bringToFront(windowId);
  }, [windows, bringToFront]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, windowId: string, edge: string) => {
    e.stopPropagation();
    const window = windows.find(w => w.id === windowId);
    if (!window) return;

    resizeRef.current = {
      isResizing: true,
      windowId,
      edge,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: window.width,
      startHeight: window.height,
      startLeft: window.x,
      startTop: window.y
    };

    bringToFront(windowId);
  }, [windows, bringToFront]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragRef.current.isDragging && dragRef.current.windowId) {
        setWindows(prev => prev.map(w => {
          if (w.id === dragRef.current.windowId) {
            return {
              ...w,
              x: e.clientX - dragRef.current.offsetX,
              y: e.clientY - dragRef.current.offsetY
            };
          }
          return w;
        }));
      }

      if (resizeRef.current.isResizing && resizeRef.current.windowId) {
        const { windowId, edge, startX, startY, startWidth, startHeight, startLeft, startTop } = resizeRef.current;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        setWindows(prev => prev.map(w => {
          if (w.id !== windowId) return w;

          let newWidth = startWidth;
          let newHeight = startHeight;
          let newX = startLeft;
          let newY = startTop;

          if (edge.includes('e')) newWidth = Math.max(200, startWidth + deltaX);
          if (edge.includes('w')) {
            newWidth = Math.max(200, startWidth - deltaX);
            newX = startLeft + (startWidth - newWidth);
          }
          if (edge.includes('s')) newHeight = Math.max(150, startHeight + deltaY);
          if (edge.includes('n')) {
            newHeight = Math.max(150, startHeight - deltaY);
            newY = startTop + (startHeight - newHeight);
          }

          return { ...w, width: newWidth, height: newHeight, x: newX, y: newY };
        }));
      }

      if (marquee) {
        const currentX = e.clientX;
        const currentY = e.clientY;
        const width = currentX - marquee.startX;
        const height = currentY - marquee.startY;
        setMarquee({ ...marquee, width, height });

        const selected = desktopIcons.filter(icon => {
          const iconLeft = icon.x;
          const iconTop = icon.y;
          const iconRight = iconLeft + 64;
          const iconBottom = iconTop + 64;

          const marqLeft = Math.min(marquee.startX, currentX);
          const marqTop = Math.min(marquee.startY, currentY);
          const marqRight = Math.max(marquee.startX, currentX);
          const marqBottom = Math.max(marquee.startY, currentY);

          return !(iconRight < marqLeft || iconLeft > marqRight || iconBottom < marqTop || iconTop > marqBottom);
        }).map(icon => icon.id);

        setSelectedIcons(selected);
      }
    };

    const handleMouseUp = () => {
      dragRef.current = { isDragging: false, windowId: null, offsetX: 0, offsetY: 0 };
      resizeRef.current = { isResizing: false, windowId: null, edge: null, startX: 0, startY: 0, startWidth: 0, startHeight: 0, startLeft: 0, startTop: 0 };
      setMarquee(null);
      setDraggingIcon(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [windows, marquee, desktopIcons]);

  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcons([]);
      setMarquee({
        startX: e.clientX,
        startY: e.clientY,
        width: 0,
        height: 0
      });
    }
  };

  const handleIconClick = (e: React.MouseEvent, iconId: string) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      setSelectedIcons(prev => 
        prev.includes(iconId) ? prev.filter(id => id !== iconId) : [...prev, iconId]
      );
    } else {
      setSelectedIcons([iconId]);
    }
  };

  const handleIconDoubleClick = (e: React.MouseEvent, icon: DesktopIcon) => {
    e.stopPropagation();
    openWindow(icon);
  };

  const handleFolderItemClick = (windowId: string, itemName: string) => {
    const key = `${windowId}-${itemName}`;
    setSelectedFolderItems(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [key]
    );
  };

  const handleFolderItemDoubleClick = (window: WindowState, item: FolderItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (item.type === 'info') {
      openWindow({
        id: `${window.id}-${item.name}`,
        name: item.name,
        type: 'info',
        x: 0,
        y: 0,
        content: item.content
      });
    } else if (item.type === 'image') {
      openWindow({
        id: `${window.id}-${item.name}`,
        name: item.name,
        type: 'image',
        x: 0,
        y: 0,
        content: item.url
      });
    } else if (item.type === 'video') {
      openWindow({
        id: `${window.id}-${item.name}`,
        name: item.name,
        type: 'video',
        x: 0,
        y: 0,
        content: item.url
      });
    }
  };

  const renderWindowContent = (win: WindowState) => {
    if (win.type === 'folder' && win.items) {
      return (
        <div style={{ padding: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {win.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px',
                cursor: 'pointer',
                backgroundColor: selectedFolderItems.includes(`${win.id}-${item.name}`) ? '#0000AA' : 'transparent',
                color: selectedFolderItems.includes(`${win.id}-${item.name}`) ? 'white' : 'black'
              }}
              onClick={() => handleFolderItemClick(win.id, item.name)}
              onDoubleClick={(e) => handleFolderItemDoubleClick(win, item, e)}
            >
              <div style={{ width: '48px', height: '48px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.type === 'info' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" fill="#FFFFFF" stroke="#000000"/>
                    <line x1="8" y1="8" x2="16" y2="8" stroke="#000000"/>
                    <line x1="8" y1="12" x2="16" y2="12" stroke="#000000"/>
                    <line x1="8" y1="16" x2="13" y2="16" stroke="#000000"/>
                  </svg>
                )}
                {item.type === 'image' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" fill="#FFD700" stroke="#000000" strokeWidth="1"/>
                    <circle cx="8" cy="9" r="2" fill="#FF6B6B"/>
                    <path d="M3 17 L8 12 L12 16 L16 11 L21 16 V21 H3 Z" fill="#4ECDC4"/>
                  </svg>
                )}
                {item.type === 'video' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" fill="#9B59B6" stroke="#000000" strokeWidth="1"/>
                    <polygon points="10,9 10,15 15,12" fill="#FFFFFF"/>
                  </svg>
                )}
              </div>
              <span style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-word', width: '100%' }}>{item.name}</span>
            </div>
          ))}
        </div>
      );
    } else if (win.type === 'info') {
      return (
        <div style={{ padding: '16px', fontFamily: 'monospace', fontSize: '14px', whiteSpace: 'pre-wrap', color: 'black' }}>
          {win.content}
        </div>
      );
    } else if (win.type === 'image') {
      return (
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img src={win.content} alt={win.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
      );
    } else if (win.type === 'video') {
      // Check if it's a YouTube URL
      const isYouTube = win.content?.includes('youtube.com') || win.content?.includes('youtu.be');
      
      return (
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {isYouTube ? (
            // YouTube video - use iframe
            <iframe 
              src={win.content} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Regular MP4 video - use video tag
            <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
              <source src={win.content} type="video/mp4" />
            </video>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    // ============================================================================
    // MAIN DESKTOP CONTAINER
    // ============================================================================
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        background: '#008080', // CUSTOMIZE: Desktop background color (teal = #008080)
        position: 'fixed',
        top: 0,
        left: 0,
        overflow: 'hidden',
        userSelect: 'none',
        margin: 0,
        padding: 0
      }}
      onMouseDown={handleDesktopMouseDown}
      onClick={() => setStartMenuOpen(false)}
    >
      {/* ====================================================================== */}
      {/* DESKTOP ICONS */}
      {/* ====================================================================== */}
      {desktopIcons.map(icon => (
        <div
          key={icon.id}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '64px',
            cursor: 'pointer',
            left: icon.x,
            top: icon.y,
            // CUSTOMIZE: Icon selection highlight color
            backgroundColor: selectedIcons.includes(icon.id) ? 'rgba(0, 0, 170, 0.5)' : 'transparent' // Blue highlight
          }}
          onClick={(e) => handleIconClick(e, icon.id)}
          onDoubleClick={(e) => handleIconDoubleClick(e, icon)}
        >
          <div style={{ width: '48px', height: '48px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* CUSTOMIZE: Folder icon colors */}
            {icon.type === 'folder' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M3 5 L10 5 L12 7 L21 7 L21 19 L3 19 Z" fill="#FFD700" stroke="#000000" strokeWidth="1"/> {/* Yellow folder */}
                <path d="M3 7 L21 7 L21 19 L3 19 Z" fill="#FFED4E"/> {/* Light yellow */}
              </svg>
            )}
            {/* CUSTOMIZE: Info/text file icon colors */}
            {icon.type === 'info' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" fill="#FFFFFF" stroke="#000000"/> {/* White paper */}
                <line x1="8" y1="8" x2="16" y2="8" stroke="#000000"/>
                <line x1="8" y1="12" x2="16" y2="12" stroke="#000000"/>
                <line x1="8" y1="16" x2="13" y2="16" stroke="#000000"/>
              </svg>
            )}
          </div>
          {/* CUSTOMIZE: Icon text color and shadow */}
          <span style={{ 
            fontSize: '12px', 
            color: 'white', // Icon label text color
            textAlign: 'center', 
            textShadow: '1px 1px 2px black', // Text shadow for readability
            lineHeight: '1.2'   // CUSTOMIZE: Adjust line spacing
          }}>{icon.name}</span>
        </div>
      ))}

      {marquee && (
        <div
          style={{
            position: 'absolute',
            border: '1px solid #0000AA',
            background: 'rgba(0, 0, 170, 0.2)',
            pointerEvents: 'none',
            left: Math.min(marquee.startX, marquee.startX + marquee.width),
            top: Math.min(marquee.startY, marquee.startY + marquee.height),
            width: Math.abs(marquee.width),
            height: Math.abs(marquee.height)
          }}
        />
      )}

      {/* ====================================================================== */}
      {/* WINDOWS */}
      {/* ====================================================================== */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {windows.filter(w => !w.minimized).map(win => (
          <div
            key={win.id}
            style={{
              position: 'absolute',
              background: '#C0C0C0', // CUSTOMIZE: Window background color (gray)
              border: '2px solid',
              borderColor: 'white black black white', // Win98 3D border effect
              boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              pointerEvents: 'auto',
              left: win.x,
              top: win.y,
              width: win.width,
              height: win.height,
              zIndex: win.zIndex,
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseDown={() => bringToFront(win.id)}
          >
            {/* WINDOW TITLE BAR */}
            <div 
              className="title-bar"
              style={{
                height: '24px',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'move',
                // CUSTOMIZE: Active/inactive window title bar colors
                background: activeWindow === win.id 
                  ? 'linear-gradient(to right, #000080, #1084d0)' // Active window (blue gradient)
                  : '#808080' // Inactive window (gray)
              }}
              onMouseDown={(e) => handleWindowMouseDown(e, win.id)}
            >
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {/* MINIMIZE BUTTON */}
                <button
                  style={{
                    width: '16px',
                    height: '16px',
                    background: '#C0C0C0',
                    border: '1px solid',
                    borderColor: 'white black black white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.05s'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderColor = 'black white white black';
                    e.currentTarget.style.transform = 'translate(1px, 1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderColor = 'white black black white';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'white black black white';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onClick={() => minimizeWindow(win.id)}
                >
                  <svg width="8" height="2" viewBox="0 0 8 2">
                    <rect width="8" height="2" fill="#000000" />
                  </svg>
                </button>
                <button
                  style={{
                    width: '16px',
                    height: '16px',
                    background: '#C0C0C0',
                    border: '1px solid',
                    borderColor: 'white black black white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.05s'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderColor = 'black white white black';
                    e.currentTarget.style.transform = 'translate(1px, 1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderColor = 'white black black white';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'white black black white';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" />
                  </svg>
                </button>
                <button
                  style={{
                    width: '16px',
                    height: '16px',
                    background: '#C0C0C0',
                    border: '1px solid',
                    borderColor: 'white black black white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.05s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FF6B6B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#C0C0C0';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderColor = 'black white white black';
                    e.currentTarget.style.transform = 'translate(1px, 1px)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderColor = 'white black black white';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                  onClick={() => closeWindow(win.id)}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ flex: 1, background: 'white', overflow: 'auto', borderTop: '2px solid #808080' }}>
              {renderWindowContent(win)}
            </div>

            <div style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', cursor: 'ne-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'ne')} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', cursor: 'nw-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'nw')} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', cursor: 'se-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'se')} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '8px', height: '8px', cursor: 'sw-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'sw')} />
            <div style={{ position: 'absolute', top: 0, left: '8px', right: '8px', height: '8px', cursor: 'n-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'n')} />
            <div style={{ position: 'absolute', bottom: 0, left: '8px', right: '8px', height: '8px', cursor: 's-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 's')} />
            <div style={{ position: 'absolute', left: 0, top: '8px', bottom: '8px', width: '8px', cursor: 'w-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'w')} />
            <div style={{ position: 'absolute', right: 0, top: '8px', bottom: '8px', width: '8px', cursor: 'e-resize' }} onMouseDown={(e) => handleResizeMouseDown(e, win.id, 'e')} />
          </div>
        ))}
      </div>

      {/* ====================================================================== */}
      {/* TASKBAR */}
      {/* ====================================================================== */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '28px', 
        background: '#C0C0C0', // CUSTOMIZE: Taskbar background color (gray)
        borderTop: '2px solid white', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 4px', 
        gap: '4px', 
        zIndex: 1100 
      }}>
        {/* START BUTTON */}
        <button
          style={{
            padding: '2px 8px',
            background: '#C0C0C0', // CUSTOMIZE: Start button background
            border: '2px solid',
            borderColor: 'white black black white',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'black', // CUSTOMIZE: Start button text color
            transition: 'all 0.1s'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderColor = 'black white white black';
            e.currentTarget.style.transform = 'translate(1px, 1px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderColor = 'white black black white';
            e.currentTarget.style.transform = 'translate(0, 0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'white black black white';
            e.currentTarget.style.transform = 'translate(0, 0)';
          }}
          onClick={(e) => {
            e.stopPropagation();
            setStartMenuOpen(!startMenuOpen);
          }}
        >
          {/* CUSTOMIZE: Start button icon color (Windows logo) */}
          <div style={{ 
            width: '16px', 
            height: '16px', 
            background: 'linear-gradient(135deg, #FF0000, #FFAA00)', // Red to orange gradient
            borderRadius: '2px' 
          }} />
          <span>Start</span> {/* CUSTOMIZE: Change "Start" text here */}
        </button>

        {/* WINDOW BUTTONS IN TASKBAR */}
        {windows.map(win => (
          <button
            key={win.id}
            style={{
              padding: '2px 8px',
              border: '2px solid',
              fontSize: '14px',
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              background: activeWindow === win.id && !win.minimized ? '#808080' : '#C0C0C0',
              borderColor: activeWindow === win.id && !win.minimized ? 'black white white black' : 'white black black white',
              color: 'black'
            }}
            onClick={() => {
              if (win.minimized) {
                restoreWindow(win.id);
              } else if (activeWindow === win.id) {
                minimizeWindow(win.id);
              } else {
                bringToFront(win.id);
              }
            }}
          >
            {win.title}
          </button>
        ))}

        {/* TASKBAR CLOCK */}
        <div style={{ 
          marginLeft: 'auto', 
          padding: '0 8px', 
          border: '2px solid', 
          borderColor: '#808080 white white #808080', 
          fontSize: '14px', 
          color: 'black',
          flexShrink: 0, 
          minWidth: '70px' // CUSTOMIZE: Clock text color
        }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* START MENU */}
      {/* ====================================================================== */}
      {startMenuOpen && (
        <div style={{ 
          position: 'absolute', 
          bottom: '28px', 
          left: 0, 
          width: '192px', 
          background: '#C0C0C0', // CUSTOMIZE: Start menu background color
          border: '2px solid', 
          borderColor: 'white black black white', 
          boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
          zIndex: 1200 
        }}>
          <div style={{ padding: '4px' }}>
            {/* START MENU ITEM: About/Contact */}
            <div 
              style={{
                position: 'relative',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'black' // CUSTOMIZE: Menu item text color
              }}
              onClick={(e) => {
                e.stopPropagation();
                setStartSubmenu(startSubmenu === 'info' ? null : 'info');
              }}
              // CUSTOMIZE: Menu hover colors - background becomes blue, text becomes white
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
            >
              About/Contact {/* CUSTOMIZE: Change menu item text */}
              <ChevronRight size={12} />
              
              {/* SUBMENU */}
              {startSubmenu === 'info' && (
                <div style={{ 
                  position: 'absolute', 
                  left: '100%', 
                  top: 0, 
                  marginLeft: '4px', 
                  width: '192px', 
                  background: '#C0C0C0', // CUSTOMIZE: Submenu background
                  border: '2px solid', 
                  borderColor: 'white black black white', 
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', 
                  zIndex: 50 
                }}>
                  <div 
                    style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow({ 
                        id: 'about-file', 
                        name: 'About', 
                        type: 'info', 
                        x: 0,
                        y: 0,
                        content: aboutContent 
                      });
                      setStartMenuOpen(false);
                      setStartSubmenu(null);
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
                  >
                    About
                  </div>
                  <div 
                    style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow({ 
                        id: 'contact-file', 
                        name: 'Contact', 
                        type: 'info',
                        x: 0,
                        y: 0,
                        content: contactContent 
                      });
                      setStartMenuOpen(false);
                      setStartSubmenu(null);
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
                  >
                    Contact
                  </div>
                </div>
              )}
            </div>
            
            <div 
              style={{
                position: 'relative',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'black'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setStartSubmenu(startSubmenu === 'artworks' ? null : 'artworks');
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
            >
              Artworks
              <ChevronRight size={12} />
              
              {startSubmenu === 'artworks' && (
                <div style={{ position: 'absolute', left: '100%', top: 0, marginLeft: '4px', width: '192px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 50 }}>
                  {desktopIcons.filter(icon => icon.type === 'folder').map(folder => (
                    <div 
                      key={folder.id}
                      style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openWindow(folder);
                        setStartMenuOpen(false);
                        setStartSubmenu(null);
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
                    >
                      {folder.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ borderTop: '1px solid #808080', margin: '4px 0' }} />
            <div 
              style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
              onClick={(e) => {
                e.stopPropagation();
                setShowShutdown(true);
                setStartMenuOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0000AA', e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = 'black')}
            >
              Shut Down...
            </div>
          </div>
        </div>
      )}

      {showShutdown && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
          <div style={{ background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', padding: '16px', width: '300px' }}>
            <div style={{ background: 'linear-gradient(to right, #000080, #1084d0)', padding: '4px 8px', margin: '-16px -16px 12px -16px' }}>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>Shut Down</span>
            </div>
            <div style={{ marginBottom: '16px', fontSize: '14px', color: 'black' }}>
              Are you sure you want to shut down?
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                style={{
                  padding: '4px 16px',
                  background: '#C0C0C0',
                  border: '2px solid',
                  borderColor: 'white black black white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowShutdown(false)}
              >
                No
              </button>
              <button
                style={{
                  padding: '4px 16px',
                  background: '#C0C0C0',
                  border: '2px solid',
                  borderColor: 'white black black white',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
                onClick={handleShutdown}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Win98Portfolio;