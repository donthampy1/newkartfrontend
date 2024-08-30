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

            const res = await axios.post('https://newkartbackend.onrender.com/auth/googlesignup', {email,username})
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
            
            className=" w-full bg-white  text-black border border-gray-700 p-2 mt-4  hover:bg-black hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none">Continue with GOOGLE</button>  )
}

export default GoogleAuth