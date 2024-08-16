import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../../utils/GoogleAuth/firebase'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../../redux/user/userSlice'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'




function GoogleAuth({ setError}) {
    const navigate = useNavigate()


    const dispatch = useDispatch()

    const handleGoogleSignup = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result.user.email)
            const email = result.user.email
            const username = result.user.displayName

            const res = await axios.post('http://localhost:3000/auth/googlesignup', {email,username})
            const data = await res.data
            dispatch(signInSuccess(data))

            console.log(data)
            navigate('/signin')
            


        }catch(err){
            if (err.response && err.response.status === 400) {
                setError("email", { type: "manual", message: err.response.data.message });
                

            } else {  
                console.log('An unexpected error occurred:', err);
            }
        }
    
        }



  return (
<button 
type="button"
onClick={handleGoogleSignup}
            
            className=" w-full bg-red-700 rounded-md text-white p-2 mt-4  hover:bg-red-600 focus:bg-green-700 focus:text-white focus:outline-none">Continue with GOOGLE</button>  )
}

export default GoogleAuth