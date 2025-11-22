// 支持的视频和音频格式
const SUPPORTED_VIDEO_FORMATS = [
  "video/mp4",
  "video/x-m4v",
  "video/quicktime", // MOV
  "video/x-msvideo", // AVI
  "video/webm",
  "video/x-matroska", // MKV
  "video/x-flv",
  "video/x-ms-wmv",
  "video/mpeg",
];

const SUPPORTED_AUDIO_FORMATS = [
  "audio/mpeg", // MP3
  "audio/mp4", // M4A
  "audio/x-m4a",
  "audio/wav",
  "audio/x-wav",
  "audio/aac",
  "audio/ogg",
  "audio/webm",
  "audio/flac",
];

const SUPPORTED_EXTENSIONS = [
  ".mp4",
  ".m4v",
  ".m4a",
  ".mov",
  ".avi",
  ".webm",
  ".mkv",
  ".flv",
  ".wmv",
  ".mpeg",
  ".mpg",
  ".mp3",
  ".wav",
  ".aac",
  ".ogg",
  ".flac",
];

// 最大文件大小: 500MB
const MAX_FILE_SIZE = 500 * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File, t?: (key: string) => string): ValidationResult {
  // Default translation function if not provided
  const translate = t || ((key: string) => {
    const defaults: Record<string, string> = {
      fileTooLarge: "File size exceeds limit (max 500MB), current file",
      fileEmpty: "File size is 0, please select a valid file",
      unsupportedFormat: "Unsupported file format. Supported formats",
    };
    return defaults[key] || key;
  });
  // 检查文件大小
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `${translate("fileTooLarge")}: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  // 检查文件大小是否为0
  if (file.size === 0) {
    return {
      valid: false,
      error: translate("fileEmpty"),
    };
  }

  // 检查MIME类型
  const isValidMimeType =
    SUPPORTED_VIDEO_FORMATS.includes(file.type) ||
    SUPPORTED_AUDIO_FORMATS.includes(file.type);

  // 检查文件扩展名
  const fileName = file.name.toLowerCase();
  const hasValidExtension = SUPPORTED_EXTENSIONS.some((ext) =>
    fileName.endsWith(ext)
  );

  // 如果MIME类型和扩展名都不匹配,则拒绝
  if (!isValidMimeType && !hasValidExtension) {
    return {
      valid: false,
      error: `${translate("unsupportedFormat")}: ${SUPPORTED_EXTENSIONS.join(", ")}`,
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
