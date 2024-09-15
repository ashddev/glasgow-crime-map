import {useState, useEffect} from "react"
import {supabase} from "../clients/supabase"

export const useCrime = () => {
    const [data, setData] = useState<CrimeData[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await supabase.from("simd_glasgow_2022").select().eq("Council_area", "Glasgow City");;
    
          if (error) {
            console.error('Error fetching crime data:', error);
            setError(error.message);
          } else {
            setData(data || []);
          }
          setLoading(false);
        };
    
        fetchData();
      }, []);

      return { data, loading, error }
}