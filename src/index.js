import React from 'react' // ← Main React library
import { render } from 'react-dom' // ← Main react library
import { Provider } from 'react-redux' //← Bridge React and Redux
import { createStore } from 'redux' // ← Main Redux library
import coapp from './reducers' // ← List of Reducers we created
//Import all components we created earlier
import LoginPageContainer from './containers/LoginPage'


let store = createStore(coapp)


render(
 <Provider store={store}> 
 <div>
   <LoginPageContainer />
 </div>
 </Provider>,
 document.getElementById('root') //<-- Render to a div w/ id "root"
)
