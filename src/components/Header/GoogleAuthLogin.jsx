import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../../utils/GoogleAuth/firebase'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { signInSuccess } from '../../redux/user/userSlice'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'




function GoogleAuthLogin({ setError}) {
    const navigate = useNavigate()


    const dispatch = useDispatch()

    const handleGoogleSignin = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result.user,"HHHHHHHHHHHHHHHHH")
            const data = {
                email: result.user.email
            } 
            const response = await axios({
                method: 'post',
                url: 'https://newkartbackend-1.onrender.com/auth/googlesignin',    
                data,
                withCredentials: true
            })
            const data1 = await response.data
            dispatch(signInSuccess(data1))

            console.log(data1)
            navigate('/')
            


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
onClick={handleGoogleSignin}
            
            className=" w-full bg-white  text-black border border-gray-700 p-2 mt-4  hover:bg-black hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none">Continue with GOOGLE</button>  )
}

export default GoogleAuthLogin