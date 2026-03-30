// ============================================================================
// portfolioContent.ts
// ============================================================================
// HOW TO ADD A NEW ARTWORK FOLDER:
//   1. Add an entry to the `desktopIcons` array below with type: 'folder'
//   2. Add items (info, image, video) inside its `items` array
//   Done — it will automatically appear in the desktop and Start > Artworks menu.
// ============================================================================

import type { DesktopIcon } from './portfolioTypes';

// ----------------------------------------------------------------------------
// DEFAULT ICONS
// Set the image used for each file type across the whole desktop and inside
// folder windows. Put your images in public/images and update the paths here.
// ----------------------------------------------------------------------------
export const iconDefaults = {
  folder:   '/images/Icons/folder64_01.png',  // default icon for all folders
  info:     '/images/Icons/txt64_01.png',     // default icon for all text files
  image:    '/images/Icons/image64_01.png',   // default icon for all image files
  video:    '/images/Icons/video64_01.png',   // default icon for all video files
  audio:    '/images/Icons/audio64_01.png',   // default icon for audio files
  bandcamp: '/images/Icons/audio64_01.png',   // reuses audio icon, change if you want
  startButton: '/images/Icons/folder64_01.png', //icon for start buttton
};

// ----------------------------------------------------------------------------
// DESKTOP BACKGROUND
// ----------------------------------------------------------------------------
export const background = {
  type: 'image' as 'image' | 'color', // 'image' or 'color'
  color: '#001EFF',                    // used when type is 'color'
  image: '/images/Dreamhack1.jpg', // used when type is 'image'
  tiled: false,                        // true = tile, false = cover/stretch
};

// ----------------------------------------------------------------------------
// CV — used by both the desktop icon and Start > CV/Contact > CV
// Edit this one string and both places update automatically.
// ----------------------------------------------------------------------------
export const cvContent = `Filip Kostic
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
  Fantasy Futbol, High Line Channel, (New York, NY) curated by Constanza Venezuela
  Feminine Urge, Tribeca Gallery, (New York, NY) curated by Zarina Nares
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
  Adjunct Faculty in Sculpture Department at Otis College of Art and Design`;

// ----------------------------------------------------------------------------
// CONTACT — used by the desktop icon and Start > CV/Contact > Contact
// ----------------------------------------------------------------------------
export const contactContent = `Email: email@filipkostic.computer

Instagram: @flipkostic`;

