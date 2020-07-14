import React, { PropsWithChildren, ReactElement } from 'react'
import { useTable, TableOptions, TableInstance } from 'react-table'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

export function useAUITable<T extends object>(tableProps: PropsWithChildren<TableOptions<T>>) {
    const { columns, data } = tableProps
    const instance = useTable<T>({
        columns,
        data
    })
    return instance
}

export type TableProps<D extends object> = {
    instance: TableInstance<D>
}

export function AUITable<T extends object>({instance}: PropsWithChildren<TableProps<T>>): ReactElement {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = instance
    return (
        <Table {...getTableProps()}>
            <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <TableCell
                    {...column.getHeaderProps()}
                    >
                    {column.render('Header')}
                    </TableCell>
                ))}
                </TableRow>
            ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return (
                        <TableCell
                        {...cell.getCellProps()}
                        >
                        {cell.render('Cell')}
                        </TableCell>
                    )
                    })}
                </TableRow>
                )
            })}
            </TableBody>
        </Table>
    )
}