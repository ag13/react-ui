import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface PluginProps {
    id: string
    name: string
    type: string
    entry: string
}

export interface EventState {
    eventName: string
    eventId: string
}

export interface EventMessage {
    plugin: PluginProps,
    event: EventState
}

export interface EventCompleteMessage {
    plugin: PluginProps,
    event: EventState,
    data: any
}

export interface WithWidgetProps{
    event: EventState
    onEventComplete: (eventMessageComplete: EventCompleteMessage) => void
}

export const withWidget = (pluginProps: PluginProps) => <P extends object>(Component: React.ComponentType<P>): React.FC<P & WithWidgetProps> => props => {
    const [widgetProps, setWidgetProps] = useState({})
    const [ eventMessage, setEventMessage ] = useState<EventMessage | undefined>(undefined)
    
    const { eventId, eventName } = useSelector((state: EventState) => state)
    const dispatch = useDispatch()

    const handleEventComplete: (eventCompleteMessage: EventCompleteMessage) => void = useCallback(eventCompleteMessage => {
        dispatch({type: eventCompleteMessage.event.eventName, payload: {data: eventCompleteMessage.data}})
    }, [dispatch])

    useEffect(() => {
        if(eventId && eventName){
            setEventMessage({
                plugin: pluginProps,
                event: {
                    eventId,
                    eventName
                }
            })
        }
    }, [eventId, eventName])

    useEffect(() => {
        setWidgetProps({eventMessage, onEventComplete: handleEventComplete})
    }, [eventMessage, handleEventComplete])

    return <Component {...props} {...widgetProps} />
}