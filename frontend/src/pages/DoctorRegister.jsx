import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorRegister = () => {
  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [experience, setExperience] = useState('1 Year')
  const [clinicName, setClinicName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [image, setImage] = useState(null)
  const [certificate, setCertificate] = useState(null)
  
  // Loading state
  const [loading, setLoading] = useState(false)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const experiences = [
    '1 Year', '2 Years', '3 Years', '4 Years', '5 Years', 
    '6 Years', '7 Years', '8 Years', '9 Years', '10+ Years'
  ]

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!image) {
      return toast.error('Please upload a profile photo')
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('phone', phone)
      formData.append('speciality', speciality)
      formData.append('experience', experience)
      formData.append('clinicName', clinicName)
      formData.append('licenseNumber', licenseNumber)
      
      const addressObj = { line1: addressLine1, line2: addressLine2 }
      formData.append('address', JSON.stringify(addressObj))
      
      formData.append('image', image)
      if (certificate) {
        formData.append('certificate', certificate)
      }

      const { data } = await axios.post(backendUrl + '/api/doctors/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-tdata'
        }
      })

      if (data.success) {
        toast.success(data.message || 'Registration successful!')
        navigate('/doctor/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-10 px-4'>
      <form onSubmit={onSubmitHandler} className='bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full border border-gray-100 flex flex-col gap-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Doctor Registration</h2>
          <p className='text-gray-500 text-sm'>Join our network of healthcare professionals</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {/* Left Column */}
          <div className='flex flex-col gap-4'>
            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Full Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="text" 
                placeholder="Dr. John Doe"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Email Address</label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="email" 
                placeholder="doctor@example.com"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="password" 
                placeholder="Minimum 8 characters"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Phone Number</label>
              <input 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="tel" 
                placeholder="+1 234 567 890"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Specialization</label>
              <select 
                onChange={(e) => setSpeciality(e.target.value)} 
                value={speciality}
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary bg-white'
              >
                {specialities.map((spec, i) => (
                  <option key={i} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Experience</label>
              <select 
                onChange={(e) => setExperience(e.target.value)} 
                value={experience}
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary bg-white'
              >
                {experiences.map((exp, i) => (
                  <option key={i} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-4'>
            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Clinic / Hospital Name</label>
              <input 
                onChange={(e) => setClinicName(e.target.value)} 
                value={clinicName} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="text" 
                placeholder="Grace Hospital"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Medical License Number</label>
              <input 
                onChange={(e) => setLicenseNumber(e.target.value)} 
                value={licenseNumber} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="text" 
                placeholder="LIC-9876543-XYZ"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Address Line 1</label>
              <input 
                onChange={(e) => setAddressLine1(e.target.value)} 
                value={addressLine1} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="text" 
                placeholder="Street address, P.O. box"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Address Line 2 (Optional)</label>
              <input 
                onChange={(e) => setAddressLine2(e.target.value)} 
                value={addressLine2} 
                className='border border-gray-300 rounded-lg w-full p-2.5 text-sm focus:outline-none focus:border-primary' 
                type="text" 
                placeholder="Apartment, suite, unit, building"
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Profile Photo</label>
              <input 
                onChange={(e) => setImage(e.target.files[0])} 
                className='border border-gray-300 rounded-lg w-full p-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90 cursor-pointer' 
                type="file" 
                accept="image/*"
                required 
              />
            </div>

            <div>
              <label className='text-gray-600 font-medium text-xs block mb-1'>Medical Certificate (Optional)</label>
              <input 
                onChange={(e) => setCertificate(e.target.files[0])} 
                className='border border-gray-300 rounded-lg w-full p-2 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer' 
                type="file" 
                accept=".pdf,image/*"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className='bg-primary text-white font-medium w-full py-3 mt-4 rounded-xl text-base hover:shadow-lg transition-all duration-300 disabled:bg-gray-400'
        >
          {loading ? 'Submitting Application...' : 'Register'}
        </button>

        <p className='text-center text-sm text-gray-500 mt-2'>
          Already registered?{' '}
          <span 
            onClick={() => navigate('/doctor/login')} 
            className='text-primary underline cursor-pointer font-semibold'
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  )
}

export default DoctorRegister
