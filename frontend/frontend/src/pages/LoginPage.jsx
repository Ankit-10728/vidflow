
import { useSelector } from 'react-redux'
import { Login as LoginComponent } from '../components'
import ErrorPage from './ErrorPage'

function Login() {

    return (
        <div className=''>
            <LoginComponent />
        </div>
    )
}

export default Login