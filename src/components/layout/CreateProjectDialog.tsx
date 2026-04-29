import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sampleBillingConfigs } from './navigation'
import { useNavigation } from './NavigationContext'

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const { addProject, setActiveProject } = useNavigation()
  const [name, setName] = useState('')
  const [billingConfigId, setBillingConfigId] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Please enter a project name')
      return
    }

    if (!billingConfigId) {
      toast.error('Please select a billing configuration')
      return
    }

    const newProject = addProject({
      name: name.trim(),
      image: imagePreview || undefined,
      billingConfigId,
    })

    toast.success(`Project "${newProject.name}" created`)

    // Navigate into the new project
    setActiveProject(newProject)

    // Reset form and close dialog
    setName('')
    setBillingConfigId('')
    setImagePreview(null)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setName('')
    setBillingConfigId('')
    setImagePreview(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Add a new project to organize your campaigns and content.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Image Upload */}
            <div className="grid gap-2">
              <Label>Project image</Label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="relative">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-border">
                      <img
                        src={imagePreview}
                        alt="Project preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-16 w-16 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
                <div className="flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? 'Change image' : 'Upload image'}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: 80x80px
                  </p>
                </div>
              </div>
            </div>

            {/* Project Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Project name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                autoFocus
              />
            </div>

            {/* Billing Configuration */}
            <div className="grid gap-2">
              <Label htmlFor="billing">Billing configuration</Label>
              <Select value={billingConfigId} onValueChange={setBillingConfigId}>
                <SelectTrigger id="billing">
                  <SelectValue placeholder="Select a billing configuration" />
                </SelectTrigger>
                <SelectContent>
                  {sampleBillingConfigs.map((config) => (
                    <SelectItem key={config.id} value={config.id}>
                      <div className="flex flex-col">
                        <span>{config.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {billingConfigId && (
                <p className="text-xs text-muted-foreground">
                  {sampleBillingConfigs.find((c) => c.id === billingConfigId)?.description}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
