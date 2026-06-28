import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorLogin = () => {
  const { backendUrl } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/doctors/login', { email, password })
      
      if (data.success) {
        toast.success('Login Successful!')
        // Store locally on frontend first
        localStorage.setItem('dToken', data.token)
        
        // Redirect to the Doctor Panel on port 5174, passing the token via query parameter
        window.location.href = `http://localhost:5174/?dToken=${data.token}`
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      if (error.response?.status === 403) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.response?.data?.message || 'Invalid email or password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-[#5E5E5E] text-sm shadow-xl bg-white'>
        <div className='w-full text-center mb-2'>
          <p className='text-2xl font-semibold text-gray-800'><span className='text-primary'>Doctor</span> Login</p>
          <p className='text-gray-500 text-xs mt-1'>Access your professional dashboard</p>
        </div>
        
        <div className='w-full'>
          <p className='font-medium mb-1'>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:border-primary' 
            type="email" 
            placeholder="doctor@example.com"
            required 
          />
        </div>

        <div className='w-full'>
          <p className='font-medium mb-1'>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-gray-300 rounded-lg w-full p-2.5 mt-1 focus:outline-none focus:border-primary' 
            type="password" 
            placeholder="Enter password"
            required 
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className='bg-primary text-white w-full py-2.5 rounded-xl font-medium text-base hover:shadow-lg transition-all duration-300 disabled:bg-gray-400 mt-2'
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className='text-center w-full mt-2'>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/doctor/register')} 
            className='text-primary underline cursor-pointer font-semibold'
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  )
}

export default DoctorLogin
