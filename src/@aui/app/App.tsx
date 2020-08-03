import React from 'react';
import { withAUITheme } from '@aui/util'
import { I18nLoader } from '@aui/common'
import { Route, HashRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { DashboardMaker } from '../dashboards'
import { DashboardViewer } from '../dashboards'
import { Home } from './Home'
import NodeGroups from './plugins/nodeGroups'
import ProcessGroups from './plugins/processGroups'
import { Provider } from 'react-redux'
import store from './store'

function _App() {
  return (
    <Provider store={store}>
      <I18nLoader language="en">
        <HashRouter basename="/">
          <Route exact path="/" component={Home} />
          <Route exact path="/process" component={ProcessGroups} />
          <Route exact path="/node" component={NodeGroups} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboardMaker" component={DashboardMaker} />
          <Route exact path="/dashboards" component={DashboardViewer} />
        </HashRouter>
      </I18nLoader>
    </Provider>
  )
}

export const App = withAUITheme(_App);
