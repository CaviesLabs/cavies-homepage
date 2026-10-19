import type { Project } from "./projects";

export const gameProjects: Project[] = [
  {
    kind: "game",
    status: "In development",
    slug: "oddly-orderly",
    name: "Oddly Orderly",
    category: "Cozy puzzle game",
    headline: "A place for every little thing.",
    description:
      "Tactile puzzles about arranging everyday objects, with more than one way to put things in place.",
    image: "/work/oddly-orderly-title-screen.webp",
    imageWidth: 1920,
    imageHeight: 1080,
    color: "#e9dfc9",
    tags: ["Game design", "Interaction design", "Godot development"],
    role: "Original game design & development",
    context:
      "An unreleased organizing game about two people moving in together, told through their belongings, with a magpie for company.",
    approach:
      "Drag, tap, keyboard, and gamepad controls share one object-placement system, and nothing requires holding a button. Pencil-sketch hints, undo, and alternate solutions keep the puzzles approachable, while a room-by-room journal ties 100 levels across 20 rooms together.",
    details: [
      "Object placement and puzzle feedback",
      "Multiple input methods",
      "Room-by-room visual journal",
    ],
    imageNote: "Title screen · Development build",
    gallery: [
      {
        src: "/work/oddly-orderly-party.webp",
        caption: "Matching balloons to party hats · Development build",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/oddly-orderly-candles.webp",
        caption:
          "Candles lit after a completed arrangement · Development build",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/oddly-orderly-journal-winter.webp",
        caption: "Room-by-room journal · Development build",
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    kind: "game",
    status: "In development",
    slug: "butterpaw",
    name: "Butterpaw",
    category: "Cozy unpacking game",
    headline: "Unpack a life, one object at a time.",
    description:
      "A cozy unpacking game with a red-panda protagonist, illustrated rooms, and memories tucked into everyday objects.",
    image: "/work/butterpaw-brand.webp",
    imageWidth: 1232,
    imageHeight: 706,
    color: "#efe2c7",
    tags: ["Game prototyping", "World design", "Unity development"],
    role: "Original game concept & prototype",
    context:
      "An unreleased Unity prototype exploring object placement and environmental storytelling.",
    approach:
      "An object tray and room-placement controls turn unpacking into a small discovery loop. Character identity, keepsakes, and memory illustrations establish the world around the prototype. The gallery separates gameplay from development artwork.",
    details: [
      "Object tray and room placement",
      "Mouse, touch, and gamepad controls",
      "Character identity and memory scenes",
    ],
    imageNote: "Visual identity · Development artwork",
    gallery: [
      {
        src: "/work/butterpaw-prototype.webp",
        caption: "Unpacking and item tray · Early prototype",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/butterpaw-family.webp",
        caption: "Family memory · Development artwork",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/butterpaw-bakery.webp",
        caption: "Bakery memory · Development artwork",
        width: 1920,
        height: 1080,
      },
    ],
  },
  {
    kind: "game",
    status: "In development",
    slug: "all-brain-no-luck",
    name: "All Brain No Luck",
    category: "Family puzzle game",
    headline: "Small puzzles. Clear feedback.",
    description:
      "A family puzzle game with twelve skill-based challenges, a daily stage, and an island expedition.",
    image: "/work/all-brain-no-luck-brand.webp",
    imageWidth: 1024,
    imageHeight: 500,
    color: "#fff0d4",
    tags: ["Mobile game UI", "Puzzle systems", "Character feedback"],
    role: "Original game design & development",
    context:
      "An unreleased game for phones and tablets, with parent-managed player profiles, offline play, and an interface in ten languages.",
    approach:
      "Every puzzle is generated from a seed and checked by a solver, so results come from skill rather than chance. Short rule demos, hints, and Pip’s reactions make each challenge easy to start, while Today’s Stage and the Brain Expedition give twelve different puzzle types one shared structure.",
    details: [
      "Twelve challenges, twelve levels each",
      "Seeded, solver-checked puzzles",
      "Ten languages, offline play, parent controls",
    ],
    imageNote: "Visual identity · Development artwork",
    gallery: [
      {
        src: "/work/all-brain-no-luck-home.webp",
        caption:
          "Today’s Stage, the Brain Expedition, and challenges · Development build",
        width: 820,
        height: 1180,
      },
      {
        src: "/work/all-brain-no-luck-cube-hop.webp",
        caption: "Cube Hop puzzle board · Development build",
        width: 820,
        height: 1180,
      },
      {
        src: "/work/all-brain-no-luck-expedition.webp",
        caption: "Brain Expedition island map · Development build",
        width: 820,
        height: 1180,
      },
    ],
  },
  {
    kind: "game",
    status: "In development",
    slug: "browser-games",
    name: "Browser game collection",
    category: "Quick-play browser games",
    headline: "Many ways to play.",
    description:
      "A collection of 53 lightweight games spanning puzzles, card and board classics, arcade challenges, and sports.",
    image: "/work/playables-lantern-burst-title.webp",
    imageWidth: 1440,
    imageHeight: 960,
    color: "#13204a",
    tags: ["Game development", "Canvas interfaces", "Responsive controls"],
    role: "Original browser game design & development",
    context:
      "A collection in development, built for the YouTube Playables format.",
    approach:
      "Each game has its own visual identity and interaction loop, with shared support for touch, keyboard controls, saved progress, audio, and localization. The newest, Lantern Burst, adds a festival-night run with route choices, three bosses, and a daily challenge, balanced with simulated players. The collection is built for the YouTube Playables format and is still in development.",
    details: [
      "53 games across multiple genres",
      "Touch and keyboard interaction",
      "Shared platform integration and localization",
    ],
    imageNote: "Lantern Burst title screen · Development build",
    gallery: [
      {
        src: "/work/playables-lantern-burst-fireworks.webp",
        caption:
          "Lantern Burst: a lantern string bursting into fireworks · Development build",
        width: 1440,
        height: 960,
      },
      {
        src: "/work/playables-boathouse-billiards.webp",
        caption:
          "Boathouse Billiards: 8-ball against an otter · Development build",
        width: 1440,
        height: 960,
      },
      {
        src: "/work/playables-pinecone-peaks.webp",
        caption: "Pinecone Peaks: TriPeaks solitaire · Development build",
        width: 1440,
        height: 960,
      },
    ],
  },
];
