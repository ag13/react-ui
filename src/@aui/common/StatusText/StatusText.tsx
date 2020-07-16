import React from 'react'
import { makeStyles } from '@material-ui/core'
import { successGreen, standardText } from '@aui/util/AUIStyle'

export interface IStatusText {
    status: string
}

export enum Status {
    STOPPED = 'Stopped',
    PROCESSING = 'Processing',
    COMPLETED = 'Completed'
}

const useStyles = makeStyles({
    statusGreen: {
        color: successGreen
    },
    statusDefault: {
        color: standardText
    }
})
export const StatusText: React.FC<IStatusText> = ({status}) => {
    const classes = useStyles({})
    return (
        <span className={status === Status.PROCESSING ? classes.statusGreen : classes.statusDefault}>{status}</span>
    )
}