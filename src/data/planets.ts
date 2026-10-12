export interface PlanetData {
  id: string;
  name: string;
  color: string;
  size: number; // relative visual size in px
  radius: number; // orbital radius in px
  actualDiameter: string; // km
  distanceFromSun: string; // million km
  orbitalPeriod: string; // Earth years/days
  orbitalSpeed: number; // relative speed factor
  description: string;
}

export const planets: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#b5b5b5',
    size: 8,
    radius: 70,
    actualDiameter: '4,879 km',
    distanceFromSun: '57.9 million km',
    orbitalPeriod: '88 days',
    orbitalSpeed: 4.15,
    description: 'The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.',
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#e8cda0',
    size: 12,
    radius: 100,
    actualDiameter: '12,104 km',
    distanceFromSun: '108.2 million km',
    orbitalPeriod: '225 days',
    orbitalSpeed: 1.62,
    description: 'The hottest planet due to its thick atmosphere. It rotates backwards compared to most planets.',
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#4fa3e0',
    size: 13,
    radius: 140,
    actualDiameter: '12,756 km',
    distanceFromSun: '149.6 million km',
    orbitalPeriod: '365.25 days',
    orbitalSpeed: 1.0,
    description: 'Our home planet! The only known planet with liquid water on its surface and life.',
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#e07040',
    size: 10,
    radius: 180,
    actualDiameter: '6,792 km',
    distanceFromSun: '227.9 million km',
    orbitalPeriod: '687 days',
    orbitalSpeed: 0.53,
    description: 'The Red Planet, known for its iron oxide surface. It has the largest volcano in the solar system.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#c8a060',
    size: 28,
    radius: 240,
    actualDiameter: '142,984 km',
    distanceFromSun: '778.6 million km',
    orbitalPeriod: '11.86 years',
    orbitalSpeed: 0.084,
    description: 'The largest planet in our solar system. Its Great Red Spot is a storm larger than Earth.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#e8d088',
    size: 24,
    radius: 310,
    actualDiameter: '120,536 km',
    distanceFromSun: '1,433.5 million km',
    orbitalPeriod: '29.46 years',
    orbitalSpeed: 0.034,
    description: 'Famous for its beautiful ring system made of ice and rock particles. It could float in water!',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#7ec8e3',
    size: 18,
    radius: 370,
    actualDiameter: '51,118 km',
    distanceFromSun: '2,872.5 million km',
    orbitalPeriod: '84.01 years',
    orbitalSpeed: 0.012,
    description: 'An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#4060e0',
    size: 17,
    radius: 420,
    actualDiameter: '49,528 km',
    distanceFromSun: '4,495.1 million km',
    orbitalPeriod: '164.8 years',
    orbitalSpeed: 0.006,
    description: 'The windiest planet with speeds up to 2,100 km/h. It is the farthest planet from the Sun.',
  },
];
