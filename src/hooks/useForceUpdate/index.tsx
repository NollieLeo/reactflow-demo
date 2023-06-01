import { useReducer } from "react";

function useForceUpdate() {
  const [, forceUpdateDispatch] = useReducer((v) => v + 1, 0);
  return forceUpdateDispatch
}

export default useForceUpdate;
