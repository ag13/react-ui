import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'

export interface PluginProps {
    id: string
    name: string
    type: string
    entry: string
}

export interface EventState {
    eventName: string
    eventId: string
    data?: any
}

export interface EventMessage {
    plugin: PluginProps,
    event: EventState,
    data?: any
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
    
    const { eventId, eventName, data } = useSelector((state: EventState) => state)
    const dispatch = useDispatch()

    const handleEventComplete: (eventCompleteMessage: EventCompleteMessage) => void = useCallback(eventCompleteMessage => {
        dispatch({type: 'EVENT_COMPLETE', payload: {event: eventCompleteMessage.event, data: eventCompleteMessage.data}})
    }, [dispatch])

    useEffect(() => {
        if(eventId && eventName){
            setEventMessage({
                plugin: pluginProps,
                event: {
                    eventId,
                    eventName
                },
                data: data
            })
        }
    }, [eventId, eventName, data])

    useEffect(() => {
        setWidgetProps({eventMessage, onEventComplete: handleEventComplete})
    }, [eventMessage, handleEventComplete])

    //Need a div inside Draggable to enable dragging. Does not work without it!
    return (
        <Draggable>
            <div>
            <Component {...props} {...widgetProps} />
            </div>
        </Draggable>
    )
}