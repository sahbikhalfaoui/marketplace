"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Heart,
  MessageCircle,
  Edit,
  Trash2,
  Package,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n"

interface UserDashboardProps {
  onBack: () => void
  onCreateListing: () => void
}

const mockListings = [
  {
    id: 1,
    title: "Vintage Rolex Submariner",
    price: 8500,
    currentBid: 7200,
    type: "auction",
    status: "active",
    views: 234,
    watchers: 12,
    bids: 8,
    image: "/luxury-watch.jpg",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: "MacBook Pro M3 16-inch",
    price: 2499,
    type: "fixed",
    status: "sold",
    views: 156,
    watchers: 8,
    image: "/silver-macbook-on-desk.png",
    soldDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: "Designer Leather Jacket",
    price: 450,
    type: "trade",
    status: "active",
    views: 89,
    watchers: 5,
    image: "/classic-leather-jacket.png",
    tradeOffers: 3,
  },
]

const mockPurchases = [
  {
    id: 1,
    title: "Rare Pokemon Card Collection",
    price: 950,
    seller: "CardMaster",
    status: "shipped",
    orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    image: "/pokemon-cards.jpg",
  },
  {
    id: 2,
    title: "Electric Guitar Fender",
    price: 650,
    seller: "MusicLover",
    status: "delivered",
    orderDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    image: "/electric-guitar.jpg",
  },
]

const mockMessages = [
  {
    id: 1,
    from: "BidderPro",
    subject: "Question about Rolex condition",
    preview: "Hi, I'm interested in your Rolex listing. Could you tell me more about...",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unread: true,
  },
  {
    id: 2,
    from: "TradeSeeker",
    subject: "Trade proposal for leather jacket",
    preview: "I have a vintage denim jacket that might interest you...",
    time: new Date(Date.now() - 6 * 60 * 60 * 1000),
    unread: false,
  },
]

export default function UserDashboard({ onBack, onCreateListing }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("listings")
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useTranslation()

  const stats = {
    totalListings: mockListings.length,
    activeListings: mockListings.filter((l) => l.status === "active").length,
    totalSales: mockListings.filter((l) => l.status === "sold").length,
    totalViews: mockListings.reduce((sum, l) => sum + l.views, 0),
    totalWatchers: mockListings.reduce((sum, l) => sum + l.watchers, 0),
    unreadMessages: mockMessages.filter((m) => m.unread).length,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Button>
            <h1 className="text-xl font-semibold">My Dashboard</h1>
            <Button onClick={onCreateListing} className="gradient-gold text-black hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">4.8 rating • Member since 2020</span>
                </div>
                <p className="text-muted-foreground mt-2">Trusted seller with over 50 successful transactions</p>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.totalListings}</div>
              <div className="text-xs text-muted-foreground">Total Listings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats.activeListings}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{stats.totalSales}</div>
              <div className="text-xs text-muted-foreground">Sold</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <div className="text-xs text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold">{stats.totalWatchers}</div>
              <div className="text-xs text-muted-foreground">Watchers</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{stats.unreadMessages}</div>
              <div className="text-xs text-muted-foreground">Messages</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your listings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
              <Button onClick={onCreateListing} className="gradient-gold text-black hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                New Listing
              </Button>
            </div>

            <div className="grid gap-4">
              {mockListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <img
                        src={listing.image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-32 h-32 object-cover"
                      />
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                            <div className="flex items-center gap-4 mb-2">
                              <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                                {listing.status}
                              </Badge>
                              <Badge variant="outline">{listing.type}</Badge>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {listing.views} views
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {listing.watchers} watching
                              </div>
                              {listing.bids && (
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  {listing.bids} bids
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-2">
                              ${(listing.currentBid || listing.price).toLocaleString()}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="mt-6">
            <div className="grid gap-4">
              {mockPurchases.map((purchase) => (
                <Card key={purchase.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{purchase.title}</h3>
                        <p className="text-sm text-muted-foreground">Sold by {purchase.seller}</p>
                        <p className="text-xs text-muted-foreground">
                          Ordered {purchase.orderDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${purchase.price.toLocaleString()}</div>
                        <Badge variant={purchase.status === "delivered" ? "default" : "secondary"}>
                          {purchase.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="mt-6">
            <div className="grid gap-4">
              {mockMessages.map((message) => (
                <Card key={message.id} className={message.unread ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{message.from}</h3>
                          {message.unread && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-medium mb-2">{message.subject}</h4>
                        <p className="text-sm text-muted-foreground">{message.preview}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{message.time.toLocaleDateString()}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold">$3,149</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Sale Price</span>
                      <span className="font-bold">$1,574</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-bold">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">MacBook Pro sold for $2,499</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">New bid on Rolex: $7,200</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Trade offer received</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
