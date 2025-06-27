import React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/primitives/card"
import { Label } from "@/components/ui/label"
import { badgeVariants } from "@/components/primitives/badge.variants"
import { Checkbox } from "@/components/primitives/form.checkbox"

interface Category {
  id: string
  title: string
  subcategories: string[]
}

export interface CategoryItemProps {
  category: Category
  checked: boolean
  onCheckedChange: (categoryId: string, checked: boolean) => void
}

export const CategoryItem = ({
  category,
  checked,
  onCheckedChange,
}: CategoryItemProps) => {
  return (
    <Card
      asChild
      className={cn(
        "cursor-pointer border-border p-5 transition-all active:scale-[99%]",
        "has-[:checked]:border-primary",
        "duration-200",
        // base
        "focus-within:ring-2",
        // ring color
        "focus-within:ring-primary/30",
        // border color
        "focus-within:border-primary",
      )}
    >
      <Label className="block" htmlFor={category.id}>
        <div className="mb-2 flex items-center gap-2.5">
          <Checkbox
            id={category.id}
            name={category.title}
            checked={checked}
            onCheckedChange={(isChecked) =>
              onCheckedChange(category.id, isChecked === true)
            }
          />
          <span className="text-base font-medium sm:text-sm">
            {category.title}
          </span>
        </div>
        {category.subcategories.length > 0 && (
          <ul className="ml-6 mt-2 flex flex-wrap gap-1.5">
            {category.subcategories.map((subcategory) => (
              <li
                className={badgeVariants({ variant: "neutral" })}
                key={subcategory}
              >
                {subcategory}
              </li>
            ))}
          </ul>
        )}
      </Label>
    </Card>
  )
}

