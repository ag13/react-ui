import React from 'react'
import { useAUITable, AUITable } from '@aui/common/Table/table'
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid, makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Trans } from '@lingui/macro'
import { AUITypography } from '@aui/util'
import { MessageDescriptor } from '@lingui/core'
import { i18n } from '@aui/common'


const useStyles = makeStyles({
    right: {
      float: 'right'
    },
    sectionTitleText: {
      marginLeft: '40px',
      marginTop: '15px'
    },
    sectionSubtitleText: {
      marginLeft: '15px'
    },
    lastRunText: {
      marginTop: '10px'
    }
  })

export interface IAccordionTable{
    icon: string
    title: MessageDescriptor
    tableTitle: MessageDescriptor
    columns: any
    data: any
}

export const AccordionTable: React.FC<IAccordionTable> = ({
    icon,
    title,
    tableTitle,
    columns,
    data
}) => {
    const classes = useStyles({})
    const instance = useAUITable<any>({
        columns,
        data
      })

    return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon color="primary" />}
            aria-controls="expand-panel-content"
            id="expand-panel-header"
          >
            <img 
              src={icon} 
              alt='Apache Nifi'
              width="120"
              height="50"
            />
            <AUITypography kind="sectionTitle" className={classes.sectionTitleText}>
              {i18n._(title)}
            </AUITypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <AUITypography kind="sectionSubtitle" className={classes.sectionSubtitleText}>
                  {i18n._(tableTitle)}
                </AUITypography>
              </Grid>
              <Grid item xs={6} >
                <Button color="primary" className={classes.right}>
                  <Trans>Open NiFi Dashboard</Trans>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <AUITable instance={instance} />
              </Grid>
              <Grid item xs={3}>
                <Button variant="outlined" color="primary">
                  <Trans>Add Process Group</Trans>
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
      </Accordion>
    )
}