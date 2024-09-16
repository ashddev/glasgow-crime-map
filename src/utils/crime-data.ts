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
    "rgba(255, 0, 0, 1)",    // Bright Red
    "rgba(255, 69, 0, 1)",   // Red-Orange
    "rgba(255, 140, 0, 1)",  // Orange
    "rgba(135, 206, 250, 1)",// Light Sky Blue
    "rgba(173, 216, 230, 1)",// Light Blue
    "rgba(240, 248, 255, 1)" // Alice Blue (Lightest Blue)
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