// ----------------------------------------------------------------------------
// DESKTOP ICONS
// Each entry is either a standalone info/text file or a folder with items.
//
// TYPES:
//   'info'     — opens a text window
//   'folder'   — opens a folder window with items inside
//   'image'    — opens an image viewer       (used inside folder items)
//   'video'    — opens a video player        (used inside folder items)
//              YouTube and Vimeo embed URLs work automatically.
//   'audio'    — opens a native audio player (used inside folder items)
//   'bandcamp' — opens a Bandcamp embed      (used inside folder items)
//              Use the src URL from Bandcamp's Share > Embed iframe code.
// ----------------------------------------------------------------------------
export const desktopIcons: DesktopIcon[] = [

  // --------------------------------------------------------------------------
  // STANDALONE TEXT FILES (appear directly on desktop)
  // --------------------------------------------------------------------------

  {
    id: 'cv',
    name: 'CV',
    type: 'info',
    content: cvContent,
  },

  {
    id: 'contact',
    name: 'Contact',
    type: 'info',
    content: contactContent,
  },

  // --------------------------------------------------------------------------
  // ARTWORK FOLDERS
  // --------------------------------------------------------------------------

  {
    id: 'pro-mouse-grip',
    name: 'Pro Mouse Grip & Counter-Strike spray pattern drawing(2025)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Pro Mouse Grip (1-7), 2025
Variable size hands on 13x13x31.5" mousepad pedestal
Silicon-Copper cold cast

Counter-Strike spray pattern drawing (1-18), 2025
55x36cm
Graphite drawing on paper, aluminum frame, mousepad backing

Counter-Strike 1.6 being played in the other room (2025)
the sound of Counter-Strike 1.6 being played in another room coming through the walls of the gallery for the duration of the exhibition.

Images from the exhibition IF/THEN at the Ujazdowski Castle Center for Contemporary Art.
`,
      },
      { name: 'Pro Mouse Grip & Counter-Strike spray pattern drawing Install 1', type: 'image', url: '/images/WarsawForWebsite/WhiteWall_Hands_01.jpg' },
      { name: 'Pro Mouse Grip (1 of 7)',                                         type: 'image', url: '/images/WarsawForWebsite/SingleHand_01.jpg' },
      { name: 'Counter-Strike spray pattern drawing (1 of 18)',                  type: 'image', url: '/images/WarsawForWebsite/SingleBlueWall_01.jpg' },
      { name: 'Pro Mouse Grip & Counter-Strike spray pattern drawing Install 2', type: 'image', url: '/images/WarsawForWebsite/HandsStraightOn_01.jpg' },
      { name: 'Pro Mouse Grip (2 of 7)',                                         type: 'image', url: '/images/WarsawForWebsite/SingleHand_02.jpg' },
      { name: 'Pro Mouse Grip (3 of 7)',                                         type: 'image', url: '/images/WarsawForWebsite/CloseupMouseHand_01.jpg' },
      { name: 'Pro Mouse Grip & Counter-Strike spray pattern drawing Install 3', type: 'image', url: '/images/WarsawForWebsite/Wide_01.jpg' },
      { name: 'Counter-Strike 1.6 being played in the other room (excerpt)',     type: 'audio',    url: '/images/WarsawForWebsite/CS_OtherRoom_Excerpt.mp3' },
    ],
  },

  {
    id: 'sarcophagus-mouse',
    name: 'Sarcophagus for my dead motherboard (and mouse)(2025)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Sarcophagus for my dead motherboard (and mouse), 2025
        ABS, Crushed Silicon Rock, Polyurethane, Damaged Motherboard, Mouse
`,
      },
      { name: 'Sarcophagus for my dead motherboard (and mouse) 1', type: 'image', url: '/images/SarcophagusMouse/3Quarter.jpg' },
      { name: 'Sarcophagus for my dead motherboard (and mouse) 2', type: 'image', url: '/images/SarcophagusMouse/3quarter1.jpg' },
      { name: 'Sarcophagus for my dead motherboard (and mouse) Detail', type: 'image', url: '/images/SarcophagusMouse/Detail.jpg' },
      { name: 'Sarcophagus for my dead motherboard (and mouse) Deatil Lid', type: 'image', url: '/images/SarcophagusMouse/TopDownView.jpg' },
      
    ],
  },

  {
    id: 'cathedrals',
    name: 'CATHEDRALS EVERYWHERE FOR THOSE WITH MONITORS TO SEE (2024)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `CATHEDRALS EVERYWHERE FOR THOSE WITH MONITORS TO SEE was a solo exhibition at the gallery Number 1 Main Road in Berlin. September 12.2024 - October 12, 2024.
        In order as seen in folder:

        Sarcophagus for my dead computer, 2024
        68.5x68.5x31cm (Ultra Tower Case)
        UV Resin, Crushed Silicon Rock, Polyurethane, Water damaged computer hardware
        
        
        the boys convening, 2024
        61x61cm (Full Tower Side Panel)
        UV Resin, Crushed Silicon Rock, Polyurethane 
        
        Brotherhood (The Burning Crusade), 2024
        68x68cm (Full Tower Side Panel)
        UV Resin, Crushed Silicon Rock, Polyurethane
        
        Assmembly of the First Computer (At a Sleepoever), 2024
        32x31cm (Micro-ITX Side Panel)
        UV Resin, Crushed Silicon Rock, Polyurethane
        
        The first computer (Financed by Mom), 2024
        32x32cm (Mini-ITX Side Panel)
        UV Resin, Crushed Silicon Rock, Polyurethane
        
        LAN Cable Management, 2024
        Variable size
        Network cables, network panel`,
      },
      { name: 'Sarcophagus for my dead computer, 2024', type: 'image', url: '/images/Cathedrals/Sarc_3quarter_1.jpg' },
      { name: 'Sarcophagus Side 1',                     type: 'image', url: '/images/Cathedrals/SarcDetail2.jpg' },
      { name: 'Sarcophagus Side 2',                     type: 'image', url: '/images/Cathedrals/SarcDetail3.jpg' },
      { name: 'Sarcophagus Side 3',                     type: 'image', url: '/images/Cathedrals/SarcDetail1.jpg' },
      { name: 'Sarcophagus Side 4',                     type: 'image', url: '/images/Cathedrals/SarcDetail4.jpg' },
      { name: 'Sarcophagus Lid',                        type: 'image', url: '/images/Cathedrals/SarcLid.jpg' },
      { name: 'Sarcophagus Detail 1',                   type: 'image', url: '/images/Cathedrals/SarCDetail7.jpg' },
      { name: 'the boys convening, 2024',               type: 'image', url: '/images/Cathedrals/BoysConvening1.jpg' },
      { name: 'Brotherhood (The Burning Crusade), 2024',type: 'image', url: '/images/Cathedrals/HeadOn_Boys.jpg' },
      { name: 'Brotherhood Detail 1',                   type: 'image', url: '/images/Cathedrals/BrotherhoodDetail.jpg' },
      { name: 'Assembly of the First Computer (At a Sleepover), 2024', type: 'image', url: '/images/Cathedrals/FirstAssemblyFront.jpg' },
      { name: 'The first computer (Financed by Mom), 2024',            type: 'image', url: '/images/Cathedrals/Woman_Front.jpg' },
      { name: 'LAN Cable Management, 2024 1',           type: 'image', url: '/images/Cathedrals/LanCableManagement_1.jpg' },
      { name: 'LAN Cable Management, 2024 2',           type: 'image', url: '/images/Cathedrals/LanCableManagement_2.jpg' },
      { name: 'LAN Cable Management, 2024 3',           type: 'image', url: '/images/Cathedrals/LanCableManagement_3.jpg' },
      { name: 'LAN Cable Management, 2024 4',           type: 'image', url: '/images/Cathedrals/LanCableManagementSmall_1.jpg' },
      { name: 'LAN Cable Management, 2024 5',           type: 'image', url: '/images/Cathedrals/LanCableManagementSmall_2.jpg' },
      { name: 'Install 1',                              type: 'image', url: '/images/Cathedrals/Install_1.jpg' },
      { name: 'Install 2',                              type: 'image', url: '/images/Cathedrals/Install_2.jpg' },
      { name: 'Install 3',                              type: 'image', url: '/images/Cathedrals/Install_3.jpg' },
      { name: 'Install 4',                              type: 'image', url: '/images/Cathedrals/Install3.jpg' },
    ],
  },

  {
    id: 'only_show',
    name: "The only show I've ever curated (my time as a technical artist on Warner bros game) at Hogwarts (2024)",
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `The only show I've ever curated (my time as a technical artist on Warner bros game) at Hogwarts, 2024
Variable size print and looping video
Video texture asset from game of Filip and his roommate, vinyl print of texture map from game of pre-approved paintings from films and royalty free Getty Collection`,
      },
      { name: "The only show I've ever curated (Install)", type: 'image', url: '/images/OnlyShow/OnlyShowInstall.jpg' },
    ],
  },

  {
    id: 'couchPC',
    name: 'Couch Computer (2023)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Couch Computer, 2023
Custom couch, custom water cooled computer, split keyboard, mouse and other peripherals, two monitors, 1 hour looped desktop performance two channel video`,
      },
      { name: 'Couch Computer, 2023 1', type: 'image', url: '/images/couchPC/3quarterCouch.jpg' },
      { name: 'Couch Computer, 2023 2', type: 'image', url: '/images/couchPC/AltCouch.jpg' },
      { name: 'Couch Computer, 2023 3', type: 'image', url: '/images/couchPC/sideview.jpg' },
    ],
  },

  {
    id: 'Fortnite',
    name: 'Fortnite:007 Merciful Angel (2022)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Fortnite:007 Merciful Angel, 2022
Software
Fortnite: 007 Merciful Angel is a remake of the game Fortnite in Unreal Engine 5. The project was commissioned by Aaron Moulton for his show "The Influencing Machine" at the Ujazdowski Castle Museum for Contemporary Art in Warsaw.`,
      },
      { name: 'Fortnite: 007 Merciful Angel Poster',           type: 'image', url: '/images/Fortnite007/posterSmall.jpg' },
      { name: 'Fortnite: 007 Merciful Angel Opening Sequence', type: 'video', url: 'https://www.youtube.com/embed/xzlieVVxu-U' },
      { name: 'Fortnite: 007 Merciful Angel Scarlett Witch',   type: 'video', url: 'https://www.youtube.com/embed/KGypetPtGuQ' },
    ],
  },

  {
    id: 'PCBook',
    name: 'Personal Computers (2022)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Personal Computers, 2022
Personal Computers is a book of computer builds archived from 2002-2022 sourced from all over the internet as well as my own personal computer builds. Published by Special Effects. 2 Editions of the book were published, the second Edition was co-designed with Rachel Jax and Brandon Bandy. Photo documentation of the book taken by Brandon Bandy.`,
      },
      { name: 'Personal Computers, 2nd Edition Cover',     type: 'image', url: '/images/PersonalComputers/PC_2_Cover.jpg' },
      { name: 'Personal Computers, 2nd Edition Interior 1',type: 'image', url: '/images/PersonalComputers/PC_2_Inside1.jpg' },
      { name: 'Personal Computers, 2nd Edition Interior 2',type: 'image', url: '/images/PersonalComputers/PC_2_Inside2.jpg' },
      { name: 'Personal Computers, 1st Edition Cover',     type: 'image', url: '/images/PersonalComputers/PC_1_Cover.jpg' },
      { name: 'Personal Computers, 1st Edition Interior 1',type: 'image', url: '/images/PersonalComputers/PC_1_Inside1.jpg' },
      { name: 'Personal Computers, 1st Edition Interior 2',type: 'image', url: '/images/PersonalComputers/PC_1_Inside2.jpg' },
    ],
  },

  {
    id: 'bed-pc',
    name: 'Bed PC (2022)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Bed PC, (2022)

Custom built water cooled computer built into the frame of a Bed. Variable screens, blanket, pillows, variable peripheries including Keyboard, mouse, streaming microphone, webcams.`,
      },
      { name: 'Bed PC 2',            type: 'image', url: '/images/BedPC/BedPC_Scherben_Main.jpg' },
      { name: 'Bed PC Home',         type: 'image', url: '/images/BedPC/BedPC_Home.jpg' },
      { name: 'Bed PC (Twin)',       type: 'image', url: '/images/BedPC/Bed_PC_HS_Twin.jpg' },
      { name: 'BedPC(Twin) Install', type: 'image', url: '/images/BedPC/BedPC_HS_Install.jpg' },
    ],
  },

  {
    id: 'booty-bay-open-studios',
    name: 'Booty Bay Open Studios (2020)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Booty Bay Open Studios (2020)

HD Video, 7:18 TRT`,
      },
      { name: 'Booty Bay Open Studios (video)', type: 'video', url: 'https://www.youtube.com/embed/EccTUHy3V8A' },
      { name: 'Booty Bay Screenshot 1',         type: 'image', url: '/images/BootyBay/BBOS_04.jpg' },
      { name: 'Booty Bay Screenshot 2',         type: 'image', url: '/images/BootyBay/BBOS_05.jpg' },
      { name: 'Booty Bay Screenshot 3',         type: 'image', url: '/images/BootyBay/BBOS_07.jpg' },
    ],
  },

  {
    id: 'fps',
    name: 'Running at Frame Rate (2020)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Running at Frame Rate, 2020
Software
Running at Frame Rate is a software which foregrounds frame rate as its core mechanic. It asserts that 'running at frame rate' is an economic proposition. The artwork addresses the assumption in gaming and technology that 'realism' is the constant and exponential movement of hardware and software towards photo-real representation of the physical world. In the work, the computer is the main character whose primary goal is to render efficiently while trying to push itself to extreme ends. The software continually remembers its performance and reacts to it—at times optimizing itself by taking breaks, resetting, or trying to render better. It is an exercise in world building through both the pragmatic assembling of the world on screen, and the narrative that emerges from the computer's reaction to the software. It is through this that the work questions the increasingly accurate photoreal representation of the world in games and simulation, without the simultaneous representation of the material realities of said world.`,
      },
      { name: 'Running at Frame Rate (video)', type: 'video', url: 'https://www.youtube.com/embed/n2lBKq8vm2k' },
    ],
  },

  {
    id: 'fk-vs-fk',
    name: 'Filip Kostic VS Filip Kostic (2019)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Filip Kostic VS Filip Kostic (2019)

Live Streamed Performance

Filip Kostic VS Filip Kostic was a twitch streamed performance in which I (Filip Kostic) played a game of FIFA against Filip Kostic, professional Serbian soccer player of Eintracht Frankfurt, for the Instagram handle @filipkostic. Halftime performance performed by Mark Fingerhut.

Since 2012 my online identity has been mistaken with that of the Serbian soccer player Filip Kostic through a shared imdb page, randomly being tagged in posts with him in the images on instagram, and being contacted via email for special requests from his fans. In 2019, his PR team contacted me to purchase my instagram handle, I instead counter offered with a proposition to play me in a game of FIFA, winner takes the handle — surprisingly, they agreed. The event was a live performance on Twitch TV complete with a custom layout frame, sponsors, and a half time show.

Filip Kostic, Filip Kostic VS Filip Kostic, 2019. Part of Fantasy Futbol, a High Line Channel, on view May 6, 2026 –July 6, 2026. Photo by Timothy Schenck. Courtesy of the High Line.`,
      },
      { name: 'Filip Kostic VS Filip Kostic (video)', type: 'video', url: 'https://www.youtube.com/embed/hdJ_2KLr6qA' },
      { name: 'Highline Channel Install 01',        type: 'image', url: '/images/FK_VS_FK/3Quarter_02_Hero.jpg' },
      { name: 'Highline Channel Install 02',        type: 'image', url: '/images/FK_VS_FK/Front_02_Hero.jpg' },
      { name: 'Highline Channel Install 03',        type: 'image', url: '/images/FK_VS_FK/Front_01.jpg' },
      { name: 'Highline Channel Install 04',        type: 'image', url: '/images/FK_VS_FK/3Quarter_01.jpg' },
      { name: 'Jersey',        type: 'image', url: '/images/FK_VS_FK/Jersey.jpg' },
      { name: 'Instagram Tags',type: 'image', url: '/images/FK_VS_FK/insta_tags.jpg' },
      { name: 'Emails',        type: 'image', url: '/images/FK_VS_FK/emails.jpg' },
      { name: 'First Contact', type: 'image', url: '/images/FK_VS_FK/hubert.jpg' },
      { name: 'IMDB',          type: 'image', url: '/images/FK_VS_FK/imdb.jpg' },
    ],
  },

  {
    id: 'zetetic',
    name: 'Zetetic Method (2018)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Zetetic Method, 2018
HD Video, TRT 4:38 looping.
Installation view at the ArtCenter Windtunnel Gallery`,
      },
      { name: 'Zetetic Method (2018)', type: 'video', url: 'https://www.youtube.com/embed/t0jTg-3a71A' },
      { name: 'Zetetic Method Install',type: 'image', url: '/images/Zetetic/Zetetic.jpg' },
    ],
  },

  {
    id: 'barycenter',
    name: 'Barycenter (2018)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Barycenter, 2018
Real-time simulation
Barycenter is a simulation of two asteroids in an orbit around the exhibition space, destined to collide once at random during open hours, and then continue on their adjusted orbit for the rest of the show.`,
      },
      { name: 'Barycenter (idle)',     type: 'image', url: '/images/Barycenter/Barycenter_01.jpeg' },
      { name: 'Barycenter (collision)',type: 'image', url: '/images/Barycenter/BaryCenter_02.jpeg' },
    ],
  },

  {
    id: 'Open-loop',
    name: 'Open Loop (2017)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Open Loop, 2017
Open Loop was a solo exhibition at Roger's Office in Los Angeles that spanned from October 7, 2017 - November 4, 2017
In order as seen in folder:

Open Loop, 2017
Real-time AI simulation, 8 monitors, custom built computer, custom GPU and CPU cooling loops, steel and acrylic structure

Closed Loop (Red), 2017
Heat-bent PETG tubing, LED compression fittings, pump and reservoir, computer power supply, red coolant

Closed Loop (Green), 2017
Heat-bent PETG tubing, LED compression fittings, pump and reservoir, computer power supply, green coolant

Closed Loop (Blue), 2017
Heat-bent PETG tubing, LED compression fittings, pump and reservoir, computer power supply, blue coolant`,
      },
      { name: 'Open Loop (2017) 1',      type: 'image', url: '/images/OpenLoop/OpenLoop_1.jpg' },
      { name: 'Open Loop (2017) 2',      type: 'image', url: '/images/OpenLoop/OpenLoop_2.jpg' },
      { name: 'Open Loop (2017) 3',      type: 'image', url: '/images/OpenLoop/OpenLoop_1.jpg' },
      { name: 'Open Loop (2017) Detail', type: 'image', url: '/images/OpenLoop/OpenLoop_PC.jpg' },
      { name: 'Open Loop (Video)',        type: 'video', url: 'https://www.youtube.com/embed/HwsuJSWdzAQ' },
      { name: 'Closed Loop (Red) (2017)',  type: 'image', url: '/images/OpenLoop/ClosedLoop_Red.jpg' },
      { name: 'Closed Loop (Green) (2017)',type: 'image', url: '/images/OpenLoop/ClosedLoop_Green.jpeg' },
      { name: 'Closed Loop (Blue) (2017)', type: 'image', url: '/images/OpenLoop/ClosedLoop_Blue.jpg' },
    ],
  },

  {
    id: 'landgrab',
    name: 'Landgrab the Musical in Virtual Reality (2016)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Landgrab the Musical in Virtual Reality, 2016
Variable size installation, VR Hardware, 5.1 Channel surround sound, 488x488cm staged platform, Inkjet Movie Poster scaled prints.

Solo exhibition, December 2016-February 2017 at the Wind Tunnel Gallery, Pasadena.`,
      },
      { name: 'Landgrab the Musical (install 1)',   type: 'image', url: '/images/Landgrab/Installation_NoFigure.jpg' },
      { name: 'Landgrab the Musical (install 2)',   type: 'image', url: '/images/Landgrab/Installation_Tyler.jpeg' },
      { name: 'Landgrab the Musical (game view 1)', type: 'image', url: '/images/Landgrab/Figure_Screengrab.jpg' },
      { name: 'Landgrab the Musical (install 3)',   type: 'image', url: '/images/Landgrab/Installation_CloseUp.jpg' },
      { name: 'Landgrab the Musical (game view 2)', type: 'image', url: '/images/Landgrab/Landgrab_Still1.jpg' },
      { name: 'Landgrab the Musical (game view 3)', type: 'image', url: '/images/Landgrab/Landgrab_Still2.jpg' },
      { name: 'Lie In My Wake Show Poster',         type: 'image', url: '/images/Landgrab/MyWakePoster.png' },
      { name: 'Scale Shift Show Poster',            type: 'image', url: '/images/Landgrab/ScaleShiftPoster.jpg' },
      { name: 'Reflections Show Poster',            type: 'image', url: '/images/Landgrab/reflectionsPoster.jpg' },
      { name: 'Vanishing Point Lovers Show Poster', type: 'image', url: '/images/Landgrab/vanishingposter.jpg' },
      { name: 'Landgrab the Musical excerpt (video)', type: 'video', url: 'https://www.youtube.com/embed/aL5qHYetyZI' },
    ],
  },

  {
    id: 'oculusrock',
    name: 'Oculus Rock (2016)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Oculus Rock, 2016
Concrete, computer hardware, oculus virtual reality headset, sight specific model of environment the rock is shown in`,
      },
      { name: 'Oculus Rock (install 1)', type: 'image', url: '/images/Oculusrock/oculusrock_1.jpeg' },
      { name: 'Oculus Rock (install 2)', type: 'image', url: '/images/Oculusrock/oculusrock_2.jpeg' },
      { name: 'Oculus Rock (install 3)', type: 'image', url: '/images/Oculusrock/oculusrock_3.jpeg' },
      { name: 'Oculus Rock (install 4)', type: 'image', url: '/images/Oculusrock/oculusrock_4.jpeg' },
      { name: 'Oculus Rock (install 5)', type: 'image', url: '/images/Oculusrock/oculusrock_5.jpeg' },
      { name: 'Oculus Rock (install 6)', type: 'image', url: '/images/Oculusrock/oculusrock_6.jpeg' },
      { name: 'Oculus Rock (video)',     type: 'video', url: 'https://player.vimeo.com/video/162149041' },
    ],
  },

  {
    id: 'exeexp',
    name: 'EXE.EXP (ongoing)',
    type: 'folder',
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Executable Experience (EXE.EXP), 2017-
Software
Executable Experience (EXE.EXP) is an ongoing practice in which I produce site specific executable files as works based on a short deadline as defined by an exhibition, conference, talk, or any platform under which work could be commissioned and shown. The works are then packaged and editioned as a CD or USB with an installation guide.
In order as seen in folder:

Executable Experience V1, 2017
Virtual reality software, 8 minute approximate TRT
Shown at and commissioned by SPRINGBREAK Art Show, 2017

Executable Experience V2, 2017
Virtual reality software
Shown at and commissioned by TSALA as part of the group show Reality Show, 2017

Executable Experience V3, 2018
Augmented Reality software installed on the gallerist's phone.
Shown and commissioned by Pool Party as part of the group show Belly Flop, 2018

Executable Experience V4, 2018
Virtual Reality video
Shown and commissioned by Projektwohnung Krudebude as part of the group show Falschung, 2018`,
      },
      { name: 'EXE.EXP Poster',          type: 'image', url: '/images/EXEEXP/ExeExpCover.jpg' },
      { name: 'Executable Experience V1', type: 'video', url: 'https://www.youtube.com/embed/zJ53U6278Rw' },
      { name: 'Executable Experience V2', type: 'video', url: 'https://www.youtube.com/embed/lfAxWHpf7kU' },
      { name: 'Executable Experience V3', type: 'video', url: 'https://www.youtube.com/embed/4RF1jD0mNRk' },
      { name: 'Executable Experience V4', type: 'video', url: 'https://www.youtube.com/embed/6kGrhJxOGQ0' },
    ],
  },


  {
    id: 'random-things',
    name: 'Random Things',
    type: 'folder',
    x: 864,
    y: 16,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `These are some random images of things I am looking at or thinking about.`,
      },
      { name: 'Fortnite',      type: 'image', url: '/images/Random/fortnite1.png' },
      { name: 'My Studio 1',      type: 'image', url: '/images/Random/studio.jpg' },
      { name: 'My Studio 2',      type: 'image', url: '/images/Random/studio1.jpg' },
      { name: 'Tracker Dog',     type: 'image', url: '/images/Random/dog.png' },
      { name: 'Frog',            type: 'image', url: '/images/Random/Frog.png' },
      { name: 'Sodium Chloride', type: 'image', url: '/images/Random/salt.png' },
      { name: 'Clarity - Line Rider Track', type: 'video', url: 'https://www.youtube.com/embed/evd4u2Hahmg' },
      { name: 'Plate Gloves',      type: 'image', url: '/images/Random/gloves.jpg' },
      { name: 'Jeff Probst Weird',      type: 'image', url: '/images/Random/jeffprobst.jpg' },
      { name: 'Blizzard Employee Skateboard',      type: 'image', url: '/images/Random/skateboard.webp' },
      { name: 'PETG Test Print (spray painted)',      type: 'image', url: '/images/Random/relieftest.jpg' },
      { name: 'Dylan Brady - Of Course I still Love You', type: 'video', url: 'https://www.youtube.com/embed/xDootNGnt6s' },
    ],
  },

  {
    id: 'computer-builds',
    name: 'Custom Computer Builds (ongoing)',
    type: 'folder',
    x: 864,
    y: 116,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `These are computers I've built as sort of sculptural objects that I also use to make my work. They are fully functional`,
      },
      { name: 'Wetware 1',      type: 'image', url: '/images/CustomPCS/wetware.jpg' },
      { name: 'Wetware 2',      type: 'image', url: '/images/CustomPCS/wetware1.jpg' },
      { name: 'Wetware 3',      type: 'image', url: '/images/CustomPCS/wetware2.jpg' },
      { name: 'Studio Personal Computer 1',      type: 'image', url: '/images/CustomPCS/3quarter.jpg' },
      { name: 'Studio Personal Computer 2',      type: 'image', url: '/images/CustomPCS/Front.jpg' },
      { name: 'Fountain of Everything (server)',      type: 'image', url: '/images/CustomPCS/WholeCollage.jpg' },
      
    ],
    
  },

  {
    id: 'ipad-paintings',
    name: 'ipad paintings (ongoing)',
    type: 'folder',
    x: 970,
    y: 116,
    items: [
      {
        name: 'Info',
        type: 'info',
        content: `Some still life paintings I made on my ipad on procreate.`,
      },
      { name: 'Airport',      type: 'image', url: '/images/ipad/Airport.jpg' },
      { name: 'Harris',      type: 'image', url: '/images/ipad/Harris.jpg' },
    
    ],
    
  },

  // --------------------------------------------------------------------------
  // TO ADD A NEW ARTWORK FOLDER, paste this template and fill it in:
  //
  // {
  //   id: 'my-new-work',           // unique ID, no spaces
  //   name: 'My New Work (2025)',   // display name on desktop + Start menu
  //   type: 'folder',
  //   x: 900,
  //   y: 50, 
  //   items: [
  //     {
  //       name: 'Info',
  //       type: 'info',
  //       content: `Title, (Year)\n\nMedium, dimensions.`,
  //     },
  //     { name: 'Image 1',   type: 'image',    url: '/images/MyWork/image1.jpg' },
  //     { name: 'Video',     type: 'video',    url: 'https://www.youtube.com/embed/VIDEO_ID' },
  //     { name: 'Audio',     type: 'audio',    url: '/audio/mytrack.mp3' },
  //     { name: 'Bandcamp',  type: 'bandcamp', url: 'https://bandcamp.com/EmbeddedPlayer/track=XXXXXXX/...' },
  //   ],
  // },
  // --------------------------------------------------------------------------
];