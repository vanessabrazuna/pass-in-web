import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import { IconButton } from "./icon-button";

export function Pagination() {
  return (
    <div className="inline-flex items-center gap-8">
      <span>Página 1 de 23</span>

      <div className="flex gap-1.5">
        <IconButton>
          <ChevronsLeft className="size-4" />
        </IconButton>

        <IconButton>
          <ChevronLeft className="size-4" />
        </IconButton>

        <IconButton>
          <ChevronRight className="size-4" />
        </IconButton>

        <IconButton>
          <ChevronsRight className="size-4" />
        </IconButton>
      </div>
    </div>
  )
}