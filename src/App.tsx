import { useState, useRef, useEffect, useCallback } from 'react';

// ============================================================================
// CHEVRON ICON COMPONENT
// ============================================================================
const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// SMART SUBMENU COMPONENT
// ============================================================================
// Automatically opens upward if there isn't enough space below.
// Wrap any submenu content in this component and it will handle positioning.
interface SmartSubmenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SmartSubmenu = ({ children, style }: SmartSubmenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.top;
      if (spaceBelow < rect.height) {
        setOpenUpward(true);
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '100%',
        marginLeft: '4px',
        width: '192px',
        background: '#C0C0C0',
        border: '2px solid',
        borderColor: 'white black black white',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        zIndex: 50,
        // If opening upward, anchor bottom to parent's bottom; otherwise top to top
        ...(openUpward ? { bottom: 0 } : { top: 0 }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================
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

interface FolderItem {
  name: string;
  type: 'info' | 'image' | 'video';
  content?: string;
  url?: string;
}

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
  const GRID_SIZE = 100;
  const GRID_OFFSET_X = 20;
  const GRID_OFFSET_Y = 20;

  const backgroundType = 'image';
  const backgroundColor = '#001EFF';
  const backgroundImage = '/images/BG_Rat_Blue_notext.png';
  const backgroundTiled = false;

  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const [windows, setWindows] = useState<WindowState[]>([]);

  const [desktopIcons] = useState<DesktopIcon[]>([
    {
      id: 'cv',
      name: 'CV',
      type: 'info',
      x: 20,
      y: 320,
      content: `Filip Kostic
(B.1993, Beograd, Serbia)
Living and working in Los Angeles, CA

Education
MFA Film and Video Candidate, Bard College, 2022
BFA ArtCenter College of Design, 2016

Solo Exhibitions
2017
  Open Loop, Roger's Office (Los Angeles, CA)
2016
  Landgrab the Musical in Virtual Reality, Wind Tunnel Gallery (Pasadena, CA)
  me, from the future., ArtCenter College of Design (Pasadena, CA)

Group Exhibitions and Screenings
2025
  If/Then, Ujazdowski Castle Center for Contemporary Arts, (Warsaw, Poland) curated by Sara Szostak, Marta Grytczuk
  The Mirror Effect, Chateau de Monstsoreau Museum of Contemporary Art (Motsoreau, France), curated by Lara Pan
2024
  Transcendence Creative, lower_cavity, (Holyoke, Massachusetts) as part of the lower_cavity artist residency
  Neither Dream, Nor Delusion, China Heights Gallery, (Sydney, Australia) curated by Jarryd Lynagh
2023
  The Manic American Humanist Show, Public Works Administration, (New York City, New York) curated by Abbey Pusz
2022
  The Influencing Machine, Ujazdowski Castle Center for Contemporary Arts, (Warsaw, Poland) curated by Aaron K. Moulton
  Klammern aus denen Blätter Spriessen(Berlin), Scherben (Berlin, Germany) curated by Hunter Shaw, Tarik Kentouche, Lorenz Liebig
  Klammern aus denen Blätter Spriessen(LA), Hunter Shaw Fine Art (Los Angeles) curated by Hunter Shaw, Tarik Kentouche, Lorenz Liebig
  Do Not Research: Group Show, Lower Cavity, (Holyoke, Massachusetts) curated by Joshua Citarella
2020
  Ars Electronica 2020, Ars Electronica, (Linz, Austria) as part of the Belgrade Gardens
  Both Ways, Porto Vecchio di Trieste, (Trieste, Italy) Curated by Maja Ciric as part of the EuroScience Open Forum
  Intelligence IO, Magacin, (Belgrade, Serbia) Curated by Maja Ciric as part of the Art + Science
  FiDi Arsenale, Hot-Air/Mery Gates, (Manhattan, New York) Curated by Collin Clarke and Matt Shaw
2019
  Landgrab the Musical in Virtual Reality, SPRING/BREAK Art Show LA, (Los Angeles, California) curated by Hunter Shaw and presented by Hunter Shaw Fine Art
  Filip Kostic vs Filip Kostic, Live on Twitch
    Streamed at Rogers Office, (Los Angeles, CA)
    Streamed at Mery Gates, (Brooklyn, NY)
    Streamed at Alyssa Davis Gallery, (New York City, NY)
2018
  Spatial Reality, sp[a]ce gallery, (Pasadena, CA) Curated by Jessie Damiani.
  Pilot, Elephant Art Space, (Los Angeles, CA) Group show with Andy Bennet and Colleen Hargaden.
  ARC I, NAVEL, (Los Angeles, CA) A screening as part of the Arts Research Cooperative summer fellowship.
  Fälschung, Projektwohnung Krudebude, (Leipzig, Germany) curated by Anja Seitz
  Belly Flop, Pool Party, (Palm Springs, CA) curated by Adrian Pijoan and Ray Ewing
  TWISTER, Elevator Mondays, (Los Angeles, CA) Collaborative project with Theo Triantyfillidis, curated by Don Edler
2017
  CACHE_LA, MINTMOUE, (Los Angeles, CA) Curated by Brandon Barr and Gou Shibata
  Reality Show, Tiger Strikes Asteroid Los Angeles, Bendix Building(Los Angeles, CA) Curated by Brian Porray
  SPRING/BREAK ART SHOW, 4 Times Square (New York, NY) Curated by Mariah Kitner
  GHOSTING: 100% REAL VR/AR Exhibition, GLAS Animation Festival (Berkeley,CA) Curated by Ghosting.TV
2015
  Sculpture Exhibition, ArtCenter College of Design (Pasadena, CA)
2014
  Personal Tales, El Camino Community College (Torrance, CA)

Awards and Residencies
2024
  Lower Cavity Artist Residency
2018
  ARC(Arts Research Cooperative) Fellow
2017
  Roger's Office Artist Residency

Professional Experience
2024-2026
  Art Director and Technical Artist at Genpop interactive for the Hero Shooter video game SLiMECORE.
2016-2022
  Adjunct Faculty in Interaction Design and Fine Art departments at ArtCenter College of Design
2021
  Adjunct Faculty in Film and New Media Department at California State University Northridge
2018-2021
  Lead Technical Artist, Technical Animator, Game Designer at WEVR for Harry Potter VR Experiences
2018-2019
  Adjunct Faculty in Sculpture Department at Otis College of Art and Design`
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
        { name: 'Pro Mouse Grip 1', type: 'image', url: '/images/ProMouseGrip/SingleHand_01.png' },
        { name: 'Pro Mouse Grip 2', type: 'image', url: '/images/ProMouseGrip/SingleHand_02.png' },
        { name: 'Installation View', type: 'image', url: '/images/ProMouseGrip/3quarterHands6Drawings.png' }
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
        { name: 'Info', type: 'info', content: 'Bed PC, (2022)\n\nCustom built water cooled computer built into the frame of a Bed. Variable screens, blanket, pillows, variable peripheries including Keyboard, mouse, streaming microphone, webcams.' },
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
        { name: 'Booty Bay Open Studios(202)', type: 'video', url: 'https://www.youtube.com/embed/EccTUHy3V8A' }
      ]
    },
    {
      id: 'Filip Kostic VS Filip Kostic',
      name: 'Filip Kostic VS Filip Kostic (2019)',
      type: 'folder',
      x: 120,
      y: 20,
      customIcon: null,
      items: [
        { name: 'Info', type: 'info', content: 'Filip Kostic VS Filip Kostic(2019)\n\nLive Streamed Performance\n\nFilip Kostic VS Filip Kostic was a twitch streamed performance in which I(Filip Kostic) played a game of FIFA against Filip Kostic, professional Serbian soccer player of Eintracht Frankfurt, for the Instagram handle @filipkostic. Halftime performance performed by Mark Fingerhut\n\nSince 2012 my online identity has been mistaken with that of the Serbian soccer player Filip Kostic through a shared imdb page, randomly being tagged in posts with him in the images on instagram, and being contacted via email for special requests from his fans. In 2019, his PR team contacted me to purchase my instagram handle, I instead counter offered with a proposition to play me in a game of FIFA, winner takes the handle — surprisingly, they agreed. The event was a live performance on Twitch TV complete with a custom layout frame, sponsors, and a half time show. ' },
        { name: 'Filip Kostic VS Filip Kostic (video)', type: 'video', url: 'https://www.youtube.com/embed/hdJ_2KLr6qA' },
        { name: 'Instagram Tags', type: 'image', url: '/images/FK_VS_FK/insta_tags.jpg' }
      ]
    },
    {
      id: 'Random Things',
      name: 'Random Things',
      type: 'folder',
      x: 620,
      y: 820,
      customIcon: null,
      items: [
        { name: 'Info', type: 'info', content: 'These are some random images of things I am looking at or thinking about.' },
        { name: 'Fortnite1', type: 'image', url: '/images/Random/fortnite1.png' },
        { name: 'Fortnite2', type: 'image', url: '/images/Random/fortnite2.png' },
        { name: 'Tracker Dog', type: 'image', url: '/images/Random/dog.png' },
        { name: 'Frog', type: 'image', url: '/images/Random/Frog.png' },
        { name: 'Sodium Chloride', type: 'image', url: '/images/Random/salt.png' }
      ]
    }
  ]);

  const aboutContent = 'CV Here...';
  const contactContent = 'Email: email@filipkostic.computer\n\nInstagram: @flipkostic';

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [startSubmenu, setStartSubmenu] = useState<string | null>(null);
  const [showShutdown, setShowShutdown] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [selectedFolderItems, setSelectedFolderItems] = useState<string[]>([]);
  const [draggingIcon, setDraggingIcon] = useState<string | null>(null);
  const [marquee, setMarquee] = useState<Marquee | null>(null);

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
  // CLOCK
  // --------------------------------------------------------------------------
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------------------------------
  // WINDOW MANAGEMENT
  // --------------------------------------------------------------------------
  const snapToGrid = (value: number, offset: number): number => {
    return Math.round((value - offset) / GRID_SIZE) * GRID_SIZE + offset;
  };

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

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: true } : w
    ));
    setActiveWindow(prev => prev === id ? null : prev);
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, minimized: false } : w
    ));
    setActiveWindow(id);
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(w =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      );
    });
    setActiveWindow(id);
  }, []);

  // --------------------------------------------------------------------------
  // SHUTDOWN — closes the tab; falls back to about:blank if browser blocks it
  // --------------------------------------------------------------------------
  const handleShutdown = () => {
    window.close();
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 300);
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
      setMarquee({ startX: e.clientX, startY: e.clientY, width: 0, height: 0 });
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
      openWindow({ id: `${window.id}-${item.name}`, name: item.name, type: 'info', x: 0, y: 0, content: item.content });
    } else if (item.type === 'image') {
      openWindow({ id: `${window.id}-${item.name}`, name: item.name, type: 'image', x: 0, y: 0, content: item.url });
    } else if (item.type === 'video') {
      openWindow({ id: `${window.id}-${item.name}`, name: item.name, type: 'video', x: 0, y: 0, content: item.url });
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
                    <rect x="3" y="3" width="18" height="18" fill="#FFFFFF" stroke="#000000" />
                    <line x1="8" y1="8" x2="16" y2="8" stroke="#000000" />
                    <line x1="8" y1="12" x2="16" y2="12" stroke="#000000" />
                    <line x1="8" y1="16" x2="13" y2="16" stroke="#000000" />
                  </svg>
                )}
                {item.type === 'image' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" fill="#FFD700" stroke="#000000" strokeWidth="1" />
                    <circle cx="8" cy="9" r="2" fill="#FF6B6B" />
                    <path d="M3 17 L8 12 L12 16 L16 11 L21 16 V21 H3 Z" fill="#4ECDC4" />
                  </svg>
                )}
                {item.type === 'video' && (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" fill="#9B59B6" stroke="#000000" strokeWidth="1" />
                    <polygon points="10,9 10,15 15,12" fill="#FFFFFF" />
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
      const isYouTube = win.content?.includes('youtube.com') || win.content?.includes('youtu.be');
      return (
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          {isYouTube ? (
            <iframe
              src={win.content}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
              <source src={win.content} type="video/mp4" />
            </video>
          )}
        </div>
      );
    }
    return null;
  };

  // --------------------------------------------------------------------------
  // SHARED STYLES FOR START MENU ITEMS
  // --------------------------------------------------------------------------
  const menuItemStyle: React.CSSProperties = {
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  };

  const handleMenuHover = (e: React.MouseEvent<HTMLDivElement>, entering: boolean) => {
    e.currentTarget.style.background = entering ? '#0000AA' : 'transparent';
    e.currentTarget.style.color = entering ? 'white' : 'black';
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: backgroundType === 'image' ? `url(${backgroundImage})` : backgroundColor,
        backgroundSize: backgroundType === 'image' ? (backgroundTiled ? 'auto' : 'cover') : undefined,
        backgroundRepeat: backgroundType === 'image' ? (backgroundTiled ? 'repeat' : 'no-repeat') : undefined,
        backgroundPosition: backgroundType === 'image' && !backgroundTiled ? 'center' : undefined,
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
      {/* DESKTOP ICONS */}
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
            backgroundColor: selectedIcons.includes(icon.id) ? 'rgba(0, 0, 170, 0.5)' : 'transparent'
          }}
          onClick={(e) => handleIconClick(e, icon.id)}
          onDoubleClick={(e) => handleIconDoubleClick(e, icon)}
        >
          <div style={{ width: '48px', height: '48px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon.type === 'folder' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M3 5 L10 5 L12 7 L21 7 L21 19 L3 19 Z" fill="#FFD700" stroke="#000000" strokeWidth="1" />
                <path d="M3 7 L21 7 L21 19 L3 19 Z" fill="#FFED4E" />
              </svg>
            )}
            {icon.type === 'info' && (
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" fill="#FFFFFF" stroke="#000000" />
                <line x1="8" y1="8" x2="16" y2="8" stroke="#000000" />
                <line x1="8" y1="12" x2="16" y2="12" stroke="#000000" />
                <line x1="8" y1="16" x2="13" y2="16" stroke="#000000" />
              </svg>
            )}
          </div>
          <span style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'center',
            textShadow: '1px 1px 2px black',
            lineHeight: '1.2'
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

      {/* WINDOWS */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000 }}>
        {windows.filter(w => !w.minimized).map(win => (
          <div
            key={win.id}
            style={{
              position: 'absolute',
              background: '#C0C0C0',
              border: '2px solid',
              borderColor: 'white black black white',
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
            <div
              className="title-bar"
              style={{
                height: '24px',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'move',
                background: activeWindow === win.id
                  ? 'linear-gradient(to right, #000080, #1084d0)'
                  : '#808080'
              }}
              onMouseDown={(e) => handleWindowMouseDown(e, win.id)}
            >
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
              <div style={{ display: 'flex', gap: '2px' }}>
                <button
                  style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px, 1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                  onClick={() => minimizeWindow(win.id)}
                >
                  <svg width="8" height="2" viewBox="0 0 8 2"><rect width="8" height="2" fill="#000000" /></svg>
                </button>
                <button
                  style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px, 1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                >
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" /></svg>
                </button>
                <button
                  style={{ width: '16px', height: '16px', background: '#C0C0C0', border: '1px solid', borderColor: 'white black black white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FF6B6B'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#C0C0C0'; e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                  onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px, 1px)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
                  onClick={() => closeWindow(win.id)}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

      {/* TASKBAR */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
        background: '#C0C0C0', borderTop: '2px solid white',
        display: 'flex', alignItems: 'center', padding: '0 4px', gap: '4px', zIndex: 1100
      }}>
        <button
          style={{
            padding: '2px 8px', background: '#C0C0C0', border: '2px solid',
            borderColor: 'white black black white', display: 'flex', alignItems: 'center',
            gap: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', color: 'black'
          }}
          onMouseDown={(e) => { e.currentTarget.style.borderColor = 'black white white black'; e.currentTarget.style.transform = 'translate(1px, 1px)'; }}
          onMouseUp={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'white black black white'; e.currentTarget.style.transform = 'translate(0, 0)'; }}
          onClick={(e) => { e.stopPropagation(); setStartMenuOpen(!startMenuOpen); }}
        >
          <div style={{ width: '16px', height: '16px', background: 'linear-gradient(135deg, #FF0000, #FFAA00)', borderRadius: '2px' }} />
          <span>Start</span>
        </button>

        {windows.map(win => (
          <button
            key={win.id}
            style={{
              padding: '2px 8px', border: '2px solid', fontSize: '14px',
              maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              cursor: 'pointer',
              background: activeWindow === win.id && !win.minimized ? '#808080' : '#C0C0C0',
              borderColor: activeWindow === win.id && !win.minimized ? 'black white white black' : 'white black black white',
              color: 'black'
            }}
            onClick={() => {
              if (win.minimized) restoreWindow(win.id);
              else if (activeWindow === win.id) minimizeWindow(win.id);
              else bringToFront(win.id);
            }}
          >
            {win.title}
          </button>
        ))}

        <div style={{
          marginLeft: 'auto', padding: '0 8px', border: '2px solid',
          borderColor: '#808080 white white #808080', fontSize: '14px', color: 'black',
          flexShrink: 0, minWidth: '70px'
        }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* ====================================================================
          START MENU
          All submenus use <SmartSubmenu> — add new ones the same way and
          they will automatically flip upward when there isn't enough room.
      ==================================================================== */}
      {startMenuOpen && (
        <div style={{
          position: 'absolute', bottom: '28px', left: 0, width: '192px',
          background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.5)', zIndex: 1200
        }}>
          <div style={{ padding: '4px' }}>

            {/* ── About / Contact ── */}
            <div
              style={menuItemStyle}
              onClick={(e) => { e.stopPropagation(); setStartSubmenu(startSubmenu === 'info' ? null : 'info'); }}
              onMouseEnter={(e) => handleMenuHover(e, true)}
              onMouseLeave={(e) => handleMenuHover(e, false)}
            >
              About/Contact
              <ChevronRight size={12} />
              {startSubmenu === 'info' && (
                <SmartSubmenu>
                  <div
                    style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow({ id: 'about-file', name: 'About', type: 'info', x: 0, y: 0, content: aboutContent });
                      setStartMenuOpen(false); setStartSubmenu(null);
                    }}
                    onMouseEnter={(e) => handleMenuHover(e, true)}
                    onMouseLeave={(e) => handleMenuHover(e, false)}
                  >
                    About
                  </div>
                  <div
                    style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow({ id: 'contact-file', name: 'Contact', type: 'info', x: 0, y: 0, content: contactContent });
                      setStartMenuOpen(false); setStartSubmenu(null);
                    }}
                    onMouseEnter={(e) => handleMenuHover(e, true)}
                    onMouseLeave={(e) => handleMenuHover(e, false)}
                  >
                    Contact
                  </div>
                </SmartSubmenu>
              )}
            </div>

            {/* ── Artworks ── */}
            <div
              style={menuItemStyle}
              onClick={(e) => { e.stopPropagation(); setStartSubmenu(startSubmenu === 'artworks' ? null : 'artworks'); }}
              onMouseEnter={(e) => handleMenuHover(e, true)}
              onMouseLeave={(e) => handleMenuHover(e, false)}
            >
              Artworks
              <ChevronRight size={12} />
              {startSubmenu === 'artworks' && (
                <SmartSubmenu>
                  {desktopIcons.filter(icon => icon.type === 'folder').map(folder => (
                    <div
                      key={folder.id}
                      style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openWindow(folder);
                        setStartMenuOpen(false); setStartSubmenu(null);
                      }}
                      onMouseEnter={(e) => handleMenuHover(e, true)}
                      onMouseLeave={(e) => handleMenuHover(e, false)}
                    >
                      {folder.name}
                    </div>
                  ))}
                </SmartSubmenu>
              )}
            </div>

            <div style={{ borderTop: '1px solid #808080', margin: '4px 0' }} />

            {/* ── Shut Down ── */}
            <div
              style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '14px', color: 'black' }}
              onClick={(e) => { e.stopPropagation(); setShowShutdown(true); setStartMenuOpen(false); }}
              onMouseEnter={(e) => handleMenuHover(e, true)}
              onMouseLeave={(e) => handleMenuHover(e, false)}
            >
              Shut Down...
            </div>
          </div>
        </div>
      )}

      {/* SHUTDOWN DIALOG */}
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
                style={{ padding: '4px 16px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', fontSize: '14px', cursor: 'pointer' }}
                onClick={() => setShowShutdown(false)}
              >
                No
              </button>
              <button
                style={{ padding: '4px 16px', background: '#C0C0C0', border: '2px solid', borderColor: 'white black black white', fontSize: '14px', cursor: 'pointer' }}
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