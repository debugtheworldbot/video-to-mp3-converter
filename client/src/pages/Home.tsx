import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import FileUploader from "@/components/FileUploader";
import useConverter from "@/hooks/useConverter";
import { APP_TITLE } from "@/const";
import { validateFile, formatFileSize } from "@/lib/fileValidation";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Download,
  FileAudio,
  Loader2,
  Moon,
  Sun,
  Music,
  AlertCircle,
  Languages,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const {
    isLoading,
    isConverting,
    isReady,
    progress,
    error,
    loadFFmpeg,
    convertToMP3,
  } = useConverter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [outputFileName, setOutputFileName] = useState<string>("");

  useEffect(() => {
    loadFFmpeg();
  }, [loadFFmpeg]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file, t);
    if (!validation.valid) {
      toast.error(validation.error || t("validationFailed"));
      return;
    }

    setSelectedFile(file);
    setConvertedBlob(null);
    setOutputFileName("");
    toast.success(`${t("fileSelected")}: ${file.name} (${formatFileSize(file.size)})`);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error(t("selectFileFirst"));
      return;
    }

    const blob = await convertToMP3(selectedFile);
    if (blob) {
      setConvertedBlob(blob);
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, "");
      setOutputFileName(`${baseName}.mp3`);
      toast.success(t("conversionSuccess"));
    }
  };

  const handleDownload = () => {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t("downloadStarted"));
  };

  const handleReset = () => {
    setSelectedFile(null);
    setConvertedBlob(null);
    setOutputFileName("");
  };

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">{t("appTitle")}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              aria-label={t("toggleLanguage")}
            >
              <Languages className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={t("toggleTheme")}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold">{t("pageTitle")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("pageDescription")}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <Card className="p-8 bg-card text-card-foreground">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-lg font-medium">{t("loadingEngine")}</p>
                <p className="text-sm text-muted-foreground">
                  {t("loadingMessage")}
                </p>
              </div>
            </Card>
          )}

          {/* Main Converter Interface */}
          {isReady && !isLoading && (
            <Card className="p-6 bg-card text-card-foreground">
              <div className="space-y-6">
                {/* File Upload */}
                {!selectedFile && !convertedBlob && (
                  <FileUploader
                    onFileSelect={handleFileSelect}
                    disabled={isConverting}
                  />
                )}

                {/* Selected File Info */}
                {selectedFile && !convertedBlob && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                      <FileAudio className="w-8 h-8 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>

                    {/* Convert Button */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleConvert}
                        disabled={isConverting}
                        className="flex-1"
                        size="lg"
                      >
                        {isConverting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t("converting")}
                          </>
                        ) : (
                          t("startConversion")
                        )}
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        disabled={isConverting}
                        size="lg"
                      >
                        {t("cancel")}
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    {isConverting && progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t("conversionProgress")}
                          </span>
                          <span className="font-medium">
                            {Math.round(progress.ratio * 100)}%
                          </span>
                        </div>
                        <Progress value={progress.ratio * 100} />
                      </div>
                    )}
                  </div>
                )}

                {/* Conversion Success */}
                {convertedBlob && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="p-2 rounded-full bg-primary/20">
                        <FileAudio className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {t("conversionComplete")}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {outputFileName}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={handleDownload}
                        className="flex-1"
                        size="lg"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {t("downloadMP3")}
                      </Button>
                      <Button onClick={handleReset} variant="outline" size="lg">
                        {t("convertNew")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-card text-card-foreground">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <Music className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">
                  {t("featureClientSide")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("featureClientSideDesc")}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card text-card-foreground">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <FileAudio className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">
                  {t("featureMultiFormat")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("featureMultiFormatDesc")}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card text-card-foreground">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">
                  {t("featureHighQuality")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("featureHighQualityDesc")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{t("footerText")}</p>
        </div>
      </footer>
    </div>
  );
}
