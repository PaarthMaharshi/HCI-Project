import { useState } from "react";
import { useToast } from "./Toast.jsx";
import { CheckIcon, CopyIcon } from "./Icons.jsx";

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok) throw new Error("copy failed");
}

export function CopyButton({ text, label = "Copy", doneMessage = "Copied", className = "btn", id }) {
  const toast = useToast();
  const [done, setDone] = useState(false);
  const onClick = async () => {
    try {
      await copyText(text);
      setDone(true);
      toast(doneMessage);
      setTimeout(() => setDone(false), 2000);
    } catch {
      toast("Couldn’t copy automatically. Select the address and press Ctrl+C.");
    }
  };
  return (
    <button type="button" className={className} onClick={onClick} id={id}>
      {done ? <CheckIcon /> : <CopyIcon />}
      {done ? "Copied" : label}
    </button>
  );
}
