import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  ShoppingBag,
  Upload,
  Heart,
  Package,
  Tag,
  HelpCircle,
  LogOut,
  Shield,
  FileText,
  Pill,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
const mainNavItems = [
  { title: "Shop Medicines", url: "/", icon: ShoppingBag, primary: true },
  { title: "Upload Prescription", url: "/upload", icon: Upload, primary: true },
  { title: "My Orders", url: "/orders", icon: Package },
  { title: "Offers & Discounts", url: "/offers", icon: Tag },
  { title: "FAQs / Help", url: "/help", icon: HelpCircle },
]

const footerItems = [
  { title: "Privacy Policy", url: "/privacy", icon: Shield },
  { title: "Terms of Service", url: "/terms", icon: FileText },
]

interface SidebarSheetProps {
  children: React.ReactNode
}

export function SidebarSheet({ children }: SidebarSheetProps) {
  const router = useRouter()
  const pathname = usePathname()

  const getNavCls = (isActive: boolean) =>
    isActive
      ? "bg-primary/10 text-primary border-r-2 border-primary font-semibold"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-left">
              <SheetTitle className="text-xl font-bold text-foreground">MedPharma</SheetTitle>
              <p className="text-xs text-muted-foreground">Your Health Partner</p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 mt-6">
          <div className="space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Navigation</h3>
              <div className="space-y-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={cn(
                      getNavCls(pathname === item.url),
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                      item.primary && "font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="border-t pt-4">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">Legal</h3>
              <div className="space-y-1">
                {footerItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={cn(
                      getNavCls(pathname === item.url),
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}