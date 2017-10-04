import LoginForm from '../components/LoginForm'
import {connect} from 'react-redux'

import {loginUser} from '../actions/index'

const mapDispatchToProps = (dispatch) =>{
  return{
    onSubmit : (username, password) =>{
       dispatch(loginUser(username,password))
    }
  }
}


let LoginFormContainer = connect(null,mapDispatchToProps)(LoginForm)


export default LoginFormContainer
