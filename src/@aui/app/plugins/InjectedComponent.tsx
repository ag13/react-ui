import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface PluginProps {
    id: string
    name: string
    type: string
    entry: string
}

export interface WithWidgetProps{
    event: EventState
    onEventComplete: (eventName: string, data?: any) => void
}

type EventState = {
    eventName: string
    eventId: string
}

interface EventMessage {
    plugin: PluginProps,
    event: EventState
}

interface EventCompleteMessage {
    plugin: PluginProps,
    event: EventState,
    data: any
}

export const withWidget = (pluginProps: PluginProps) => <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithWidgetProps> => props => {
    // const widgetProps = useWidget(pluginProps)
    const [widgetProps, setWidgetProps] = useState({})
    const [ eventMessage, setEventMessage ] = useState<EventMessage | undefined>(undefined)
    const dispatch = useDispatch()
    const { eventId, eventName } = useSelector((state: EventState) => state)

    const handleEventComplete: (eventCompleteMessage: EventCompleteMessage) => void = useCallback(eventCompleteMessage => {
        console.log('inside handleEventComplete', eventCompleteMessage)
        dispatch({type: eventCompleteMessage.event.eventName, payload: {data: eventCompleteMessage.data}})
    }, [dispatch])

    
    useEffect(() => {
        console.log('message sent', eventId, eventName)
        if(eventId && eventName){
            setEventMessage({
                plugin: {
                    id: '1',
                    name: '',
                    type: '',
                    entry: ''
                },
                event: {
                    eventId,
                    eventName
                }
            })
        }
    }, [eventId, eventName])

    useEffect(() => {
        console.log('setting widget props', eventMessage, handleEventComplete)
        setWidgetProps({eventMessage, onEventComplete: handleEventComplete})
    }, [eventMessage, handleEventComplete])

    return <Component {...props} {...widgetProps} />
}