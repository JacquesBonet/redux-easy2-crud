
import React from 'react'
import { render } from 'react-dom'
import configureStore from './stores'
import { Provider } from 'react-redux'


let initialData = {}

const store = configureStore(initialData)

// App dom
const App = <div style="height:100%, width:100%"/>


render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('mount')
)

