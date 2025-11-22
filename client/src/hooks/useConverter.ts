import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCallback, useRef, useState } from "react";

export interface ConversionProgress {
  ratio: number;
  time: number;
}

export default function useConverter() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isReady, setIsReady] = useState(false);

  const loadFFmpeg = useCallback(async () => {
    if (ffmpegRef.current && isReady) return;

    setIsLoading(true);
    setError(null);

    try {
      const ffmpeg = new FFmpeg();

      ffmpeg.on("log", ({ message }) => {
        console.log(message);
      });

      ffmpeg.on("progress", ({ progress, time }) => {
        setProgress({ ratio: progress, time });
      });

      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      ffmpegRef.current = ffmpeg;
      setIsReady(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "加载FFmpeg失败";
      setError(errorMessage);
      console.error("FFmpeg加载错误:", err);
    } finally {
      setIsLoading(false);
    }
  }, [isReady]);

  const convertToMP3 = useCallback(
    async (file: File): Promise<Blob | null> => {
      if (!ffmpegRef.current || !isReady) {
        setError("FFmpeg未就绪,请稍候");
        return null;
      }

      setIsConverting(true);
      setError(null);
      setProgress(null);

      try {
        const ffmpeg = ffmpegRef.current;
        const inputFileName = "input" + file.name.substring(file.name.lastIndexOf("."));
        const outputFileName = "output.mp3";

        // 将文件写入FFmpeg虚拟文件系统
        await ffmpeg.writeFile(inputFileName, await fetchFile(file));

        // 执行转换命令
        await ffmpeg.exec([
          "-i",
          inputFileName,
          "-vn", // 不包含视频
          "-ar",
          "44100", // 音频采样率
          "-ac",
          "2", // 双声道
          "-b:a",
          "192k", // 比特率
          outputFileName,
        ]);

        // 读取输出文件
        const data = await ffmpeg.readFile(outputFileName);
        const blob = new Blob([data], { type: "audio/mpeg" });

        // 清理文件
        await ffmpeg.deleteFile(inputFileName);
        await ffmpeg.deleteFile(outputFileName);

        return blob;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "转换失败";
        setError(errorMessage);
        console.error("转换错误:", err);
        return null;
      } finally {
        setIsConverting(false);
        setProgress(null);
      }
    },
    [isReady]
  );

  return {
    isLoading,
    isConverting,
    isReady,
    progress,
    error,
    loadFFmpeg,
    convertToMP3,
  };
}
