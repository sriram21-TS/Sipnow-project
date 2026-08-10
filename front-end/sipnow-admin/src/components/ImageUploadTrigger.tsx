import type { RefObject, ChangeEvent } from "react";

interface ImageUploadTriggerProps {
  inputRef: RefObject<HTMLInputElement | null>;
  uploading: boolean;
  onFileSelect: (file: File) => void;
  helpText: string;
}

export default function ImageUploadTrigger({
  inputRef,
  uploading,
  onFileSelect,
  helpText,
}: ImageUploadTriggerProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors disabled:opacity-60"
      >
        {uploading ? "Uploading…" : "Upload Image"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files?.[0] && onFileSelect(e.target.files[0])
        }
      />
      <p className="text-xs text-gray-400 mt-1">{helpText}</p>
    </>
  );
}
