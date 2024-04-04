import { ChangeEvent, useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal, 
  Search
} from "lucide-react";

import { IconButton } from "./icon-button";
import { Table } from "./table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";

import { attendees } from "../data/Attendees";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br"

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

export function AttendeeList() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    setSearch(event.target.value)
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg 
          flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            type="text" 
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" 
            placeholder="Buscar participantes..." 
          />
        </div>

          {search}
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input 
                type="checkbox" 
                className="size-4 bg-black/20 rounded border 
                  border-white/10" 
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }} />
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input 
                    type="checkbox" 
                    className="size-4 bg-black/20 rounded border 
                      border-white/10 accent-orange-400" 
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {totalPages}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={() => setPage(1)} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton 
                    onClick={() => setPage(page - 1)} disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton 
                    onClick={() => setPage(page + 1)} disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton 
                    onClick={() => setPage(totalPages)} disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
