import React, { useMemo } from 'react';
import nodeJs from '@aui/assets/nodejs.png'
import { AUITypography } from '@aui/util'
import { StatusText } from '@aui/common';
import { Column } from 'react-table'
import { AccordionTable } from '@aui/common'
import { t } from '@lingui/macro'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    lastRunText: {
      marginTop: '10px'
    }
  })

export const NodeGroups = () => {
    const classes = useStyles({})
    const data = useMemo(() => [
        {
        name: {
            type: 'Node Group Name',
            text: 'Node 1'
        },
        status: 'Processing',
        interval: {
            time: 'Real-time',
            lastRun: ''
        },
        nextAction: 'Stop'
        },
        {
        name: {
            type: 'Node Group Name',
            text: 'Node 2'
        },
        status: 'Processing',
        interval: {
            time: 'Real time',
        },
        nextAction: 'Stop'
        }
    ], [])
    const columns: Array<Column<any>> = useMemo(() => [
        {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ cell: {value} }) => 
            <>
            <AUITypography kind="sectionSubtitle">{value.type}</AUITypography>
            <div>{value.text}</div>
            </>
        },
        {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell }) => 
            <AUITypography kind="sectionText">
            <StatusText status={cell.value} />
            </AUITypography>
        },
        {
        Header: 'Interval',
        accessor: 'interval',
        Cell: ({cell: {value}}) =>
            <>
            <AUITypography kind="sectionText">{value.time}</AUITypography>
            {
                value.lastRun &&
                <AUITypography kind="sectionTextGray" className={classes.lastRunText}>Last run on {value.lastRun}</AUITypography>
            }
            </>
        },
        {
        accessor: 'nextAction'
        }
    ], [classes])

    //TODO add correct type
    
    return (
        <AccordionTable 
            icon={nodeJs} 
            title={t`Nodes`} 
            tableTitle={t`Node Group(s)`}
            addNewButtonText={t`Add Node Group`}
            columns={columns}
            data={data}
        />
    )
}