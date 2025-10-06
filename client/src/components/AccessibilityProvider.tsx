import { createContext, useContext, useEffect, useState } from "react"

type FontSize = "normal" | "large" | "extra-large"
type Contrast = "normal" | "high"
type Motion = "normal" | "reduced"

interface AccessibilitySettings {
  fontSize: FontSize
  contrast: Contrast
  motion: Motion
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  setFontSize: (size: FontSize) => void
  setContrast: (contrast: Contrast) => void
  setMotion: (motion: Motion) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

const STORAGE_KEY = "tecnis-accessibility-settings"

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn("Failed to load accessibility settings:", error)
    }
    return {
      fontSize: "normal",
      contrast: "normal",
      motion: "normal"
    }
  })

  useEffect(() => {
    const root = document.documentElement
    
    // Apply font size
    root.classList.remove("font-size-normal", "font-size-large", "font-size-extra-large")
    root.classList.add(`font-size-${settings.fontSize}`)
    
    // Apply contrast
    root.classList.remove("contrast-normal", "contrast-high")
    root.classList.add(`contrast-${settings.contrast}`)
    
    // Apply motion preference
    root.classList.remove("motion-normal", "motion-reduced")
    root.classList.add(`motion-${settings.motion}`)
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.warn("Failed to save accessibility settings:", error)
    }
  }, [settings])

  const setFontSize = (fontSize: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize }))
  }

  const setContrast = (contrast: Contrast) => {
    setSettings(prev => ({ ...prev, contrast }))
  }

  const setMotion = (motion: Motion) => {
    setSettings(prev => ({ ...prev, motion }))
  }

  return (
    <AccessibilityContext.Provider value={{ settings, setFontSize, setContrast, setMotion }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
