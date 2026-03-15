"use client";

import { useEffect } from "react";

export default function WakeStreamlit() {
  useEffect(() => {
    const url = "https://ecommerce-eda.streamlit.app";

    // create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // send resume request
    const timer = setTimeout(() => {
      fetch(`${url}/api/v2/app/resume`, {
        method: "POST",
        mode: "no-cors",
      }).catch(() => {});
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
}