import { useEffect, useRef, useState } from "react";
import { Annotation } from "./Annotation.jsx";

// Two-step destructive action without a browser confirm() popup.
export function ConfirmInline({ triggerLabel, message, confirmLabel, onConfirm, disabled }) {
  const [asking, setAsking] = useState(false);
  const cancelRef = useRef();
  const triggerRef = useRef();
  const wasAsking = useRef(false);

  useEffect(() => {
    if (asking) cancelRef.current?.focus();
    else if (wasAsking.current) triggerRef.current?.focus();
    wasAsking.current = asking;
  }, [asking]);

  if (!asking)
    return (
      <span>
        <button ref={triggerRef} type="button" className="btn btn-danger" onClick={() => setAsking(true)} disabled={disabled}>
          {triggerLabel}
        </button>{" "}
        <Annotation id="confirm" />
      </span>
    );

  return (
    <div className="confirm-box" role="alertdialog" aria-label="Confirm delete" aria-describedby="confirm-msg">
      <p id="confirm-msg">{message}</p>
      <button ref={cancelRef} type="button" className="btn" onClick={() => setAsking(false)}>
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-danger-solid"
        onClick={() => {
          onConfirm();
          setAsking(false);
        }}
      >
        {confirmLabel}
      </button>
    </div>
  );
}
