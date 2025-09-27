"use client"

import type React from "react"

import { useState } from "react"
import {
  Upload,
  X,
  Plus,
  ArrowLeft,
  DollarSign,
  Package,
  Camera,
  MapPin,
  Truck,
  RotateCcw,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTranslation } from "@/lib/i18n"

interface ListingFormProps {
  onBack: () => void
  onSubmit: (listing: any) => void
}

interface FormData {
  title: string
  description: string
  category: string
  condition: string
  listingType: "auction" | "fixed" | "trade"
  price: string
  startingBid: string
  auctionDuration: string
  tradeFor: string
  location: string
  shipping: string[]
  returns: boolean
  images: File[]
}

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion & Accessories" },
  { value: "home", label: "Home & Garden" },
  { value: "collectibles", label: "Collectibles & Art" },
  { value: "vehicles", label: "Vehicles" },
  { value: "books", label: "Books & Media" },
  { value: "sports", label: "Sports & Outdoors" },
  { value: "toys", label: "Toys & Games" },
]

const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
]

const shippingOptions = [
  { id: "standard", label: "Standard Shipping (5-7 days)", price: "Free" },
  { id: "express", label: "Express Shipping (2-3 days)", price: "$9.99" },
  { id: "overnight", label: "Overnight Shipping", price: "$24.99" },
  { id: "pickup", label: "Local Pickup Only", price: "Free" },
]

