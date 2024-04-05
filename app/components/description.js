"use client";

import { Interweave } from "interweave";

export function Description({ description, style }) {
  return (
    <p className={style} >
      <Interweave content={description}/>
    </p>
  );
}
