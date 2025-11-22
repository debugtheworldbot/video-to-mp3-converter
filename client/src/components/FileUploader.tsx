import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  disabled?: boolean;
}

export default function FileUploader({
  onFileSelect,
  accept = "video/*,audio/*,.mp4,.m4a,.avi,.mov,.webm,.mkv,.flv,.wmv,.mp3,.wav,.aac,.ogg",
  disabled = false,
}: FileUploaderProps) {
  const { t } = useLanguage();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect, disabled]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        disabled
          ? "border-border/50 bg-muted/30 cursor-not-allowed"
          : "border-border hover:border-primary/50 bg-card cursor-pointer"
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        id="file-input"
      />
      <div className="flex flex-col items-center gap-4">
        <div
          className={`p-4 rounded-full ${
            disabled ? "bg-muted" : "bg-primary/10"
          }`}
        >
          <Upload
            className={`w-8 h-8 ${
              disabled ? "text-muted-foreground" : "text-primary"
            }`}
          />
        </div>
        <div>
          <p
            className={`text-lg font-medium ${
              disabled ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {t("uploadPrompt")}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {t("supportedFormats")}
          </p>
        </div>
      </div>
    </div>
  );
}
