import React from 'react';
import { withAUITheme } from '@aui/util'
import { I18nLoader } from '@aui/common'
import { Route, HashRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import { Home } from './Home'
import { Provider } from 'react-redux'
import store from './store'

function _App() {
  return (
    <Provider store={store}>
      <I18nLoader language="en">
        <HashRouter basename="/">
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </HashRouter>
      </I18nLoader>
    </Provider>
  )
}

export const App = withAUITheme(_App);
