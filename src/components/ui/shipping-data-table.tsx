//@ts-nocheck
"use client";
import * as React from "react";
import {
  flexRender,
  Table as ReactTableInstance,
  Row,
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
import DeliveryViewOrderModal from "../Routes/deliveries/deliveriesUI/_features/delivery-view-order-modal";
import ShippingOrderModal from "../Routes/shipping/_features/shipping-order-modal";

interface ShippingDataTableProps<TData> {
  table: ReactTableInstance<TData>;
  noDataMessage?: string;
}

export default function ShippingDataTable<TData>({
  table,
  noDataMessage = "No data found.",
}: ShippingDataTableProps<TData>) {
  const [selectedRow, setSelectedRow] = React.useState<Row<TData> | null>(null);
  const [isViewModalOpen, toggleViewModal] = useToggle(false);

  const handleRowClick = (row: Row<TData>) => {
    setSelectedRow(row);
    toggleViewModal(true);
  };

  return (
    <>
      <ScrollArea className="h-60">
        <Table>
          <TableHeader className="top-0 right-0 left-0 w-full">
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 text-left">
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

      {/* {isViewModalOpen && selectedRow && (
        <ShippingOrderModal
          isViewModal={isViewModalOpen}
          toggleViewModal={toggleViewModal}
          rowData={selectedRow.original}
        />
      )} */}
    </>
  );
}