export default function ListingForm({ onBack, onSubmit }: ListingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    condition: "",
    listingType: "fixed",
    price: "",
    startingBid: "",
    auctionDuration: "7",
    tradeFor: "",
    location: "",
    shipping: ["standard"],
    returns: true,
    images: [],
  })
  const [dragActive, setDragActive] = useState(false)
  const { t } = useTranslation()

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newImages = Array.from(files).slice(0, 8 - formData.images.length)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category && formData.condition
      case 2:
        return formData.images.length > 0
      case 3:
        if (formData.listingType === "auction") {
          return formData.startingBid && formData.auctionDuration
        } else if (formData.listingType === "fixed") {
          return formData.price
        } else if (formData.listingType === "trade") {
          return formData.tradeFor && formData.price
        }
        return false
      case 4:
        return formData.location && formData.shipping.length > 0
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      onSubmit(formData)
    }
  }

  const steps = [
    { number: 1, title: "Basic Info", description: "Title, description, category" },
    { number: 2, title: "Photos", description: "Upload product images" },
    { number: 3, title: "Pricing", description: "Set price or auction details" },
    { number: 4, title: "Shipping", description: "Location and shipping options" },
    { number: 5, title: "Review", description: "Review and publish" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Button>
            <h1 className="text-xl font-semibold">Create Listing</h1>
            <div className="w-24" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.number
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
                  <p className="text-muted-foreground mb-6">
                    Tell us about your item. Be descriptive and honest to attract the right buyers.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., iPhone 15 Pro Max 256GB Space Black"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/80 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your item's condition, features, and any important details..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="mt-1 min-h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/1000 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="condition">Condition *</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value) => handleInputChange("condition", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition.value} value={condition.value}>
                              {condition.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Photos */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Add Photos</h2>
                  <p className="text-muted-foreground mb-6">
                    Add up to 8 photos. The first photo will be your main image.
                  </p>
                </div>

                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Drag photos here or click to browse</h3>
                  <p className="text-muted-foreground mb-4">JPG, PNG, or WEBP files up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </label>
                  </Button>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Main</Badge>
                        )}
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {formData.images.length < 8 && (
                      <label
                        htmlFor="image-upload-additional"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary transition-colors"
                      >
                        <Plus className="w-8 h-8 text-muted-foreground" />
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files)}
                          className="hidden"
                          id="image-upload-additional"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Pricing & Listing Type</h2>
                  <p className="text-muted-foreground mb-6">Choose how you want to sell your item.</p>
                </div>

                <RadioGroup
                  value={formData.listingType}
                  onValueChange={(value: "auction" | "fixed" | "trade") => handleInputChange("listingType", value)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <div className="flex-1">
                      <Label htmlFor="fixed" className="font-semibold">
                        Fixed Price
                      </Label>
                      <p className="text-sm text-muted-foreground">Sell at a set price with Buy Now option</p>
                    </div>
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="auction" id="auction" />
                    <div className="flex-1">
                      <Label htmlFor="auction" className="font-semibold">
                        Auction
                      </Label>
                      <p className="text-sm text-muted-foreground">Let buyers bid on your item</p>
                    </div>
                    <Package className="w-5 h-5 text-orange-600" />
                  </div>

                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="trade" id="trade" />
                    <div className="flex-1">
                      <Label htmlFor="trade" className="font-semibold">
                        Trade
                      </Label>
                      <p className="text-sm text-muted-foreground">Exchange for other items</p>
                    </div>
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </RadioGroup>

                {formData.listingType === "fixed" && (
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {formData.listingType === "auction" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="startingBid">Starting Bid *</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="startingBid"
                          type="number"
                          placeholder="0.00"
                          value={formData.startingBid}
                          onChange={(e) => handleInputChange("startingBid", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="duration">Auction Duration</Label>
                      <Select
                        value={formData.auctionDuration}
                        onValueChange={(value) => handleInputChange("auctionDuration", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="10">10 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {formData.listingType === "trade" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tradeFor">What are you looking for? *</Label>
                      <Textarea
                        id="tradeFor"
                        placeholder="Describe what you'd like to trade for..."
                        value={formData.tradeFor}
                        onChange={(e) => handleInputChange("tradeFor", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="estimatedValue">Estimated Value</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="estimatedValue"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        This helps others understand the value of your item
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Shipping */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Shipping & Location</h2>
                  <p className="text-muted-foreground mb-6">Set your location and shipping preferences.</p>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Shipping Options *</Label>
                  <div className="space-y-3 mt-2">
                    {shippingOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <Checkbox
                          id={option.id}
                          checked={formData.shipping.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleInputChange("shipping", [...formData.shipping, option.id])
                            } else {
                              handleInputChange(
                                "shipping",
                                formData.shipping.filter((s) => s !== option.id),
                              )
                            }
                          }}
                        />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="font-medium">
                            {option.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{option.price}</p>
                        </div>
                        <Truck className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="returns"
                    checked={formData.returns}
                    onCheckedChange={(checked) => handleInputChange("returns", checked)}
                  />
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="returns">Accept returns (30-day policy)</Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Review Your Listing</h2>
                  <p className="text-muted-foreground mb-6">Review all details before publishing your listing.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Item Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <strong>Title:</strong> {formData.title}
                        </div>
                        <div>
                          <strong>Category:</strong> {categories.find((c) => c.value === formData.category)?.label}
                        </div>
                        <div>
                          <strong>Condition:</strong> {conditions.find((c) => c.value === formData.condition)?.label}
                        </div>
                        <div>
                          <strong>Description:</strong> {formData.description.substring(0, 100)}...
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Pricing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {formData.listingType === "fixed" && (
                          <div>
                            <strong>Price:</strong> ${formData.price}
                          </div>
                        )}
                        {formData.listingType === "auction" && (
                          <div>
                            <div>
                              <strong>Starting Bid:</strong> ${formData.startingBid}
                            </div>
                            <div>
                              <strong>Duration:</strong> {formData.auctionDuration} days
                            </div>
                          </div>
                        )}
                        {formData.listingType === "trade" && (
                          <div>
                            <div>
                              <strong>Looking for:</strong> {formData.tradeFor}
                            </div>
                            <div>
                              <strong>Estimated Value:</strong> ${formData.price}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Photos ({formData.images.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          {formData.images.slice(0, 6).map((image, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(image) || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Shipping</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <strong>Location:</strong> {formData.location}
                        </div>
                        <div>
                          <strong>Options:</strong> {formData.shipping.length} selected
                        </div>
                        <div>
                          <strong>Returns:</strong> {formData.returns ? "Accepted" : "Not accepted"}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    By publishing this listing, you agree to our Terms of Service and Community Guidelines. Make sure
                    all information is accurate and complete.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
                className="gradient-gold text-black hover:opacity-90"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!validateStep(4)}
                className="gradient-gold text-black hover:opacity-90"
              >
                Publish Listing
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
