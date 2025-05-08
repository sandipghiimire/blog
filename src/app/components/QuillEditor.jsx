// components/QuillEditor.tsx
"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { useState } from "react";

export default function QuillEditor() {
  const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Write something amazing..."
      />
    </div>
  );
}
