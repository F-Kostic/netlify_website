// ============================================================================
// portfolioContent.ts
// ============================================================================
// HOW TO ADD A NEW ARTWORK FOLDER:
//   1. Add an entry to the `desktopIcons` array below with type: 'folder'
//   2. Add items (info, image, video) inside its `items` array
//   3. Give it an x/y position on the desktop
//   Done — it will automatically appear in the desktop and Start > Artworks menu.
//
// HOW TO USE INLINE TEXT vs. A SEPARATE FILE:
//   - Inline:  content: `Your text here`
// ============================================================================

import type { DesktopIcon } from './portfolioTypes';

// ----------------------------------------------------------------------------
// DESKTOP BACKGROUND
// ----------------------------------------------------------------------------
export const background = {
  type: 'image' as 'image' | 'color', // 'image' or 'color'
  color: '#001EFF',                    // used when type is 'color'
  image: '/images/BG_Rat_Blue_notext.png', // used when type is 'image'
  tiled: false,                        // true = tile, false = cover/stretch
};

// ----------------------------------------------------------------------------
// START MENU — About / Contact text
// These appear when you open About or Contact from the Start menu.
// ----------------------------------------------------------------------------
export const aboutContent = `CV Here...`;

export const contactContent = `Email: email@filipkostic.computer

Instagram: @flipkostic`;

