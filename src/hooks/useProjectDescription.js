import { useMemo } from "react";

export function useProjectDescription(description, maxWords = 40) {
  return useMemo(() => {
    const words = description ? description.split(" ") : [];
    const isLong = words.length > maxWords;
    const short = isLong ? words.slice(0, maxWords).join(" ") + "..." : description;
    return { isLong, short };
  }, [description, maxWords]);
}