"use client"

import { Input } from "@workspace/ui/components/input"
import { X } from "lucide-react"
import { useState } from "react"

export function TagInput({ 
  name, 
  placeholder, 
  icon: Icon,
  tags,
  setTags
}: { 
  name: string, 
  placeholder: string,
  icon: any,
  tags: string[],
  setTags: (tags: string[]) => void
}) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = inputValue.trim()
      if (val && !tags.includes(val)) {
        setTags([...tags, val])
      }
      setInputValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-3">
      <div className="group relative">
        <Icon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary dark:text-gray-500" />
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-auto w-full rounded-xl border border-slate-200 bg-white/50 py-3.5 pr-4 pl-12 text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/50 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
        />
      </div>
      
      <input type="hidden" name={name} value={JSON.stringify(tags)} />
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 4).map(tag => (
            <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary dark:bg-primary/20">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="flex items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/20 hover:text-primary focus:outline-none"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {tags.length > 4 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary/70 dark:bg-primary/10">
              +{tags.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
