import LoginPage from '../components/LoginPage'
import {connect} from 'react-redux'

import {loginUser} from '../actions/index'

const mapDispatchToProps = (dispatch) =>{
  return{
    onSubmit : (username,password) =>{
      dispatch(loginUser(username,password))
    }
  }
}


let LoginPageContainer = connect(null,mapDispatchToProps)(LoginPage)


export default LoginPageContainer
