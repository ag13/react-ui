import React, { useMemo } from 'react';
import { useAUITable, AUITable } from '@aui/common/Table/table';
import { withAUITheme, AUITypography } from '@aui/util'
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid, makeStyles } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import apacheNifiImg from '../assets/apache-nifi.png'
import { StatusText } from '@aui/common';
import { Column } from 'react-table'

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

function _App() {
  const classes = useStyles({})
  const data = useMemo(() => [
    {
      name: {
        type: 'Process Group Name',
        text: 'MySQL DB to S3 Bucket'
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
        type: 'Process Group Name',
        text: 'MySQL DB to S3 Bucket'
      },
      status: 'Stopped',
      interval: {
        time: '3days 2hrs 00min',
        lastRun: '01/07/2020 03:20 PM'
      },
      nextAction: 'Start'
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
            src={apacheNifiImg} 
            alt='Apache Nifi'
            width="120"
            height="50"
          />
          <AUITypography kind="sectionTitle" className={classes.sectionTitleText}>Apache NiFi</AUITypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <AUITypography kind="sectionSubtitle" className={classes.sectionSubtitleText}>Process Group(s)</AUITypography>
            </Grid>
            <Grid item xs={6} >
              <Button color="primary" className={classes.right}>Open NiFi Dashboard</Button>
            </Grid>
            <Grid item xs={12}>
              <AUITable instance={instance} />
            </Grid>
            <Grid item xs={3}>
              <Button variant="outlined" color="primary">
                Add Process Group
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
    </Accordion>
  )
}

export const App = withAUITheme(_App);
