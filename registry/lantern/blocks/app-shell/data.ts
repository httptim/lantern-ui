export type Turtle = {
  id: string;
  name: string;
  status: "online" | "busy" | "offline";
  job: string;
  pos: [number, number, number];
  facing: string;
  fuel: number;
  fuelUnits: number;
  home: string;
  slots: string;
};

export const turtles: Turtle[] = [
  { id: "testy", name: "Testy", status: "online", job: "Strip mine 41/64", pos: [120, 12, -352], facing: "North", fuel: 72, fuelUnits: 3602, home: "43 m", slots: "6/16" },
  { id: "digger", name: "Digger", status: "online", job: "Idle at home", pos: [118, 64, -340], facing: "East", fuel: 91, fuelUnits: 4550, home: "0 m", slots: "2/16" },
  { id: "builder", name: "Builder-2", status: "busy", job: "Build layer 3/10", pos: [140, 70, -310], facing: "South", fuel: 44, fuelUnits: 2200, home: "51 m", slots: "11/16" },
  { id: "farmhand", name: "Farmhand", status: "offline", job: "Last seen 2h ago", pos: [96, 65, -300], facing: "West", fuel: 12, fuelUnits: 600, home: "22 m", slots: "14/16" },
];

export const inventory: ({ name: string; count: number; color: string } | null)[] = [
  { name: "Coal", count: 32, color: "#3a3f3c" },
  { name: "Torch", count: 20, color: "#e8c98a" },
  { name: "Cobble", count: 64, color: "#6d766f" },
  { name: "Iron", count: 11, color: "#c9a98d" },
  { name: "Diamond", count: 3, color: "#8fd6cf" },
  { name: "Gravel", count: 7, color: "#857d74" },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];
