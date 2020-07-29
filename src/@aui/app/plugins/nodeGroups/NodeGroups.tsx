import React, { useMemo, useEffect, useState } from 'react';
import nodeJs from '@aui/assets/nodejs.png'
import { AUITypography } from '@aui/util'
import { StatusText } from '@aui/common';
import { Column } from 'react-table'
import { AccordionTable } from '@aui/common'
import { t } from '@lingui/macro'
import { makeStyles, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles({
    lastRunText: {
      marginTop: '10px'
    },
    saveDataMessage: {
        color: 'red',
        fontSize: '1.5rem',
        fontWeight: 600
    }
  })

interface NodeGroupsProps{
    eventMessage?: any
    onEventComplete?: (param: any) => void
}

const NodeGroups: React.FC<NodeGroupsProps> = (props) => {
    const { eventMessage: {event = {}, plugin = {}, data = {}} = {} } = props
    const { eventId, eventName } = event

    const classes = useStyles({})
    const [isSaving, setIsSaving] = useState(false)
    const [operation, setOperation] = useState('')
    const { onEventComplete } = props
    const [nodeGroupsData, setNodeGroupsData] = useState<any>([])

    useEffect(() => {
        if(eventId && eventName && data && Object.keys(data).length){
            const nodeData = {
                "name": {
                  "type": "Node Group Name",
                  "text": data.groupName
                },
                "status": "Processing",
                "interval": {
                  "time": "Real-time",
                  "lastRun": ""
                },
                "nextAction": "Stop"
            }
            setNodeGroupsData((nodeGroupsData: any) => [...nodeGroupsData, nodeData])
        }
    }, [data, eventId, eventName])

    useEffect(() => {
        
        if(eventId && eventName){
            setIsSaving(true)
            if(eventName === 'SAVE'){
                setOperation('Save')
            }else if(eventName === 'NEXT_PAGE'){
                setOperation('Next page')
            }else if(eventName === 'PREVIOUS_PAGE'){
                setOperation('Previous page')
            }
            //Using setTimeout just to mimick any operation (like API calls)
            setTimeout(() => {
                if(onEventComplete){
                    setIsSaving(false)
                    onEventComplete({plugin, event: {eventId, eventName: 'SAVE_COMPLETE'}, data: {time: Math.random()}})
                }
            }, 4000)
            
        }
    }, [event, eventId, eventName, plugin, onEventComplete])

    useEffect(() => {

        async function fetchNodeGroups(){
            const response = await fetch('https://my-json-server.typicode.com/ag13/react-ui/nodeGroups', {
                method: 'GET'
            })
            if(response && response.status === 200){
                setNodeGroupsData(await response.json())
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
            <Card>
                <CardContent>
                    {isSaving && <div className={classes.saveDataMessage}>On widget: {operation} operation performed</div>}
                    <AccordionTable 
                        icon={nodeJs} 
                        title={t`Nodes`} 
                        tableTitle={t`Node Group(s)`}
                        addNewButtonText={t`Add Node Group`}
                        columns={columns}
                        data={nodeGroupsData}
                    />
                </CardContent>
            </Card>
            
        </>
    )
}

export default (props: NodeGroupsProps) => <NodeGroups {...props} />