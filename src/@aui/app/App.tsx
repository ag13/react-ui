import React from 'react';
import { withAUITheme } from '@aui/util'
import { I18nLoader } from '@aui/common'
import { Route, HashRouter } from 'react-router-dom'
import { NodeGroups } from '@aui/nodeGroups'
import { ProcessGroups } from '@aui/processGroups'
import { Home } from './Home'
import { PluginLoader } from './plugins/PluginLoader'

function _App() {
  return (
    <I18nLoader language="en">
      <HashRouter basename="/">
        <Route exact path="/" component={Home} />
        <Route exact path="/process" component={ProcessGroups} />
        <Route exact path="/node" component={NodeGroups} />
      </HashRouter>
      <PluginLoader />
    </I18nLoader>
  )
}

export const App = withAUITheme(_App);
