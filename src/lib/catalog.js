const asset = (name) =>
  `https://base44.app/api/apps/6acc0a7e6f38eebe1e75673f/files/mp/public/6acc0a7e6f38eebe1e75673f/${name}`;

export const artwork = {
  tripleA: asset("4327acaf5_Triple-A.png"),
  flames: asset("ac9b03a37_flames-hit.png"),
  spy: asset("bb67aad6b_spy-who-looked-back.png"),
  avengers: asset("f9bffe3c7_the-avengers.png"),
  velocity: asset("5e29fafb7_velocity.png"),
};

export const catalog = [
  {
    title: "Matthew: The Movie",
    year: 2026,
    duration: "1h 37m",
    category: "continue",
    gradient: ["#8d1019", "#111827"],
    description:
      "Matthew's story takes center stage in this Mattflix original — a big-screen adventure filled with surprises, unforgettable moments, and one very determined hero.",
  },
  {
    title: "The Flames Hit",
    year: 2026,
    duration: "2h 17m",
    category: "continue",
    image: artwork.flames,
    gradient: ["#b91c1c", "#422006"],
    description: "When the Flames start hitting they start winning.",
  },
  {
    title: "The Spy Who Looked Back",
    year: 2026,
    duration: "2h 25m",
    category: "continue",
    image: artwork.spy,
    video:
      "https://media.base44.com/videos/public/6acc0a7e6f38eebe1e75673f/f85ca4991_the-spy-who-looked-back.mp4",
    gradient: ["#172554", "#111827"],
    description:
      "A spy on the run discovers that the biggest threat isn't ahead of him — it is him.",
  },
  {
    title: "The High Marker",
    year: 2026,
    category: "continue",
    gradient: ["#172554", "#111827"],
    description: "A exciting tale about Mark and his intersting marker.",
  },
  {
    title: "Triple A",
    year: 2026,
    duration: "3m 45s",
    category: "continue",
    image: artwork.tripleA,
    video:
      "https://screenapp.io/app/api/public/files/Roek5LSD921rJeDt0RYU1f_4",
    gradient: ["#164e63", "#312e81"],
    description: "Six people come together to put an end to a common enemy.",
  },
  {
    title: "The Outpost",
    year: 2025,
    category: "continue",
    gradient: ["#334155", "#0f172a"],
    description:
      "A remote research team loses contact with the outside world after finding something buried beneath the ice.",
  },
  {
    title: "After Dark",
    year: 2026,
    category: "continue",
    gradient: ["#3f0b23", "#111827"],
    description: "Three friends discover that their town has a second life after midnight.",
  },
  {
    title: "Code Zero",
    year: 2024,
    category: "continue",
    gradient: ["#064e3b", "#172554"],
    description:
      "An ordinary programmer uncovers a security key that powerful people will do anything to recover.",
  },
  {
    title: "Wild Horizon",
    year: 2026,
    category: "continue",
    gradient: ["#713f12", "#1e293b"],
    description: "A survival expedition becomes a fight against a storm no one predicted.",
  },

  {
    title: "Night Shift",
    year: 2025,
    category: "popular",
    gradient: ["#450a0a", "#1f2937"],
    description: "A hospital security guard realizes one patient has never appeared on any record.",
  },
  {
    title: "Three Against Three",
    year: 2026,
    category: "popular",
    gradient: ["#3f6212", "#172554"],
    description: "Its a Marty story, with some others as well.",
  },
  {
    title: "Paper Kingdom",
    year: 2025,
    category: "popular",
    gradient: ["#713f12", "#292524"],
    description: "A brilliant strategist assembles an unlikely crew for an impossible heist.",
  },
  {
    title: "The Company",
    year: 2025,
    category: "popular",
    gradient: ["#581c87", "#172554"],
    description: "In the middle of nothing a company was created to save everyone.",
  },
  {
    title: "Black Tide",
    year: 2025,
    category: "popular",
    gradient: ["#082f49", "#0f172a"],
    description: "A salvage crew finds a signal beneath the ocean floor.",
  },
  {
    title: "The Avengers",
    year: 2012,
    rating: "PG-13",
    duration: "2h 26m",
    category: "popular",
    image: artwork.avengers,
    gradient: ["#7f1d1d", "#292524"],
    description:
      "Earth's mightiest heros assemble to defeat the all powerfull Loki, of Asguard.",
  },

  {
    title: "The Stolen Card",
    year: 2026,
    category: "new",
    gradient: ["#8d1019", "#111827"],
    description: "Three friends race to steal a card to copy it for their own good.",
  },
  {
    title: "Static",
    year: 2026,
    category: "new",
    gradient: ["#312e81", "#111827"],
    description: "A radio host starts receiving broadcasts from tomorrow.",
  },
  {
    title: "Red Planet",
    year: 2026,
    category: "new",
    gradient: ["#9a3412", "#1c1917"],
    description:
      "The first crewed mission to Mars loses communication just hours before landing.",
  },
  {
    title: "Echo House",
    year: 2026,
    category: "new",
    gradient: ["#334155", "#3f0b23"],
    description: "A family moves into a house where every room remembers a different past.",
  },
  {
    title: "Velocity",
    year: 2026,
    duration: "2h 32m",
    category: "new",
    image: artwork.velocity,
    gradient: ["#1d4ed8", "#111827"],
    description: "A street racer discovers a prototype vehicle capable of impossible speeds.",
  },
  {
    title: "Wildfire",
    year: 2026,
    category: "new",
    gradient: ["#b91c1c", "#422006"],
    description:
      "A wildfire traps a rescue team between a canyon and a rapidly changing wind.",
  },
  {
    title: "Orbit",
    year: 2026,
    category: "new",
    gradient: ["#0c4a6e", "#1e1b4b"],
    description:
      "Astronauts aboard a damaged station have one window to repair the system and return home.",
  },
];

export const heroSlides = [
  {
    title: "Matthew: The Movie",
    year: 2026,
    duration: "1h 37m",
    gradient: ["#6c1019", "#0d1119"],
  },
  { title: "The Flames Hit", year: 2026, duration: "2h 17m", image: artwork.flames },
  {
    title: "The Spy Who Looked Back",
    year: 2026,
    duration: "2h 25m",
    image: artwork.spy,
  },
];

export const findTitle = (title) => catalog.find((item) => item.title === title) || null;

export const titlesFor = (category) => catalog.filter((item) => item.category === category);