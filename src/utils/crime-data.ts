export const calculateMinMaxCrimeRank = (
  crimeData: CrimeData[]
): { min: number; max: number } => {
  if (crimeData.length === 0) return { min: 0, max: 0 };

  let ranks = crimeData.map((zone) => zone.SIMD2020_Crime_Domain_Rank);

  return {
    min: Math.min(...ranks),
    max: Math.max(...ranks),
  };
};

export const getInterpolations = (min: number, max: number) => {
  const total = max - min;
  const step = total / 5;

  const colours = [
    "rgba(241, 238, 246, 1)",  // Lightest color
    "rgba(189, 201, 225, 1)",  // Slightly darker
    "rgba(116, 169, 207, 1)",  // Medium light blue
    "rgba(43, 140, 190, 1)",   // Medium blue
    "rgba(4, 90, 141, 1)",     // Dark blue
    "rgba(84, 39, 143, 1)"     // Darkest color
  ];

  const interpolations = [];
  for (let i = 0; i <= 5; i++) {
    interpolations.push(min + step * i, colours[i]);
  }

  return interpolations;
};

export const getCrimeRankForZone = (dataZone: string, data:CrimeData[]) => {
  return data.find((d) => d.Data_Zone === dataZone)?.SIMD2020_Crime_Domain_Rank
};