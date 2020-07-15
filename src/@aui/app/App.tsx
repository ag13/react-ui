import React, { useMemo } from 'react';
import { useAUITable, AUITable } from '@aui/common/Table/table';
import { withAUITheme } from '@aui/util'

function _App() {
  const data = useMemo(() => [
    {
      name: 'Process Group Name',
      status: 'Processing',
      interval: 'Real-time',
      nextAction: 'Stop'
    },
    {
      name: 'Process Group Name',
      status: 'Stopped',
      interval: '3days 2hrs 00min',
      nextAction: 'Start'
    }
  ], [])
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Status',
      accessor: 'status'
    },
    {
      Header: 'Interval',
      accessor: 'interval'
    },
    {
      accessor: 'nextAction'
    }
  ], [])

  //TODO add correct type
  const instance = useAUITable<any>({
    columns,
    data
  })
  return (
    <div className="App">
      <AUITable instance={instance} />
    </div>
  );
}

export const App = withAUITheme(_App);
