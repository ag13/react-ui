import React from 'react';
import { withAUITheme } from '@aui/util'
import { I18nLoader } from '@aui/common'
import { Route, BrowserRouter } from 'react-router-dom'
import { NodeGroups } from '@aui/nodeGroups'
import { ProcessGroups } from '@aui/processGroups'
import { Home } from './Home'

function _App() {
  return (
    <I18nLoader language="en">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/process" component={ProcessGroups} />
        <Route exact path="/node" component={NodeGroups} />
      </BrowserRouter>
    </I18nLoader>
  )
}

export const App = withAUITheme(_App);
