import React, { useMemo } from 'react';
import apacheNifiImg from '@aui/assets/apache-nifi.png'
import { withAUITheme, AUITypography } from '@aui/util'
import { makeStyles } from '@material-ui/core'
import { StatusText } from '@aui/common';
import { Column } from 'react-table'
import { I18nLoader } from '@aui/common'
import { AccordionTable } from '@aui/common'
import { t } from '@lingui/macro'

const useStyles = makeStyles({
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
  
  return (
    <I18nLoader language="en">
      <AccordionTable 
        icon={apacheNifiImg} 
        title={t`Apache NiFi`} 
        tableTitle={t`Process Group(s)`}
        columns={columns}
        data={data}
      />
    </I18nLoader>
  )
}

export const App = withAUITheme(_App);
