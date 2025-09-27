"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Menu,
  User,
  Heart,
  ShoppingCart,
  Globe,
  Sun,
  Moon,
  Bell,
  MessageCircle,
  Gavel,
  ShoppingBag,
  ArrowRightLeft,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { LanguageProvider, useTranslation, languages } from "@/lib/i18n"
import ProductDetail from "@/components/ProductDetail"
import ListingForm from "@/components/ListingForm"
import UserDashboard from "@/components/UserDashboard"
import AuthModal from "@/components/AuthModal"

const mockProducts = [
  {
    id: 1,
    title: "Vintage Rolex Submariner",
    price: 8500,
    currentBid: 7200,
    type: "auction",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    image: "/luxury-watch.jpg",
    seller: "WatchCollector",
    rating: 4.9,
    category: "collectibles",
    featured: true,
  },
  {
    id: 2,
    title: "MacBook Pro M3 16-inch",
    price: 2499,
    type: "fixed",
    image: "/silver-macbook-on-desk.png",
    seller: "TechDeals",
    rating: 4.8,
    category: "electronics",
  },
  {
    id: 3,
    title: "Designer Leather Jacket",
    price: 450,
    type: "trade",
    tradeFor: "Vintage denim jacket or similar",
    image: "/classic-leather-jacket.png",
    seller: "Fashionista",
    rating: 4.7,
    category: "fashion",
  },
  {
    id: 4,
    title: "Rare Pokemon Card Collection",
    price: 1200,
    currentBid: 950,
    type: "auction",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    image: "/pokemon-cards.jpg",
    seller: "CardMaster",
    rating: 4.9,
    category: "collectibles",
    featured: true,
  },
  {
    id: 5,
    title: "Minimalist Dining Set",
    price: 899,
    type: "fixed",
    image: "/elegant-dining-set.png",
    seller: "HomeDesign",
    rating: 4.6,
    category: "home",
  },
  {
    id: 6,
    title: "Electric Guitar Fender",
    price: 650,
    type: "trade",
    tradeFor: "Bass guitar or audio equipment",
    image: "/electric-guitar.jpg",
    seller: "MusicLover",
    rating: 4.8,
    category: "electronics",
  },
]

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState("")
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        setTimeLeft("Ended")
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`)
      } else {
        setTimeLeft(`${minutes}m`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400">
      <Clock className="w-4 h-4" />
      <span>
        {t("time.ending")} {timeLeft}
      </span>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const { t } = useTranslation()

  return (
    <Card className="group overflow-hidden hover-lift bg-card border-border/50 hover:border-primary/20 animate-fade-in">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 btn-accent border-0">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <div className="absolute top-2 right-2">
            <Button size="sm" variant="ghost" className="glass text-white hover:bg-white/20 border-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          {product.type === "auction" && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-primary text-primary-foreground animate-pulse border-0">
                <Gavel className="w-3 h-3 mr-1" />
                {t("product.auction")}
              </Badge>
            </div>
          )}
          {product.type === "trade" && (
            <div className="absolute bottom-2 left-2">
              <Badge className="btn-accent border-0">
                <ArrowRightLeft className="w-3 h-3 mr-1" />
                {t("product.trade")}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-5 h-5">
            <AvatarFallback className="text-xs bg-muted">{product.seller[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{product.seller}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        {product.type === "auction" && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Current bid</span>
              <span className="font-bold text-base text-primary">${product.currentBid.toLocaleString()}</span>
            </div>
            <CountdownTimer endTime={product.endTime} />
          </div>
        )}

        {product.type === "fixed" && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-bold text-lg text-primary">${product.price.toLocaleString()}</span>
          </div>
        )}

        {product.type === "trade" && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Value</span>
              <span className="font-bold text-base text-primary">${product.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">Looking for: {product.tradeFor}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex gap-1">
        {product.type === "auction" && (
          <Button className="flex-1 btn-primary text-sm">
            <Gavel className="w-3 h-3 mr-1" />
            {t("product.bid")}
          </Button>
        )}
        {product.type === "fixed" && (
          <Button className="flex-1 btn-primary text-sm">
            <ShoppingBag className="w-3 h-3 mr-1" />
            {t("product.buyNow")}
          </Button>
        )}
        {product.type === "trade" && (
          <Button className="flex-1 btn-accent text-sm">
            <ArrowRightLeft className="w-3 h-3 mr-1" />
            {t("product.trade")}
          </Button>
        )}
        <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent hover:bg-muted">
          <MessageCircle className="w-3 h-3" />
        </Button>
      </CardFooter>
    </Card>
  )
}

function MarketplaceContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showListingForm, setShowListingForm] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useTranslation()

  const categories = [
    { id: "all", name: "All Categories", icon: Grid },
    { id: "electronics", name: t("category.electronics"), icon: ShoppingBag },
    { id: "fashion", name: t("category.fashion"), icon: Heart },
    { id: "home", name: t("category.home"), icon: User },
    { id: "collectibles", name: t("category.collectibles"), icon: Star },
    { id: "vehicles", name: t("category.vehicles"), icon: TrendingUp },
  ]

  const enhancedMockProducts = mockProducts.map((product) => ({
    ...product,
    images: [product.image],
    description: `This is a premium ${product.title.toLowerCase()} in excellent condition. Perfect for collectors and enthusiasts alike. The item has been carefully maintained and comes with all original accessories.`,
    condition: "Excellent",
    location: "New York, NY",
    shipping: "Free shipping within US. International shipping available.",
    returns: "30-day return policy. Item must be in original condition.",
    views: Math.floor(Math.random() * 1000) + 100,
    watchers: Math.floor(Math.random() * 50) + 10,
  }))

  const filteredProducts = enhancedMockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLogin = async (email: string, password: string) => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: email,
      avatar: null,
      rating: 4.8,
      joinDate: "2023",
    }
    setUser(mockUser)
    localStorage.setItem("marketplace_user", JSON.stringify(mockUser))
  }

  const handleSignup = async (name: string, email: string, password: string) => {
    const mockUser = {
      id: 1,
      name: name,
      email: email,
      avatar: null,
      rating: 5.0,
      joinDate: "2025",
    }
    setUser(mockUser)
    localStorage.setItem("marketplace_user", JSON.stringify(mockUser))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("marketplace_user")
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("marketplace_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
  }

  if (showListingForm) {
    return (
      <ListingForm
        onBack={() => setShowListingForm(false)}
        onSubmit={(listing) => {
          console.log("New listing:", listing)
          setShowListingForm(false)
        }}
      />
    )
  }

  if (showDashboard) {
    return (
      <UserDashboard
        onBack={() => setShowDashboard(false)}
        onCreateListing={() => {
          setShowDashboard(false)
          setShowListingForm(true)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] glass border-b border-border/50 backdrop-blur-xl bg-background/95 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <ShoppingBag className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    MarketPlace
                  </span>
                  <div className="text-xs text-muted-foreground font-medium tracking-wider">PREMIUM TRADING</div>
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-1">
                <Button
                  variant="ghost"
                  className="hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium px-6 py-3 rounded-xl relative group"
                >
                  <span className="relative z-10">{t("nav.home")}</span>
                  <div className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium px-6 py-3 rounded-xl relative group"
                    >
                      <span className="relative z-10">{t("nav.browse")}</span>
                      <div className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-card/98 backdrop-blur-2xl border-border/50 shadow-2xl min-w-[280px] z-[200] animate-in slide-in-from-top-2 duration-300"
                    sideOffset={8}
                  >
                    <div className="p-2">
                      <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3">
                        <Gavel className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">Live Auctions</div>
                          <div className="text-xs text-muted-foreground">Bid on premium items</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3">
                        <ShoppingBag className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">Buy Now</div>
                          <div className="text-xs text-muted-foreground">Fixed price items</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3">
                        <ArrowRightLeft className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">Trade Exchange</div>
                          <div className="text-xs text-muted-foreground">Swap your items</div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  onClick={() => setShowListingForm(true)}
                  className="hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium px-6 py-3 rounded-xl relative group"
                >
                  <span className="relative z-10">{t("nav.sell")}</span>
                  <div className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium px-6 py-3 rounded-xl relative group"
                    >
                      <span className="relative z-10">Auctions</span>
                      <div className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-card/98 backdrop-blur-2xl border-border/50 shadow-2xl min-w-[260px] z-[200] animate-in slide-in-from-top-2 duration-300"
                    sideOffset={8}
                  >
                    <div className="p-2">
                      <DropdownMenuItem className="hover:bg-accent/10 transition-all duration-200 rounded-lg p-3">
                        <Clock className="w-5 h-5 mr-3 text-accent" />
                        <div>
                          <div className="font-medium">Ending Soon</div>
                          <div className="text-xs text-muted-foreground">Final hours</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent/10 transition-all duration-200 rounded-lg p-3">
                        <TrendingUp className="w-5 h-5 mr-3 text-accent" />
                        <div>
                          <div className="font-medium">Hot Auctions</div>
                          <div className="text-xs text-muted-foreground">Most active</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent/10 transition-all duration-200 rounded-lg p-3">
                        <Star className="w-5 h-5 mr-3 text-accent" />
                        <div>
                          <div className="font-medium">Premium Items</div>
                          <div className="text-xs text-muted-foreground">High-value auctions</div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group rounded-xl w-12 h-12"
                  >
                    <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background animate-pulse"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-card/98 backdrop-blur-2xl border-border/50 shadow-2xl min-w-[200px] z-[200] animate-in slide-in-from-top-2 duration-300"
                  sideOffset={8}
                >
                  <div className="p-2">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`transition-all duration-200 rounded-lg p-3 ${
                          language === lang.code ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
                        }`}
                      >
                        <span className="mr-3 text-lg">{lang.flag}</span>
                        <span className="font-medium flex-1">{lang.name}</span>
                        {language === lang.code && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300 relative overflow-hidden group rounded-xl w-12 h-12"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 group-hover:rotate-180 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 group-hover:-rotate-180 dark:rotate-0 dark:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group rounded-xl w-12 h-12"
              >
                <Bell className="w-5 h-5 group-hover:animate-bounce" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-accent-foreground rounded-full text-xs font-bold flex items-center justify-center border-2 border-background shadow-lg animate-pulse">
                  3
                </div>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all duration-300 relative group rounded-xl w-12 h-12"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center border-2 border-background shadow-lg">
                  2
                </div>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-primary/10 transition-all duration-300 p-2 rounded-xl group"
                  >
                    {user ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block text-left">
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">Premium Member</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2">
                        <User className="w-5 h-5" />
                        <span className="hidden md:inline font-medium">Sign In</span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-card/98 backdrop-blur-2xl border-border/50 shadow-2xl min-w-[260px] z-[200] animate-in slide-in-from-top-2 duration-300"
                  sideOffset={8}
                >
                  {user ? (
                    <div className="p-2">
                      <div className="px-3 py-4 border-b border-border/50 mb-2">
                        <div className="font-semibold text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm text-muted-foreground">{user.rating} rating</span>
                          <Badge className="ml-2 text-xs bg-primary/10 text-primary border-primary/20">Premium</Badge>
                        </div>
                      </div>
                      <DropdownMenuItem
                        onClick={() => setShowDashboard(true)}
                        className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3"
                      >
                        <User className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">{t("nav.account")}</div>
                          <div className="text-xs text-muted-foreground">Manage profile</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3">
                        <Heart className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">Watchlist</div>
                          <div className="text-xs text-muted-foreground">Saved items</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3">
                        <MessageCircle className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">Messages</div>
                          <div className="text-xs text-muted-foreground">Chat history</div>
                        </div>
                      </DropdownMenuItem>
                      <div className="border-t border-border/50 mt-2 pt-2">
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="hover:bg-destructive/10 text-destructive transition-all duration-200 rounded-lg p-3"
                        >
                          <div className="font-medium">Logout</div>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2">
                      <DropdownMenuItem
                        onClick={() => setShowAuthModal(true)}
                        className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3"
                      >
                        <User className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">{t("nav.login")}</div>
                          <div className="text-xs text-muted-foreground">Access your account</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setShowAuthModal(true)}
                        className="hover:bg-primary/10 transition-all duration-200 rounded-lg p-3"
                      >
                        <ShoppingBag className="w-5 h-5 mr-3 text-primary" />
                        <div>
                          <div className="font-medium">{t("nav.signup")}</div>
                          <div className="text-xs text-muted-foreground">Join the marketplace</div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="hidden lg:inline-flex btn-primary shadow-xl hover:shadow-2xl transition-all duration-500 font-semibold px-8 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Menu className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                <span className="relative z-10">Start Selling</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/minimalist-black-and-white-marketplace-background-.jpg"
            alt="Marketplace Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Trusted by 50,000+ users worldwide</span>
          </div>

          <h1 className="text-display mb-8 animate-fade-in text-balance text-foreground leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 animate-slide-up text-pretty max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="max-w-3xl mx-auto relative animate-scale-in mb-12">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                placeholder={t("hero.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-32 py-8 text-xl rounded-3xl border-2 focus:border-primary bg-card/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300"
              />
              <Button className="absolute right-3 top-1/2 transform -translate-y-1/2 btn-primary px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                Search
              </Button>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up">
            <Button
              variant="outline"
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Gavel className="w-4 h-4 mr-2" />
              Live Auctions
            </Button>
            <Button
              variant="outline"
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Trade Items
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          {/* Elegant Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-heading mb-4 text-foreground">Featured Products</h2>
            <p className="text-muted-foreground text-lg">Curated selections from our premium marketplace</p>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Sophisticated Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
            {/* Large Featured Image */}
            <div
              className="md:col-span-2 md:row-span-2 group cursor-pointer hover-lift"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 1))}
            >
              <div className="relative h-96 bg-card rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/luxury-watch.jpg"
                  alt="Vintage Rolex Submariner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">Vintage Rolex Submariner</h3>
                  <p className="text-white/90 text-lg font-semibold">$8,500</p>
                  <Badge className="mt-3 btn-accent border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
            </div>

            {/* Elegant Small Gallery Items */}
            <div
              className="group cursor-pointer hover-lift"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 2))}
            >
              <div className="relative h-44 bg-card rounded-xl overflow-hidden shadow-md">
                <img
                  src="/silver-macbook-on-desk.png"
                  alt="MacBook Pro M3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">MacBook Pro M3</h4>
                  <p className="text-white/90 text-sm">$2,499</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer hover-lift"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 3))}
            >
              <div className="relative h-44 bg-card rounded-xl overflow-hidden shadow-md">
                <img
                  src="/classic-leather-jacket.png"
                  alt="Designer Leather Jacket"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Designer Leather</h4>
                  <p className="text-white/90 text-sm">Trade</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer hover-lift"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 4))}
            >
              <div className="relative h-44 bg-card rounded-xl overflow-hidden shadow-md">
                <img
                  src="/pokemon-cards.jpg"
                  alt="Rare Pokemon Cards"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Pokemon Cards</h4>
                  <p className="text-white/90 text-sm">Auction</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer hover-lift"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 5))}
            >
              <div className="relative h-44 bg-card rounded-xl overflow-hidden shadow-md">
                <img
                  src="/elegant-dining-set.png"
                  alt="Minimalist Dining Set"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Dining Set</h4>
                  <p className="text-white/90 text-sm">$899</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refined Scrolling Banner */}
          <div className="relative overflow-hidden mb-16 animate-fade-in">
            <div className="flex gap-8 animate-scroll-x">
              <div className="min-w-[320px] h-36 bg-card rounded-2xl p-8 shadow-lg relative overflow-hidden group hover-lift">
                <div className="relative z-10">
                  <h3 className="text-xl font-serif font-bold mb-2 text-foreground">Flash Sale</h3>
                  <p className="text-muted-foreground">Up to 50% off premium items</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-accent/10 rounded-full"></div>
              </div>

              <div className="min-w-[320px] h-36 bg-primary rounded-2xl p-8 text-primary-foreground shadow-lg relative overflow-hidden group hover-lift">
                <div className="relative z-10">
                  <h3 className="text-xl font-serif font-bold mb-2">Ending Soon</h3>
                  <p className="text-primary-foreground/80">Final hours on auctions</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full"></div>
              </div>

              <div className="min-w-[320px] h-36 bg-accent rounded-2xl p-8 text-accent-foreground shadow-lg relative overflow-hidden group hover-lift">
                <div className="relative z-10">
                  <h3 className="text-xl font-serif font-bold mb-2">New Arrivals</h3>
                  <p className="text-accent-foreground/80">Fresh daily selections</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full"></div>
              </div>

              <div className="min-w-[320px] h-36 bg-card rounded-2xl p-8 shadow-lg relative overflow-hidden group hover-lift">
                <div className="relative z-10">
                  <h3 className="text-xl font-serif font-bold mb-2 text-foreground">Trade Deals</h3>
                  <p className="text-muted-foreground">Exchange premium items</p>
                </div>
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Elegant Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
            <div className="text-center p-8 bg-card rounded-2xl shadow-md hover-lift">
              <div className="text-3xl font-serif font-bold mb-2 text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl shadow-md hover-lift">
              <div className="text-3xl font-serif font-bold mb-2 text-primary">25K+</div>
              <div className="text-sm text-muted-foreground">Live Auctions</div>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl shadow-md hover-lift">
              <div className="text-3xl font-serif font-bold mb-2 text-primary">15K+</div>
              <div className="text-sm text-muted-foreground">Successful Trades</div>
            </div>

            <div className="text-center p-8 bg-card rounded-2xl shadow-md hover-lift">
              <div className="text-3xl font-serif font-bold mb-2 text-accent">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedCategory === category.id ? "btn-primary" : "hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="hover:border-primary hover:text-primary bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
              <div className="flex border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-r-none ${viewMode === "grid" ? "btn-primary" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`rounded-l-none ${viewMode === "list" ? "btn-primary" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">{filteredProducts.length} Products Found</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:border-primary hover:text-primary bg-card/80 backdrop-blur-sm border-border/50 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Sort by: Featured
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl min-w-[200px]">
                <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200">
                  <Star className="w-4 h-4 mr-3" />
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200">
                  <TrendingUp className="w-4 h-4 mr-3" />
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200">
                  <TrendingUp className="w-4 h-4 mr-3 rotate-180" />
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200">
                  <Clock className="w-4 h-4 mr-3" />
                  Ending Soon
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/10 transition-all duration-200">
                  <Badge className="w-4 h-4 mr-3" />
                  Newest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 py-16 px-4 sm:px-6 lg:px-8 mt-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-xl font-bold text-foreground">MarketPlace</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The premium marketplace for auctions, fixed-price sales, and product trades.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Marketplace</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Browse Products</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Start Selling</li>
                <li className="hover:text-primary transition-colors cursor-pointer">How Auctions Work</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Trading Guide</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Safety Tips</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Community</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Press</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Legal</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MarketPlace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <MarketplaceContent />
    </LanguageProvider>
  )
}
