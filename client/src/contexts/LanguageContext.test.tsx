import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "./LanguageContext";
import React from "react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock navigator.language
Object.defineProperty(window.navigator, "language", {
  writable: true,
  value: "en-US",
});

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should detect browser language as English by default", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe("en");
  });

  it("should detect Chinese browser language", () => {
    Object.defineProperty(window.navigator, "language", {
      writable: true,
      value: "zh-CN",
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe("zh");
  });

  it("should switch language from English to Chinese", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage("zh");
    });

    expect(result.current.language).toBe("zh");
  });

  it("should persist language preference in localStorage", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage("zh");
    });

    expect(localStorageMock.getItem("language")).toBe("zh");
  });

  it("should translate English text correctly", () => {
    // Set browser language to English
    Object.defineProperty(window.navigator, "language", {
      writable: true,
      value: "en-US",
    });
    localStorageMock.clear();

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.t("appTitle")).toBe("Video to MP3 Converter");
    expect(result.current.t("startConversion")).toBe("Start Conversion");
  });

  it("should translate Chinese text correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    act(() => {
      result.current.setLanguage("zh");
    });

    expect(result.current.t("appTitle")).toBe("视频转MP3转换器");
    expect(result.current.t("startConversion")).toBe("开始转换");
  });

  it("should return key if translation not found", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.t("nonExistentKey")).toBe("nonExistentKey");
  });

  it("should load saved language from localStorage", () => {
    localStorageMock.setItem("language", "zh");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    );

    const { result } = renderHook(() => useLanguage(), { wrapper });

    expect(result.current.language).toBe("zh");
  });
});
