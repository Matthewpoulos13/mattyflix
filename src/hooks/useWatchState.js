import { useEffect, useState } from "react";
import { continueWatchingTitles, getMyList, getProgressStore, subscribe } from "@/lib/watchState";

const read = () => ({
  myList: getMyList(),
  progress: getProgressStore(),
  continueTitles: continueWatchingTitles(),
});

export default function useWatchState() {
  const [state, setState] = useState(read);

  useEffect(() => subscribe(() => setState(read())), []);

  return state;
}