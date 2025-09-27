"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Heart,
  Share2,
  Flag,
  Star,
  Clock,
  Gavel,
  ShoppingBag,
  ArrowRightLeft,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/i18n"

interface ProductDetailProps {
  product: {
    id: number
    title: string
    price: number
    currentBid?: number
    type: "auction" | "fixed" | "trade"
    endTime?: Date
    tradeFor?: string
    images: string[]
    seller: string
    rating: number
    category: string
    featured?: boolean
    description: string
    condition: string
    location: string
    shipping: string
    returns: string
    views: number
    watchers: number
    bids?: Array<{ user: string; amount: number; time: Date }>
  }
  onBack: () => void
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 group">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-black/90 text-black dark:text-white hover:bg-white dark:hover:bg-black border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 w-8 h-8"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-black/90 text-black dark:text-white hover:bg-white dark:hover:bg-black border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 w-8 h-8"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentImage
                  ? "border-black dark:border-white shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeLeft(`${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{t("time.ending")}</span>
      </div>
      <div className="text-xl font-bold text-black dark:text-white tracking-tight">{timeLeft}</div>
    </div>
  )
}

function BidHistory({ bids }: { bids: Array<{ user: string; amount: number; time: Date }> }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-xl">Bid History</h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {bids.map((bid, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 border border-gray-200 dark:border-gray-700">
                <AvatarFallback className="text-sm bg-gray-200 dark:bg-gray-700">{bid.user[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{bid.user}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">${bid.amount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">
                {bid.time.toLocaleDateString()} {bid.time.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [bidAmount, setBidAmount] = useState("")
  const [tradeOffer, setTradeOffer] = useState("")
  const [message, setMessage] = useState("")
  const [isWatching, setIsWatching] = useState(false)
  const { t } = useTranslation()

  const mockBids = [
    { user: "BidderPro", amount: product.currentBid || product.price, time: new Date(Date.now() - 30 * 60 * 1000) },
    {
      user: "CollectorX",
      amount: (product.currentBid || product.price) - 100,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      user: "AuctionKing",
      amount: (product.currentBid || product.price) - 250,
      time: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-900 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg w-8 h-8"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg w-8 h-8"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <ImageCarousel images={product.images || [product.image || "/placeholder.svg"]} title={product.title} />
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.featured && (
                  <Badge className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-full text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {product.type === "auction" && (
                  <Badge className="bg-gray-900 text-white dark:bg-gray-100 dark:text-black px-2 py-1 rounded-full text-xs">
                    <Gavel className="w-3 h-3 mr-1" />
                    {t("product.auction")}
                  </Badge>
                )}
                {product.type === "trade" && (
                  <Badge className="bg-gray-700 text-white dark:bg-gray-300 dark:text-black px-2 py-1 rounded-full text-xs">
                    <ArrowRightLeft className="w-3 h-3 mr-1" />
                    {t("product.trade")}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-4 leading-tight tracking-tight">{product.title}</h1>

              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <Avatar className="w-10 h-10 border border-gray-200 dark:border-gray-700">
                  <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-sm font-semibold">
                    {product.seller[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{product.seller}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-black dark:fill-white text-black dark:text-white" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{product.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  {product.views} views
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  {product.watchers} watching
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  {product.location}
                </span>
              </div>
            </div>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-5">
                {product.type === "auction" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Current bid</span>
                      <span className="text-2xl font-bold tracking-tight">${product.currentBid?.toLocaleString()}</span>
                    </div>
                    {product.endTime && <CountdownTimer endTime={product.endTime} />}

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter bid amount"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="flex-1 h-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-black dark:focus:border-white"
                        />
                        <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-10 px-4 rounded-lg font-medium transition-all duration-200">
                          <Gavel className="w-4 h-4 mr-1" />
                          Bid
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Minimum bid: ${((product.currentBid || 0) + 50).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {product.type === "fixed" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Price</span>
                      <span className="text-2xl font-bold tracking-tight">${product.price.toLocaleString()}</span>
                    </div>
                    <Button
                      className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 h-11 rounded-lg font-medium transition-all duration-200"
                      size="lg"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t("product.buyNow")}
                    </Button>
                  </div>
                )}

                {product.type === "trade" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-400">Estimated value</span>
                      <span className="text-2xl font-bold tracking-tight">${product.price.toLocaleString()}</span>
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium">
                        <span className="text-gray-600 dark:text-gray-400">Looking for:</span> {product.tradeFor}
                      </p>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-gray-900 text-white dark:bg-gray-100 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 h-11 rounded-lg font-medium transition-all duration-200"
                          size="lg"
                        >
                          <ArrowRightLeft className="w-4 h-4 mr-2" />
                          {t("product.trade")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-xl border border-gray-200 dark:border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">Propose a Trade</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Describe what you'd like to trade..."
                            value={tradeOffer}
                            onChange={(e) => setTradeOffer(e.target.value)}
                            className="min-h-24 rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                          <Button className="w-full bg-black text-white dark:bg-white dark:text-black h-10 rounded-lg font-medium">
                            Send Trade Proposal
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="flex-1 h-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 bg-transparent"
                    onClick={() => setIsWatching(!isWatching)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-1 ${isWatching ? "fill-black dark:fill-white text-black dark:text-white" : ""}`}
                    />
                    {isWatching ? "Watching" : "Watch"}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 h-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 bg-transparent"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-xl border border-gray-200 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Message Seller</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Ask a question about this item..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="min-h-24 rounded-lg border border-gray-200 dark:border-gray-700"
                        />
                        <Button className="w-full bg-black text-white dark:bg-white dark:text-black h-10 rounded-lg font-medium">
                          Send Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    <span className="text-xs font-medium">Buyer Protection</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    <span className="text-xs font-medium">Fast Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <RotateCcw className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </div>
                    <span className="text-xs font-medium">Easy Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
              <TabsTrigger
                value="description"
                className="rounded-lg font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-black"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-lg font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-black"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-lg font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-black"
              >
                Shipping
              </TabsTrigger>
              {product.type === "auction" && (
                <TabsTrigger
                  value="bids"
                  className="rounded-lg font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-black"
                >
                  Bids
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3">Item Details</h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <dt className="text-gray-600 dark:text-gray-400 font-medium">Condition:</dt>
                          <dd className="font-semibold">{product.condition}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <dt className="text-gray-600 dark:text-gray-400 font-medium">Category:</dt>
                          <dd className="capitalize font-semibold">{product.category}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-gray-600 dark:text-gray-400 font-medium">Location:</dt>
                          <dd className="font-semibold">{product.location}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-3">Seller Info</h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <dt className="text-gray-600 dark:text-gray-400 font-medium">Rating:</dt>
                          <dd className="flex items-center gap-1 font-semibold">
                            <Star className="w-4 h-4 fill-black dark:fill-white text-black dark:text-white" />
                            {product.rating}
                          </dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-gray-600 dark:text-gray-400 font-medium">Member since:</dt>
                          <dd className="font-semibold">2020</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-lg mb-2">Shipping Options</h4>
                      <p className="text-gray-700 dark:text-gray-300">{product.shipping}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Returns</h4>
                      <p className="text-gray-700 dark:text-gray-300">{product.returns}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {product.type === "auction" && (
              <TabsContent value="bids" className="mt-6">
                <Card className="border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <BidHistory bids={mockBids} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
