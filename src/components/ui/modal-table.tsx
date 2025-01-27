//@ts-nocheck
"use client";
import * as React from "react";
import {
  flexRender,
  ColumnDef,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { LoadingSpinner } from "./spinner";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  searchKey: string;
  loading: boolean;
  noDataMessage?: string;
}

export default function ModalTable<TData>({
  table,
  loading,
  noDataMessage = "No data found.",
}: DataTableProps<TData>) {
  return (
    <>
      <ScrollArea className=" h-60 ">
        <Table className="">
          <TableHeader className=" top-0 right-0 left-0 w-full">
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-black">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="p-2 text-left font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="">
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  className=" "
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 text-left ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center text-blue-300 font-semibold"
                >
                  {noDataMessage} {/* Use the custom message here */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
