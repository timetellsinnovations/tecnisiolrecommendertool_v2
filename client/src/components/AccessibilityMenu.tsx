import { Settings, Type, Eye, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAccessibility } from "@/components/AccessibilityProvider"

export function AccessibilityMenu() {
  const { settings, setFontSize, setContrast, setMotion } = useAccessibility()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 px-0 focus-ring hover:bg-primary-foreground/20 bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/5 backdrop-blur-sm transition-all duration-200"
          aria-label="Accessibility options"
          data-testid="button-accessibility-menu"
        >
          <Settings className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          <span className="sr-only">Accessibility settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Accessibility Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground flex items-center gap-2">
          <Type className="w-3 h-3" />
          Font Size
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setFontSize("normal")}
          className={`cursor-pointer ${settings.fontSize === "normal" ? "bg-accent" : ""}`}
          data-testid="font-size-normal"
        >
          Normal
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setFontSize("large")}
          className={`cursor-pointer ${settings.fontSize === "large" ? "bg-accent" : ""}`}
          data-testid="font-size-large"
        >
          Large
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setFontSize("extra-large")}
          className={`cursor-pointer ${settings.fontSize === "extra-large" ? "bg-accent" : ""}`}
          data-testid="font-size-extra-large"
        >
          Extra Large
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground flex items-center gap-2">
          <Eye className="w-3 h-3" />
          Contrast
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setContrast("normal")}
          className={`cursor-pointer ${settings.contrast === "normal" ? "bg-accent" : ""}`}
          data-testid="contrast-normal"
        >
          Normal
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setContrast("high")}
          className={`cursor-pointer ${settings.contrast === "high" ? "bg-accent" : ""}`}
          data-testid="contrast-high"
        >
          High Contrast
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Animations
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setMotion("normal")}
          className={`cursor-pointer ${settings.motion === "normal" ? "bg-accent" : ""}`}
          data-testid="motion-normal"
        >
          Normal
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setMotion("reduced")}
          className={`cursor-pointer ${settings.motion === "reduced" ? "bg-accent" : ""}`}
          data-testid="motion-reduced"
        >
          Reduced Motion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
