import React, { useMemo } from 'react';
import './App.css';
import { useAUITable, AUITable } from '@aui/common/Table/table';

function App() {
  const data = useMemo(() => [
    {
      column1: 'React',
      column2: 'Table'
    },
    {
      column1: 'React',
      column2: 'Query'
    },
    {
      column1: 'React',
      column2: 'Charts'
    }
  ], [])
  const columns = useMemo(() => [
    {
      Header: 'Column 1',
      accessor: 'column1'
    },
    {
      Header: 'Column 2',
      accessor: 'column2'
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

export default App;
