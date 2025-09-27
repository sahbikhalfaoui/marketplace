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
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-gradient-gold text-black">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
          <div className="absolute top-2 right-2">
            <Button size="sm" variant="ghost" className="glass text-white hover:bg-white/20">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          {product.type === "auction" && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="destructive" className="animate-pulse">
                <Gavel className="w-3 h-3 mr-1" />
                {t("product.auction")}
              </Badge>
            </div>
          )}
          {product.type === "trade" && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-blue-600 text-white">
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
            <AvatarFallback className="text-xs">{product.seller[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{product.seller}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        {product.type === "auction" && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Current bid</span>
              <span className="font-bold text-base">${product.currentBid.toLocaleString()}</span>
            </div>
            <CountdownTimer endTime={product.endTime} />
          </div>
        )}

        {product.type === "fixed" && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
          </div>
        )}

        {product.type === "trade" && (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Value</span>
              <span className="font-bold text-base">${product.price.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">Looking for: {product.tradeFor}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex gap-1">
        {product.type === "auction" && (
          <Button className="flex-1 gradient-gold text-black hover:opacity-90 text-sm">
            <Gavel className="w-3 h-3 mr-1" />
            {t("product.bid")}
          </Button>
        )}
        {product.type === "fixed" && (
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
            <ShoppingBag className="w-3 h-3 mr-1" />
            {t("product.buyNow")}
          </Button>
        )}
        {product.type === "trade" && (
          <Button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 text-sm">
            <ArrowRightLeft className="w-3 h-3 mr-1" />
            {t("product.trade")}
          </Button>
        )}
        <Button size="icon" variant="outline" className="h-8 w-8 bg-transparent">
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
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-5 h-5 text-black" />
                </div>
                <span className="font-serif text-xl font-bold">MarketPlace</span>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <Button variant="ghost">{t("nav.home")}</Button>
                <Button variant="ghost">{t("nav.browse")}</Button>
                <Button variant="ghost" onClick={() => setShowListingForm(true)}>
                  {t("nav.sell")}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={language === lang.code ? "bg-accent" : ""}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {user ? (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user ? (
                    <>
                      <DropdownMenuItem onClick={() => setShowDashboard(true)}>{t("nav.account")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => setShowAuthModal(true)}>{t("nav.login")}</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowAuthModal(true)}>{t("nav.signup")}</DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="hidden md:inline-flex">
                <Menu className="w-4 h-4 mr-2" />
                Menu
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-balance">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in text-pretty">{t("hero.subtitle")}</p>

          <div className="max-w-2xl mx-auto relative animate-scale-in">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder={t("hero.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-2xl border-2 focus:border-primary"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 gradient-gold text-black hover:opacity-90">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Minimalist Image Gallery Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Premium selections from our marketplace</p>
          </div>

          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {/* Large Featured Image */}
            <div
              className="md:col-span-2 md:row-span-2 group cursor-pointer"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 1))}
            >
              <div className="relative h-96 bg-black rounded-lg overflow-hidden">
                <img
                  src="/luxury-watch.jpg"
                  alt="Vintage Rolex Submariner"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Vintage Rolex Submariner</h3>
                  <p className="text-white/80">$8,500</p>
                </div>
              </div>
            </div>

            {/* Small Gallery Items */}
            <div
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 2))}
            >
              <div className="relative h-44 bg-black rounded-lg overflow-hidden">
                <img
                  src="/silver-macbook-on-desk.png"
                  alt="MacBook Pro M3"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">MacBook Pro M3</h4>
                  <p className="text-white/80 text-sm">$2,499</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 3))}
            >
              <div className="relative h-44 bg-black rounded-lg overflow-hidden">
                <img
                  src="/classic-leather-jacket.png"
                  alt="Designer Leather Jacket"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Designer Leather Jacket</h4>
                  <p className="text-white/80 text-sm">Trade</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 4))}
            >
              <div className="relative h-44 bg-black rounded-lg overflow-hidden">
                <img
                  src="/pokemon-cards.jpg"
                  alt="Rare Pokemon Cards"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Pokemon Cards</h4>
                  <p className="text-white/80 text-sm">Auction</p>
                </div>
              </div>
            </div>

            <div
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(enhancedMockProducts.find((p) => p.id === 5))}
            >
              <div className="relative h-44 bg-black rounded-lg overflow-hidden">
                <img
                  src="/elegant-dining-set.png"
                  alt="Minimalist Dining Set"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-bold">Dining Set</h4>
                  <p className="text-white/80 text-sm">$899</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Deals Banner */}
          <div className="relative overflow-hidden mb-12">
            <div className="flex gap-6 animate-scroll-x">
              <div className="min-w-[300px] h-32 bg-black rounded-lg p-6 text-white relative overflow-hidden group hover:bg-gray-900 transition-colors duration-300">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Flash Sale</h3>
                  <p className="text-white/80 text-sm">Up to 50% off</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              <div className="min-w-[300px] h-32 bg-gray-900 rounded-lg p-6 text-white relative overflow-hidden group hover:bg-black transition-colors duration-300">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Ending Soon</h3>
                  <p className="text-white/80 text-sm">Final hours</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              <div className="min-w-[300px] h-32 bg-black rounded-lg p-6 text-white relative overflow-hidden group hover:bg-gray-900 transition-colors duration-300">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">New Arrivals</h3>
                  <p className="text-white/80 text-sm">Fresh daily</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>

              <div className="min-w-[300px] h-32 bg-gray-900 rounded-lg p-6 text-white relative overflow-hidden group hover:bg-black transition-colors duration-300">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Trade Deals</h3>
                  <p className="text-white/80 text-sm">Exchange items</p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Minimal Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300">
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300">
              <div className="text-2xl font-bold mb-1">25K+</div>
              <div className="text-sm text-muted-foreground">Live Auctions</div>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300">
              <div className="text-2xl font-bold mb-1">15K+</div>
              <div className="text-sm text-muted-foreground">Successful Trades</div>
            </div>

            <div className="text-center p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-300">
              <div className="text-2xl font-bold mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b">
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
                    className="rounded-full"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{filteredProducts.length} Products Found</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by: Featured</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Featured</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Ending Soon</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
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
      <footer className="bg-secondary/50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-black" />
                </div>
                <span className="font-serif text-xl font-bold">MarketPlace</span>
              </div>
              <p className="text-muted-foreground">
                The premium marketplace for auctions, fixed-price sales, and product trades.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Browse Products</li>
                <li>Start Selling</li>
                <li>How Auctions Work</li>
                <li>Trading Guide</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Tips</li>
                <li>Community</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Legal</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
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
