"use client";

import * as React from "react";
import Link from "next/link";
// import { writeFile, type WorkBook, utils } from "xlsx";
import {
  // usePathname,
  useRouter,
} from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  // SlidersHorizontal,
  Edit,
  MoreVertical,
  Trash2,
  View,
  // MoreHorizontal

  // Download,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  quantityAvailable: number;
}

interface Props {
  data: Book[];
  pageCount?: number;
}
const BookTable = (props: Props) => {
  const router = useRouter();
  // const pathname = usePathname();

  const [isPending, startTransition] = React.useTransition();

  const getBooks = props.data;

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "title",
      header: "Name",
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ cell }) => {
        const genre = cell.getValue();
        return (
          <Badge variant="outline" className="capitalize">
            {genre as string}
          </Badge>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "quantityAvailable",
      header: "qnty",
    },
    {
      accessorKey: "isbn",
      header: "isbn",
    }

    // {
    //   accessorKey: "isSelected",
    //   id: "selected",
    //   header: "Is Selected",
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.original.isSelected}
    //       onCheckedChange={() => {
    //         startTransition(() => {
    //           try {
    //             async () => {
    //               await updateSelected.mutateAsync({
    //                 id: row.original.id,
    //                 selected: !row.original.isSelected,
    //               });

    //               router.refresh();
    //             };
    //           } catch (error) {
    //             error instanceof Error
    //               ? toast.error(error.message)
    //               : toast.error("Something went wrong");
    //           }
    //         });
    //       }}
    //       // aria-label="Select row"
    //       // className="flex items-center justify-center"
    //     />
    //   ),
    //   // enableSorting: false,
    //   // enableHiding: false,
    // },
    // {
    //   accessorKey: "publishedAt",
    //   header: "Publish Date",
    //   cell: ({ cell }) => {
    //     const date = cell.getValue() as Date;
    //     const formatted = new Intl.DateTimeFormat("en-IN")
    //       .format(date)
    //       .replace(/\//g, "-");
    //     return <span>{formatted}</span>;
    //   },

    //   enableColumnFilter: false,
    // },
    // {
    //   // Column for row actions
    //   id: "actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const image = row.original.image;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button
    //             aria-label="Open menu"
    //             variant="ghost"
    //             className="h-8 w-8 p-0"
    //           >
    //             <MoreVertical className="h-4 w-4" aria-hidden="true" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end" className="w-[150px]">
    //           <DropdownMenuItem asChild>
    //             <Link href={image}>
    //               <Edit
    //                 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
    //                 aria-hidden="true"
    //               />
    //               Edit
    //             </Link>
    //           </DropdownMenuItem>
    //           <DropdownMenuItem asChild>
    //             <Link href={image}>
    //               <View
    //                 className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
    //                 aria-hidden="true"
    //               />
    //               View
    //             </Link>
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem
    //             onClick={() => {
    //               startTransition(() => {
    //                 try {
    //                   // eslint-disable-next-line @typescript-eslint/no-floating-promises
    //                   table.getSelectedRowModel().rows.map(
    //                     async (row) =>
    //                       await deleteBillboard.mutateAsync({
    //                         id: row.original.id,
    //                       }),
    //                   );
    //                   router.refresh();
    //                 } catch (error) {
    //                   error instanceof Error
    //                     ? toast.error(error.message)
    //                     : toast.error("Something went wrong");
    //                 }
    //                 table.resetRowSelection();
    //               });
    //             }}
    //             // disabled={!table.getSelectedRowModel().rows.length || isPending}
    //           >
    //             <Trash2
    //               className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
    //               aria-hidden="true"
    //             />
    //             Delete
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = React.useMemo(() => props.data, [props.data]);
  const table = useReactTable({
    data,
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

  const [searchRow, setSearchRow] = React.useState<string>(
    table.getAllColumns()[1]?.id ?? "",
  );

  return (
    <div className="w-full dark:text-white">
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-x-2  ">
          <Input
            placeholder="Filter records..."
            value={
              (table.getColumn(searchRow)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchRow)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={buttonVariants({ variant: "outline" })}>
                <span className="capitalize">{searchRow}</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanFilter())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => setSearchRow(column.id)}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-x-2">
          {!(table.getFilteredSelectedRowModel().rows.length === 0) && (
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              size="sm"
              className=""
              // onClick={() => {
              //   startTransition(() => {
              //     try {
              //       // eslint-disable-next-line @typescript-eslint/no-floating-promises
              //       table.getSelectedRowModel().rows.map(
              //         async (row) =>
              //           await deleteBillboard.mutateAsync({
              //             id: row.original.id,
              //           }),
              //       );
              //       router.refresh();
              //     } catch (error) {
              //       error instanceof Error
              //         ? toast.error(error.message)
              //         : toast.error("Something went wrong");
              //     }
              //     table.resetRowSelection();
              //   });
              // }}
              disabled={!table.getSelectedRowModel().rows.length || isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden />
              Delete ({table.getSelectedRowModel().rows.length})
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  // className="ml-2"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="mt-4 flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {String(pageSize)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
