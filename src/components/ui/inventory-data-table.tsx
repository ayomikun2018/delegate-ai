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
import useToggle from "../hooks/useToggle";
import { ViewInventoryModal } from "../Routes/inventory/inventoryUI/_features/view-inventory-modal";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  searchKey: string;
  loading: boolean;
  noDataMessage?: string;
  pageNumber?: number;
  pageRecord?: number;
}

export default function InventoryDataTable<TData>({
  table,
  loading,
  noDataMessage = "No data found.",
  pageNumber,
  pageRecord,
}: DataTableProps<TData>) {
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isViewModalOpen, toggleViewModal] = useToggle(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    toggleViewModal(true);
  };
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
                  onClick={() => handleRowClick(row.original)}
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
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-xs text-muted-foreground">
          Showing {pageRecord} of {pageNumber}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {isViewModalOpen && selectedRow && (
        <ViewInventoryModal
          isViewModal={isViewModalOpen}
          toggleViewModal={toggleViewModal}
          row={selectedRow}
        />
      )}
    </>
  );
}
