"use client";

import * as React from "react";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ReactTable,
  type Row,
  type RowData,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Columns3Icon,
  EyeOffIcon,
  SearchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";
import { Input } from "@/registry/lantern/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/lantern/ui/table";

type DataTableColumnMeta = {
  /** Label shown in the column visibility menu. Defaults to the column id. */
  title?: string;
  /** Extra classes for this column's header and cells, e.g. "text-right". */
  className?: string;
};

/** Every feature the data table uses, registered once so column types line up. */
const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

type DataTableFeatures = typeof dataTableFeatures;
type DataTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<DataTableFeatures, TData, TValue>;
type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>;

/** Typed column helper bound to the data table features. */
function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

function selectColumn<TData extends RowData>(): DataTableColumnDef<TData> {
  return {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    enableGlobalFilter: false,
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all rows on this page"
        checked={
          table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? "indeterminate" : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onClick={row.getToggleSelectedHandler()}
        className="translate-y-0.5"
      />
    ),
    meta: { className: "w-10" },
  };
}

function DataTable<TData extends RowData>({
  columns,
  data,
  className,
  filterPlaceholder = "Filter rows...",
  filterable = true,
  columnToggle = true,
  selectable = false,
  pagination = true,
  pageSize = 10,
  pageSizeOptions,
  getRowId,
  toolbar,
  emptyMessage = "No results.",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  columns: DataTableColumnDef<TData, any>[];
  data: TData[];
  /** Show a global filter input above the table. */
  filterable?: boolean;
  filterPlaceholder?: string;
  /** Show the column visibility menu. */
  columnToggle?: boolean;
  /** Prepend a checkbox column for row selection. */
  selectable?: boolean;
  /** Paginate rows and show the pagination bar. */
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  getRowId?: (row: TData, index: number) => string;
  /** Extra controls rendered at the end of the toolbar. */
  toolbar?: (table: DataTableInstance<TData>) => React.ReactNode;
  emptyMessage?: React.ReactNode;
}) {
  const allColumns = React.useMemo(
    () => (selectable ? [selectColumn<TData>(), ...columns] : columns),
    [columns, selectable],
  );

  const table = useTable({
    features: dataTableFeatures,
    columns: allColumns,
    data,
    getRowId,
    enableRowSelection: selectable,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize } },
  });

  const rows = pagination ? table.getRowModel().rows : table.getPrePaginatedRowModel().rows;
  const visibleColumnCount = table.getVisibleLeafColumns().length;

  return (
    <div data-slot="data-table" className={cn("flex w-full min-w-0 flex-col gap-3", className)} {...props}>
      {(filterable || columnToggle || toolbar) && (
        <div data-slot="data-table-toolbar" className="flex flex-wrap items-center gap-2">
          {filterable && (
            <div className="relative min-w-0 flex-1 sm:max-w-72">
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                aria-label="Filter rows"
                placeholder={filterPlaceholder}
                value={String(table.state.globalFilter ?? "")}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                className="h-9 pl-9"
              />
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            {toolbar?.(table)}
            {columnToggle && <DataTableViewOptions table={table} />}
          </div>
        </div>
      )}
      <div data-slot="data-table-body" className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="bg-secondary/40">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id} className="hover:bg-transparent">
                {group.headers.map((header) => (
                  <TableHead key={header.id} className={header.column.columnDef.meta?.className}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={visibleColumnCount} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && <DataTablePagination table={table} pageSizeOptions={pageSizeOptions} />}
    </div>
  );
}

/** A sortable column header: click to cycle, or use the menu to pick a direction or hide the column. */
function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={className}>{title}</div>;
  }
  const sorted = column.getIsSorted();
  const SortIcon = sorted === "asc" ? ArrowUpIcon : sorted === "desc" ? ArrowDownIcon : ArrowUpDownIcon;

  return (
    <div data-slot="data-table-column-header" className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={
              sorted ? `${title}, sorted ${sorted === "asc" ? "ascending" : "descending"}` : `${title}, not sorted`
            }
            className={cn(
              "-ml-2 inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-sm px-2 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase outline-none transition-colors",
              "hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/25 data-[state=open]:bg-secondary data-[state=open]:text-foreground",
              sorted && "text-primary hover:text-primary",
            )}
          >
            {title}
            <SortIcon aria-hidden="true" className={cn("size-3", !sorted && "opacity-50")} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-36">
          {column.getCanSort() && (
            <>
              <DropdownMenuItem onSelect={() => column.toggleSorting(false)}>
                <ArrowUpIcon />
                Ascending
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => column.toggleSorting(true)}>
                <ArrowDownIcon />
                Descending
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && <DropdownMenuSeparator />}
          {column.getCanHide() && (
            <DropdownMenuItem onSelect={() => column.toggleVisibility(false)}>
              <EyeOffIcon />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** Column visibility menu listing every column that can be hidden. */
function DataTableViewOptions<TData extends RowData>({ table }: { table: DataTableInstance<TData> }) {
  const columns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Columns3Icon />
          <span className="hidden sm:inline">Columns</span>
          <span className="sr-only sm:hidden">Toggle columns</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) => column.toggleVisibility(!!value)}
            onSelect={(event) => event.preventDefault()}
          >
            {column.columnDef.meta?.title ?? column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Selection count, rows-per-page select and page buttons. Stacks on narrow screens. */
function DataTablePagination<TData extends RowData>({
  table,
  pageSizeOptions = [5, 10, 20, 50],
  className,
}: {
  table: DataTableInstance<TData>;
  pageSizeOptions?: number[];
  className?: string;
}) {
  const { pageIndex, pageSize } = table.state.pagination;
  const pageCount = Math.max(table.getPageCount(), 1);
  const selectable = table.getAllLeafColumns().some((column) => column.id === "select");
  const filteredCount = table.getFilteredRowModel().rows.length;
  const options = pageSizeOptions.includes(pageSize) ? pageSizeOptions : [...pageSizeOptions, pageSize].sort((a, b) => a - b);

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-col-reverse gap-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div aria-live="polite">
        {selectable
          ? `${table.getFilteredSelectedRowModel().rows.length} of ${filteredCount} selected`
          : `${filteredCount} rows`}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 sm:justify-end">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="hidden sm:inline">
            Rows
          </span>
          <Select value={String(pageSize)} onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger size="sm" aria-label="Rows per page" className="w-[4.5rem] font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {options.map((size) => (
                <SelectItem key={size} value={String(size)} className="font-mono text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="tabular-nums">
          Page {pageIndex + 1} / {pageCount}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon-sm"
            className="hidden sm:inline-flex"
            aria-label="First page"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="hidden sm:inline-flex"
            aria-label="Last page"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  createDataTableColumnHelper,
  dataTableFeatures,
  type DataTableColumnDef,
  type DataTableColumnMeta,
  type DataTableFeatures,
  type DataTableInstance,
  type Row as DataTableRow,
};
