import React from 'react';
import { withAUITheme } from '@aui/util'
import { I18nLoader } from '@aui/common'
import { Route, HashRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Home } from './Home'

function _App() {
  return (
    <I18nLoader language="en">
      <HashRouter basename="/">
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
      </HashRouter>
    </I18nLoader>
  )
}

export const App = withAUITheme(_App);