// ----------------------------------------------------------------------------
// DESKTOP ICONS
// Each entry is either a standalone info/text file or a folder with items.
//
// POSITIONS: x/y are pixels from the top-left of the desktop.
// TYPES:
//   'info'   — opens a text window
//   'folder' — opens a folder window with items inside
//   'image'  — opens an image viewer  (used inside folder items)
//   'video'  — opens a video player   (used inside folder items)
//              YouTube embed URLs work automatically.
// ----------------------------------------------------------------------------
export const desktopIcons: DesktopIcon[] = [

  // --------------------------------------------------------------------------
  // STANDALONE TEXT FILES (appear directly on desktop)
  // --------------------------------------------------------------------------

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
2024
  CATHEDRALS EVERYWHERE FOR THOSE WITH MONITORS TO SEE, Number 1 Main Road (Berlin, Germany)
2017
  Open Loop, Roger's Office (Los Angeles, CA)
2016
  Landgrab the Musical in Virtual Reality, Wind Tunnel Gallery (Pasadena, CA)
  me, from the future., ArtCenter College of Design (Pasadena, CA)

Group Exhibitions and Screenings
2026
  Feminine Urge, (New York, NY) curated by Zarina Nares
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
  Adjunct Faculty in Sculpture Department at Otis College of Art and Design`,
  },

  {
    id: 'contact',
    name: 'Contact',
    type: 'info',
    x: 20,
    y: 420,
    content: `Email: email@filipkostic.computer

Instagram: @flipkostic`,
  },

  // --------------------------------------------------------------------------
  // ARTWORK FOLDERS
  // To add a new artwork: copy one of these blocks, change the fields, save.
  // --------------------------------------------------------------------------

  {
    id: 'pro-mouse-grip',
    name: 'Pro Mouse Grip (2025)',
    type: 'folder',
    x: 20,
    y: 20,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Pro Mouse Grip (1-7), (2025)

Variable size hands on 13x13x31.5" mousepad pedestal

Silicon-Copper cold cast`,
      },
      { name: 'Pro Mouse Grip 1',    type: 'image', url: '/images/ProMouseGrip/SingleHand_01.png' },
      { name: 'Pro Mouse Grip 2',    type: 'image', url: '/images/ProMouseGrip/SingleHand_02.png' },
      { name: 'Installation View',   type: 'image', url: '/images/ProMouseGrip/3quarterHands6Drawings.png' },
    ],
  },

  {
    id: 'bed-pc',
    name: 'Bed PC (2022)',
    type: 'folder',
    x: 20,
    y: 120,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Bed PC, (2022)

Custom built water cooled computer built into the frame of a Bed. Variable screens, blanket, pillows, variable peripheries including Keyboard, mouse, streaming microphone, webcams.`,
      },
      { name: 'Bed PC 2',          type: 'image', url: '/images/BedPC/BedPC_Scherben_Main.jpg' },
      { name: 'Bed PC Home',       type: 'image', url: '/images/BedPC/BedPC_Home.jpg' },
      { name: 'Bed PC (Twin)',     type: 'image', url: '/images/BedPC/Bed_PC_HS_Twin.jpg' },
      { name: 'BedPC(Twin) Install', type: 'image', url: '/images/BedPC/BedPC_HS_Install.jpg' },
    ],
  },

  {
    id: 'booty-bay-open-studios',
    name: 'Booty Bay Open Studios',
    type: 'folder',
    x: 20,
    y: 220,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Booty Bay Open Studios (2020)

HD Video, 7:18 TRT`,
      },
      { name: 'Booty Bay Open Studios', type: 'video', url: 'https://www.youtube.com/embed/EccTUHy3V8A' },
    ],
  },

  {
    id: 'fk-vs-fk',
    name: 'Filip Kostic VS Filip Kostic (2019)',
    type: 'folder',
    x: 120,
    y: 20,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Filip Kostic VS Filip Kostic (2019)

Live Streamed Performance

Filip Kostic VS Filip Kostic was a twitch streamed performance in which I (Filip Kostic) played a game of FIFA against Filip Kostic, professional Serbian soccer player of Eintracht Frankfurt, for the Instagram handle @filipkostic. Halftime performance performed by Mark Fingerhut.

Since 2012 my online identity has been mistaken with that of the Serbian soccer player Filip Kostic through a shared imdb page, randomly being tagged in posts with him in the images on instagram, and being contacted via email for special requests from his fans. In 2019, his PR team contacted me to purchase my instagram handle, I instead counter offered with a proposition to play me in a game of FIFA, winner takes the handle — surprisingly, they agreed. The event was a live performance on Twitch TV complete with a custom layout frame, sponsors, and a half time show.`,
      },
      { name: 'Filip Kostic VS Filip Kostic (video)', type: 'video', url: 'https://www.youtube.com/embed/hdJ_2KLr6qA' },
      { name: 'Instagram Tags', type: 'image', url: '/images/FK_VS_FK/insta_tags.jpg' },
    ],
  },

  {
    id: 'random-things',
    name: 'Random Things',
    type: 'folder',
    x: 620,
    y: 820,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `These are some random images of things I am looking at or thinking about.`,
      },
      { name: 'Fortnite 1',      type: 'image', url: '/images/Random/fortnite1.png' },
      { name: 'Fortnite 2',      type: 'image', url: '/images/Random/fortnite2.png' },
      { name: 'Tracker Dog',     type: 'image', url: '/images/Random/dog.png' },
      { name: 'Frog',            type: 'image', url: '/images/Random/Frog.png' },
      { name: 'Sodium Chloride', type: 'image', url: '/images/Random/salt.png' },
    ],
  },

  // --------------------------------------------------------------------------
  // TO ADD A NEW ARTWORK FOLDER, paste this template and fill it in:
  //
  // {
  //   id: 'my-new-work',           // unique ID, no spaces
  //   name: 'My New Work (2025)',   // display name on desktop + Start menu
  //   type: 'folder',
  //   x: 220,                      // desktop position (pixels from left)
  //   y: 20,                       // desktop position (pixels from top)
  //   items: [
  //     {
  //       name: 'Info',
  //       type: 'info',
  //       content: `Title, (Year)\n\nMedium, dimensions.`,
  //     },
  //     { name: 'Image 1', type: 'image', url: '/images/MyWork/image1.jpg' },
  //     { name: 'Video',   type: 'video', url: 'https://www.youtube.com/embed/VIDEO_ID' },
  //   ],
  // },
  // --------------------------------------------------------------------------
];
