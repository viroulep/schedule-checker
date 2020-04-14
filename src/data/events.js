const events = [
  {
    "id": "333",
    "name": "3x3x3 Cube",
    "preferred_format": "a",
    "rank": 10
  },
  {
    "id": "222",
    "name": "2x2x2 Cube",
    "preferred_format": "a",
    "rank": 20
  },
  {
    "id": "444",
    "name": "4x4x4 Cube",
    "preferred_format": "a",
    "rank": 30
  },
  {
    "id": "555",
    "name": "5x5x5 Cube",
    "preferred_format": "a",
    "rank": 40
  },
  {
    "id": "666",
    "name": "6x6x6 Cube",
    "preferred_format": "m",
    "rank": 50
  },
  {
    "id": "777",
    "name": "7x7x7 Cube",
    "preferred_format": "m",
    "rank": 60
  },
  {
    "id": "333bf",
    "name": "3x3x3 Blindfolded",
    "preferred_format": "3",
    "rank": 70
  },
  {
    "id": "333fm",
    "name": "3x3x3 Fewest Moves",
    "preferred_format": "m",
    "rank": 80
  },
  {
    "id": "333oh",
    "name": "3x3x3 One-Handed",
    "preferred_format": "a",
    "rank": 90
  },
  {
    "id": "clock",
    "name": "Clock",
    "preferred_format": "a",
    "rank": 110
  },
  {
    "id": "minx",
    "name": "Megaminx",
    "preferred_format": "a",
    "rank": 120
  },
  {
    "id": "pyram",
    "name": "Pyraminx",
    "preferred_format": "a",
    "rank": 130
  },
  {
    "id": "skewb",
    "name": "Skewb",
    "preferred_format": "a",
    "rank": 140
  },
  {
    "id": "sq1",
    "name": "Square-1",
    "preferred_format": "a",
    "rank": 150
  },
  {
    "id": "444bf",
    "name": "4x4x4 Blindfolded",
    "preferred_format": "3",
    "rank": 160
  },
  {
    "id": "555bf",
    "name": "5x5x5 Blindfolded",
    "preferred_format": "3",
    "rank": 170
  },
  {
    "id": "333mbf",
    "name": "3x3x3 Multi-Blind",
    "preferred_format": "3",
    "rank": 180
  },
  {
    "id": "333ft",
    "name": "3x3x3 With Feet",
    "preferred_format": "a",
    "rank": 996
  },
  {
    "id": "magic",
    "name": "Magic",
    "preferred_format": "a",
    "rank": 997
  },
  {
    "id": "mmagic",
    "name": "Master Magic",
    "preferred_format": "a",
    "rank": 998
  },
  {
    "id": "333mbo",
    "name": "3x3x3 Multi-Blind Old Style",
    "preferred_format": "3",
    "rank": 999
  }
];

const byId = {
};

events.forEach((e) => byId[e.id] = e);

export default {
  official: events.filter((e) => e.rank < 900),
  byId: byId,
};
