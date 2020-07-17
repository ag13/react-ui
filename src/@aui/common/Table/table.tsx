import React, { PropsWithChildren, ReactElement } from 'react'
import { useTable, TableOptions, TableInstance } from 'react-table'
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress, makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles({
    tableNoData: {
        textAlign: 'center',
        width: '100%',
        minWidth: '100%'
    },
    progress: {
        marginTop: '30px'
    }
})

export function AUITable<T extends object>({instance}: PropsWithChildren<TableProps<T>>): ReactElement {
    const classes = useStyles({})
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
                {
                    (!rows || !rows.length) &&
                    <div className={classes.tableNoData}>
                        <CircularProgress color="primary" className={classes.progress} />
                    </div>
                }
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