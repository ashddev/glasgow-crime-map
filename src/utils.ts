import z from "zod";
import { CrimeDataSchema } from "./hooks/useCrime";

export const calculateMinMaxCrimeRank = (
  crimeData: z.infer<typeof CrimeDataSchema>
): { min: number; max: number } => {
  if (crimeData.length === 0) return { min: 0, max: 0 };

  const ranks = crimeData.map((zone) => zone.SIMD2020CrimeDomainRank);

  return {
    min: Math.min(...ranks),
    max: Math.max(...ranks),
  };
};

export const getInterpolations = (min: number, max: number) => {
  const total = max - min;
  const step = total / 5;

  const colours = [
    "rgba(255, 0, 0, 1)", // Red
    "rgba(255, 165, 0, 1)", // Orange
    "rgba(255, 200, 100, 1)", // Neutral Orange
    "rgba(135, 206, 235, 1)", // Neutral Blue
    "rgba(173, 216, 230, 1)", // Light Blue
    "rgba(224, 255, 255, 1)", // Lighter Blue
  ];

  const interpolations = [];
  for (let i = 0; i <= 5; i++) {
    interpolations.push(min + step * i, colours[i]);
  }

  return interpolations;
};

export const getCrimeRankForZone = (
  dataZone: string,
  data: z.infer<typeof CrimeDataSchema>
) => {
  return data.find((d) => d.dataZone === dataZone)?.SIMD2020CrimeDomainRank;
};
