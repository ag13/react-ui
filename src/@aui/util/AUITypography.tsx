import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { standardText, labelGray } from './AUIStyle'
import { TypographyProps, Typography } from '@material-ui/core';
import classNames from 'classnames'

const useStyles = makeStyles({
    basic: {
        fontSize: '1rem',
        fontWeight: 400,
        color: standardText,
    },
    standardLabel: {
        fontSize: '0.75rem',
        fontWeight: 400,
        color: labelGray
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1
    },
    sectionSubtitle: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1
    },
    sectionText: {
        fontSize: '1rem',
        fontWeight: 450,
        lineHeight: 1
    },
    sectionTextGray: {
        fontSize: '0.8rem',
        fontWeight: 400,
        lineHeight: 0.8,
        color: labelGray
    }
})

type Kind = keyof ReturnType<typeof useStyles>

interface KindProps{
    kind?: Kind
}

export const AUITypography: React.FC<KindProps & TypographyProps> = ({
    kind,
    className: customClassName,
    ...rest
}) => {
    const classes = useStyles({})
    return (
        <Typography
            className={classNames(classes.basic, kind ? classes[kind] : undefined, customClassName)}
            {...rest}
        />
    )
}