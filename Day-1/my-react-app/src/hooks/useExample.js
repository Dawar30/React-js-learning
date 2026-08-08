import { useState } from "react";

export default function useExample(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((s) => !s);
  return [state, toggle];
}
