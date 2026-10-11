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
    image: "/work/oddly-orderly-title.webp",
    imageWidth: 1920,
    imageHeight: 1080,
    color: "#e9dfc9",
    tags: ["Game design", "Interaction design", "Godot development"],
    role: "Original game design & development",
    context:
      "An unreleased organizing game built around familiar objects and quiet discoveries.",
    approach:
      "Drag, tap, keyboard, and gamepad controls share the same object-placement system. Visual hints, undo, and alternate solutions make the puzzles approachable, while a journal ties 65 levels across 13 rooms together.",
    details: [
      "Object placement and puzzle feedback",
      "Multiple input methods",
      "Room navigation and visual journal",
    ],
    imageNote: "Title screen · Development build",
    gallery: [
      {
        src: "/work/oddly-orderly-cutlery.webp",
        caption: "Cutlery arrangement · Development build",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/oddly-orderly-jars.webp",
        caption: "Completed jar puzzle · Development build",
        width: 1920,
        height: 1080,
      },
      {
        src: "/work/oddly-orderly-journal.webp",
        caption: "Room journal and progress · Development build",
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
    category: "Mobile puzzle collection",
    headline: "Small puzzles. Clear feedback.",
    description:
      "Twelve skill-based puzzle challenges with a playful character and touch-friendly game interfaces.",
    image: "/work/all-brain-no-luck-brand.webp",
    imageWidth: 1024,
    imageHeight: 500,
    color: "#fff0d4",
    tags: ["Mobile game UI", "Puzzle systems", "Character feedback"],
    role: "Original game design & development",
    context:
      "An unreleased puzzle collection for phones and tablets, with local profiles and progress.",
    approach:
      "Clear boards, concise instructions, and hints make each challenge easy to enter. Character-led results give progress a personality, while shared navigation keeps twelve different puzzle types feeling like one game.",
    details: [
      "Touch-first puzzle boards",
      "Hints, progress, and local profiles",
      "Character-led completion states",
    ],
    imageNote: "Visual identity · Development artwork",
    gallery: [
      {
        src: "/work/all-brain-no-luck-number-slide.webp",
        caption: "Number Slide · Development build",
        width: 820,
        height: 1180,
      },
      {
        src: "/work/all-brain-no-luck-laser-path.webp",
        caption: "Laser Path · Development build",
        width: 820,
        height: 1180,
      },
      {
        src: "/work/all-brain-no-luck-results.webp",
        caption: "Character-led results · Development build",
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
      "A collection of 33 lightweight games spanning puzzles, arcade challenges, and everyday simulations.",
    image: "/work/playables-pho-title.webp",
    imageWidth: 1440,
    imageHeight: 960,
    color: "#ece7da",
    tags: ["Game development", "Canvas interfaces", "Responsive controls"],
    role: "Original browser game design & development",
    context: "An unreleased collection built for the YouTube Playables format.",
    approach:
      "Each game has its own visual identity and interaction loop, with shared support for touch, keyboard controls, saved progress, audio, and localization. The collection is built for the YouTube Playables format and is still in development.",
    details: [
      "33 games across multiple genres",
      "Touch and keyboard interaction",
      "Shared platform integration and localization",
    ],
    imageNote: "Phở Stall title screen · Development build",
    gallery: [
      {
        src: "/work/playables-tide-jars.webp",
        caption: "Tide Jars: color sorting · Development build",
        width: 1440,
        height: 960,
      },
      {
        src: "/work/playables-teahouse-tiles.webp",
        caption: "Teahouse Tiles: mahjong solitaire · Development build",
        width: 1440,
        height: 960,
      },
      {
        src: "/work/playables-dockside-shuffle.webp",
        caption: "Dockside Shuffle: sliding-block puzzles · Development build",
        width: 1440,
        height: 960,
      },
    ],
  },
];
