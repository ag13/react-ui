import React, { useMemo, useEffect, useState } from 'react';
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

interface NodeGroupsProps{
    event: any
    onEventComplete: (param: any) => void
}

const NodeGroups: React.FC<NodeGroupsProps> = (props) => {
    const { event, onEventComplete } = props
    const classes = useStyles({})
    const [isSaving, setIsSaving] = useState(false)

    const [data, setData] = useState([])

    useEffect(() => {
        if(event && event.eventId){
            setIsSaving(true)
            console.log('Need to save node groups', event)
            setTimeout(() => {
                if(onEventComplete){
                    setIsSaving(false)
                    onEventComplete({eventId: event.eventId, data: {'result': 'success'}, eventName: 'save_complete'})
                }
            }, 8000)
            
        }
    }, [event, onEventComplete])

    useEffect(() => {

        async function fetchNodeGroups(){
            const response = await fetch('https://my-json-server.typicode.com/ag13/react-ui/nodeGroups', {
                method: 'GET'
            })
            if(response && response.status === 200){
                setData(await response.json())
            }
        }

        fetchNodeGroups()
        
    }, [])
    
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
        <>
            {isSaving && <div>Node Groups Table data is being saved...</div>}
            <AccordionTable 
                icon={nodeJs} 
                title={t`Nodes`} 
                tableTitle={t`Node Group(s)`}
                addNewButtonText={t`Add Node Group`}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default (props: NodeGroupsProps) => <NodeGroups {...props} />