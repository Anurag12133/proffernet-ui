import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth, finishInitialLoad } from "@/redux/features/authSlice";
import { useVerifyMutation } from "@/redux/features/authApiSlice";

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("No token found, skipping verification.");
      dispatch(finishInitialLoad());
      return;
    }

    console.log("Verifying token:", token);
    verify(token)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .catch((error) => {
        console.error("Token verification failed:", error);
        localStorage.removeItem("accessToken");
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, [dispatch, verify]);
}
