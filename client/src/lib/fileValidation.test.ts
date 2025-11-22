import { describe, it, expect } from "vitest";
import { validateFile, formatFileSize } from "./fileValidation";

describe("fileValidation", () => {
  describe("validateFile", () => {
    it("should accept valid MP4 video file", () => {
      const file = new File(["dummy content"], "test.mp4", {
        type: "video/mp4",
      });
      const result = validateFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept valid M4A audio file", () => {
      const file = new File(["dummy content"], "test.m4a", {
        type: "audio/x-m4a",
      });
      const result = validateFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it("should accept file with valid extension even if MIME type is unknown", () => {
      const file = new File(["dummy content"], "test.mp4", {
        type: "application/octet-stream",
      });
      const result = validateFile(file);
      expect(result.valid).toBe(true);
    });

    it("should reject file with invalid extension and MIME type", () => {
      const file = new File(["dummy content"], "test.txt", {
        type: "text/plain",
      });
      const result = validateFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Unsupported file format");
    });

    it("should reject file with size 0", () => {
      const file = new File([], "test.mp4", { type: "video/mp4" });
      const result = validateFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("File size is 0");
    });

    it("should reject file larger than 500MB", () => {
      const largeSize = 501 * 1024 * 1024; // 501MB
      const file = new File([new ArrayBuffer(largeSize)], "large.mp4", {
        type: "video/mp4",
      });
      const result = validateFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("File size exceeds limit");
    });

    it("should accept various video formats", () => {
      const formats = [
        { name: "test.avi", type: "video/x-msvideo" },
        { name: "test.mov", type: "video/quicktime" },
        { name: "test.webm", type: "video/webm" },
        { name: "test.mkv", type: "video/x-matroska" },
      ];

      formats.forEach(({ name, type }) => {
        const file = new File(["content"], name, { type });
        const result = validateFile(file);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe("formatFileSize", () => {
    it("should format bytes correctly", () => {
      expect(formatFileSize(0)).toBe("0 B");
      expect(formatFileSize(500)).toBe("500.00 B");
      expect(formatFileSize(1024)).toBe("1.00 KB");
      expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      expect(formatFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
      expect(formatFileSize(1536 * 1024)).toBe("1.50 MB");
    });
  });
});
