"use client";
import React, { useState } from "react";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/utils/supabase/supabaseClient";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Loader, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import EmptyDataSection from "@/components/custom/empty-data-section";
import VendorCreateSheet from "./VendorCreateSheet";
import { IconBadge } from "@/components/custom/svg-icons/IconBadge";
import moment from "moment";

export default function VendorDataTable({ user }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [refreshNow, setRefreshNow] = useState(false);
  const [vendors, setVendors] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      const {
        data: { users },
        error,
      } = await supabase.auth.admin.listUsers();

      if (error) {
        throw new Error("Failed to fetch vendors");
      }

      if (users) {
        setVendors(users || []);
        setRefreshNow(false);
      }
    };
    fetch();
  }, [refreshNow]);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number>();
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      setIsDeleting(true);
      const { error, data, status } = await supabase.from("profiles").delete().eq("id", id);

      if (error || status !== 204) {
        throw new Error("Failed to delete vendor");
      }

      setRefreshNow(true);
      toast.success(isDeleting ? "Vendor deleting" : "Vendor deleted successfully");
    } catch (error) {
      toast.error("Failed to delete vendor");
    } finally {
      setIsDeleting(false);
    }
  };
  console.log(vendors);

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Vendor Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className=" ml-2">{row.getValue("email")}</div>,
    },

    {
      accessorKey: "user_metadata",
      header: "Vendor Role",
      cell: ({ row }: any) => (
        <div className=" capitalize flex  ">
          {row.getValue("user_metadata")?.role === "vendor" && (
            <div className="flex items-center gap-1 bg-blue-100 px-2   rounded-full text-[12px]">
              <IconBadge className="h-3 w-3 text-blue-600" />
              {row.getValue("user_metadata")?.role}
            </div>
          )}

          {row.getValue("user_metadata")?.role === "super-admin" && (
            <div className="flex items-center gap-1 bg-green-100 px-2   rounded-full text-[12px]">
              <IconBadge className="h-3 w-3 text-green-600" />
              {row.getValue("user_metadata")?.role}
            </div>
          )}
        </div>
      ),
    },

    {
      accessorKey: "last_sign_in_at",
      header: "Last Sign In",
      cell: ({ row }: any) => (
        <div className=" ">
          {/* {moment(row.getValue("last_sign_in_at")).subtract(6, 'days').calendar()} */}
          {moment(row.getValue("last_sign_in_at")).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      ),
    },

    {
      accessorKey: "created_at",
      header: "Registered At",
      cell: ({ row }: any) => <div className=" ">{moment(row.getValue("created_at")).format("MMMM Do YYYY, h:mm:ss a")}</div>,
    },

    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                {deletingId === item.id ? <Loader className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* <SizeEditSheet
                id={item.id}
                setRefreshNow={setRefreshNow}
              /> */}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-500/90"> Delete size</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your data and remove your data from our servers.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className=" bg-red-500/90 hover:bg-red-500"
                      onClick={() => handleDelete(item.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: vendors,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      {vendors.length >= 1 ? (
        <div className="w-full">
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Filter names..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <div className=" flex items-center gap-4">
                <VendorCreateSheet
                  user={user}
                  setRefreshNow={setRefreshNow}
                />

                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto">
                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyDataSection
          heading="vendors"
          title="You have no vendors"
          description="vendors need to be created before adding them in product."
          child={<VendorCreateSheet setRefreshNow={setRefreshNow} />}
        />
      )}
    </>
  );
}
