import { Fragment } from "react";

/* Renders copy from lib/dict.ts, turning **word** into <strong>word</strong>.
   Lets the copy stay plain strings that are easy to edit. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
