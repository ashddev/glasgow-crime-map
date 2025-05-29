import { useState, useEffect } from "react";
import papa from "papaparse";
import z from "zod";

export const CrimeDataSchema = z.array(
  z.object({
    dataZone: z.string(),
    councilArea: z.string(),
    SIMD2020CrimeDomainRank: z.coerce.number(),
    crimeCount: z.coerce.number().or(z.literal("*")),
    crimeRate: z.coerce.number().or(z.literal("*")),
  })
);

export const useCrime = () => {
  const [data, setData] = useState<z.infer<typeof CrimeDataSchema>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/simd_glasgow_2022_rows.csv");
      const text = await response.text();

      const { data, errors } = papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      if (errors.length) {
        console.error("CSV parse error: ", errors);
      } else {
        const crimeData = CrimeDataSchema.parse(data);
        setData(crimeData);
      }
    };

    fetchData();
  }, []);

  return data;
};
