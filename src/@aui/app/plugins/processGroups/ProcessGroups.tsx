import React, { useMemo, useState, useEffect } from 'react';
import apacheNifiImg from '@aui/assets/apache-nifi.png'
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

interface ProcessGroupsProps{
    eventMessage: any
    onEventComplete: (param: any) => void
}

const ProcessGroups: React.FC<ProcessGroupsProps> = (props) => {
    const { eventMessage: {event = {}, plugin = {}} = {} } = props
    const { eventId, eventName } = event
    const [isSaving, setIsSaving] = useState(false)
    const { onEventComplete } = props

    const classes = useStyles({})

    const [data, setData] = useState([])

    useEffect(() => {
        
        if(eventId && eventName){
            setIsSaving(true)
            //Using setTimeout just to mimick any operation (like API calls)
            setTimeout(() => {
                if(onEventComplete){
                    setIsSaving(false)
                    onEventComplete({plugin, event: {eventId, eventName: 'SAVE_COMPLETE'}, data: {time: Math.random()}})
                }
            }, 8000)
            
        }
    }, [event, eventId, eventName, plugin, onEventComplete])

    useEffect(() => {

        async function fetchProcessGroups(){
            const response = await fetch('https://my-json-server.typicode.com/ag13/react-ui/processGroups', {
                method: 'GET'
            })
            if(response && response.status === 200){
                setData(await response.json())
            }
        }

        fetchProcessGroups()
        
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
            {isSaving && <div>Process Groups Table data is being saved...</div>}
            <AccordionTable 
                icon={apacheNifiImg} 
                title={t`Apache NiFi`} 
                tableTitle={t`Process Group(s)`}
                addNewButtonText={t`Add Process Group`}
                columns={columns}
                data={data}
            />
        </>
    )
}

export default (props: ProcessGroupsProps) => <ProcessGroups {...props} />