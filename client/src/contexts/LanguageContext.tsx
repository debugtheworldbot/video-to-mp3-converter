import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  zh: {
    // Header
    appTitle: "视频转MP3转换器",
    toggleTheme: "切换主题",
    toggleLanguage: "切换语言",

    // Main
    pageTitle: "视频转MP3转换器",
    pageDescription:
      "在浏览器中直接将视频文件转换为MP3音频,无需上传到服务器,保护您的隐私",

    // Loading
    loadingEngine: "正在加载转换引擎...",
    loadingMessage: "首次加载可能需要一些时间,请耐心等待",

    // File Upload
    uploadPrompt: "拖拽文件到此处或点击上传",
    supportedFormats: "支持 MP4, M4A, AVI, MOV, WEBM, MKV 等格式",

    // Conversion
    startConversion: "开始转换",
    converting: "转换中...",
    cancel: "取消",
    conversionProgress: "转换进度",
    conversionComplete: "转换完成!",
    downloadMP3: "下载MP3",
    convertNew: "转换新文件",

    // Features
    featureClientSide: "纯前端处理",
    featureClientSideDesc:
      "所有转换都在您的浏览器中完成,文件不会上传到任何服务器",
    featureMultiFormat: "多格式支持",
    featureMultiFormatDesc:
      "支持MP4、M4A、AVI、MOV、WEBM、MKV等多种视频和音频格式",
    featureHighQuality: "高质量输出",
    featureHighQualityDesc:
      "使用192kbps比特率和44.1kHz采样率,确保音质清晰",

    // Footer
    footerText: "基于 FFmpeg.wasm 技术 · 完全在浏览器中运行 · 保护您的隐私",

    // Toast messages
    fileSelected: "已选择文件",
    conversionSuccess: "转换成功!",
    downloadStarted: "下载已开始",
    selectFileFirst: "请先选择文件",

    // Errors
    fileTooLarge: "文件大小超过限制(最大500MB),当前文件",
    fileEmpty: "文件大小为0,请选择有效的文件",
    unsupportedFormat: "不支持的文件格式。支持的格式",
    validationFailed: "文件验证失败",
  },
  en: {
    // Header
    appTitle: "Video to MP3 Converter",
    toggleTheme: "Toggle theme",
    toggleLanguage: "Toggle language",

    // Main
    pageTitle: "Video to MP3 Converter",
    pageDescription:
      "Convert video files to MP3 audio directly in your browser, no server upload required, protecting your privacy",

    // Loading
    loadingEngine: "Loading conversion engine...",
    loadingMessage: "First load may take some time, please be patient",

    // File Upload
    uploadPrompt: "Drag and drop file here or click to upload",
    supportedFormats: "Supports MP4, M4A, AVI, MOV, WEBM, MKV and more",

    // Conversion
    startConversion: "Start Conversion",
    converting: "Converting...",
    cancel: "Cancel",
    conversionProgress: "Conversion Progress",
    conversionComplete: "Conversion Complete!",
    downloadMP3: "Download MP3",
    convertNew: "Convert New File",

    // Features
    featureClientSide: "Client-Side Processing",
    featureClientSideDesc:
      "All conversions are completed in your browser, files are not uploaded to any server",
    featureMultiFormat: "Multi-Format Support",
    featureMultiFormatDesc:
      "Supports MP4, M4A, AVI, MOV, WEBM, MKV and other video and audio formats",
    featureHighQuality: "High Quality Output",
    featureHighQualityDesc:
      "Uses 192kbps bitrate and 44.1kHz sample rate to ensure clear audio quality",

    // Footer
    footerText:
      "Powered by FFmpeg.wasm · Runs entirely in browser · Protects your privacy",

    // Toast messages
    fileSelected: "File selected",
    conversionSuccess: "Conversion successful!",
    downloadStarted: "Download started",
    selectFileFirst: "Please select a file first",

    // Errors
    fileTooLarge: "File size exceeds limit (max 500MB), current file",
    fileEmpty: "File size is 0, please select a valid file",
    unsupportedFormat: "Unsupported file format. Supported formats",
    validationFailed: "File validation failed",
  },
};

function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) {
    return "zh";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["zh"]] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
