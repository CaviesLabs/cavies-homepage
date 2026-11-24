export const playableAdsPath = "/playable-ads";

/** The quote section's id: the demos' end button scrolls here. */
export const quoteSectionId = "quote";

/** The only message type the page listens for from a demo frame. */
export const ctaMessageType = "cavies-ad-cta";

export type PlayableDemo = {
  /** Folder under public/playable-ads/demos/. */
  id: string;
  name: string;
  genre: string;
  /** Optional poster picture, e.g. "/playable-ads/posters/<id>.webp". The CSS poster is used while null. */
  poster: string | null;
  /** Poster colours (CSS), from the site's own palette. */
  tone: {
    from: string;
    to: string;
    ink: string;
    button: string;
    buttonInk: string;
  };
};

export const playableDemoCaption =
  "Our own game, made into a 20 second playable.";

/** The real file for each is the `generic` network build of that game's demo ad (see README, "Playable ads demos"). */
export const playableDemos: readonly PlayableDemo[] = [
  {
    id: "rise-squeeze",
    name: "Rise & Squeeze",
    genre: "Simulation",
    poster: null,
    tone: {
      from: "#f6e3dc",
      to: "#e8b9ad",
      ink: "#39292d",
      button: "#69313e",
      buttonInk: "#ffffff",
    },
  },
  {
    id: "lantern-burst",
    name: "Lantern Burst",
    genre: "Arcade",
    poster: null,
    tone: {
      from: "#2f2540",
      to: "#69313e",
      ink: "#fff6e6",
      button: "#fff6e6",
      buttonInk: "#39292d",
    },
  },
  {
    id: "cavy-conga",
    name: "Cavy Conga",
    genre: "Action",
    poster: null,
    tone: {
      from: "#e6f2bd",
      to: "#b9d97a",
      ink: "#39292d",
      button: "#69313e",
      buttonInk: "#ffffff",
    },
  },
] as const;

export const demoSrc = (id: string) =>
  `${playableAdsPath}/demos/${id}/index.html`;

/** Exactly these five, in this order. Moloco is not listed. */
export const adNetworks = [
  "Unity Ads",
  "AppLovin",
  "Google App campaigns",
  "TikTok",
  "Meta",
] as const;
