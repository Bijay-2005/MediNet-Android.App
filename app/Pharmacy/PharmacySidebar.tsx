import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom" 
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
  Menu,
  X,
  Pill,
  ChevronDown,
  ChevronUp
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import pharmacyLogo from "@/public/Images/pharmacy-logo.png"

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

export function PharmacySidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"
  const [showScrollButton, setShowScrollButton] = useState(false)

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary/10 text-primary border-r-2 border-primary font-semibold"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"

  const scrollToBottom = () => {
    const scrollElement = document.querySelector('[data-scroll-area]')
    if (scrollElement) {
      scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' })
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <img src={pharmacyLogo.src } alt="MedPharma" className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-foreground">MedPharma</h1>
                <p className="text-xs text-muted-foreground">Your Health Partner</p>
              </div>
            )}
          </div>
          
          {/* Scroll Button */}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToBottom}
              className="w-full mt-3 gap-2 text-xs"
            >
              <ChevronDown className="h-3 w-3" />
              Scroll to Bottom
            </Button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <ScrollArea className="flex-1" data-scroll-area>
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) => cn(
                          getNavCls({ isActive }),
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                          item.primary && "font-medium"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Footer Navigation */}
          <div className="border-t mt-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {footerItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) => cn(
                            getNavCls({ isActive }),
                            "flex items-center gap-3 px-3 py-2 rounded-md text-xs"
                          )}
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}