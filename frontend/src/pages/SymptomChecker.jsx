import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const SymptomChecker = () => {
  const { backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!text.trim()) {
      toast.error('Please describe your symptoms')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const { data } = await axios.post(`${backendUrl}/api/symptom-checker`, {
        text: text.trim(),
      })

      if (data.success) {
        setResult(data)
        toast.success('Recommendations ready')
      } else {
        toast.error(data.message || 'Unable to analyze symptoms')
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setText('')
    setResult(null)
  }

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-semibold text-gray-800'> Symptom Checker</h1>
        <p className='text-gray-600 mt-2 max-w-2xl mx-auto'>
          Describe your symptoms in natural language and we will suggest the most relevant
          doctor specializations and verified doctors on MedFlow.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white border border-[#C9D8FF] rounded-2xl p-6 shadow-sm'
      >
        <label htmlFor='symptoms' className='block text-sm font-medium text-gray-700 mb-2'>
          Describe your symptoms
        </label>
        <textarea
          id='symptoms'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Example: I have chest pain and shortness of breath'
          rows={4}
          maxLength={500}
          className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary resize-none'
        />
        <div className='flex items-center justify-between mt-2'>
          <p className='text-xs text-gray-500'>{text.length}/500 characters</p>
          <p className='text-xs text-gray-500'>Not a medical diagnosis</p>
        </div>

        <div className='flex flex-wrap gap-3 mt-5'>
          <button
            type='submit'
            disabled={loading}
            className='bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-60'
          >
            {loading ? 'Analyzing...' : 'Check Symptoms'}
          </button>
          {result && (
            <button
              type='button'
              onClick={handleReset}
              className='border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-all'
            >
              Start Over
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className='mt-8 space-y-6'>
          <div className='bg-[#F0F4FF] border border-[#C9D8FF] rounded-2xl p-5'>
            <p className='text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3'>
              {result.disclaimer}
            </p>
          </div>

          {/* {result.symptoms?.length > 0 && (
            <div className='bg-white border border-[#C9D8FF] rounded-2xl p-6'>
              <h2 className='text-xl font-medium text-gray-800 mb-3'>Extracted Symptoms</h2>
              <div className='flex flex-wrap gap-2'>
                {result.symptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className='bg-[#E2E5FF] text-gray-800 text-sm px-4 py-1.5 rounded-full capitalize'
                  >
                    {symptom}
                  </span>
                ))}
              </div>
              <p className='text-xs text-gray-500 mt-3'>
                Processed using {result.extractionSource === 'gemini' ? 'AI + mapping' : 'rule-based fallback'}
              </p>
            </div>
          )} */}

          {/* <div className='bg-white border border-[#C9D8FF] rounded-2xl p-6'>
            <h2 className='text-xl font-medium text-gray-800 mb-4'>Recommended Specializations</h2>
            <div className='grid sm:grid-cols-3 gap-4'>
              {result.specializations?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/doctors/${encodeURIComponent(item.name)}`)
                    scrollTo(0, 0)
                  }}
                  className='border border-[#C9D8FF] rounded-xl p-4 cursor-pointer hover:translate-y-[-4px] transition-all duration-300 bg-[#FAFBFF]'
                >
                  <p className='font-medium text-gray-800'>{item.name}</p>
                  <p className='text-sm text-gray-500 mt-1'>
                    Match score: {item.score}
                  </p>
                  <p className='text-xs text-primary mt-3'>View all doctors →</p>
                </div>
              ))}
            </div>
          </div> */}

          <div className='bg-white border border-[#C9D8FF] rounded-2xl p-6'>
            <h2 className='text-xl font-medium text-gray-800 mb-4'>
              Verified Doctors ({result.doctors?.length || 0})
            </h2>

            {result.doctors?.length > 0 ? (
              <div className='grid grid-cols-auto gap-4 gap-y-6'>
                {result.doctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    onClick={() => {
                      navigate(`/appointment/${doctor._id}`)
                      scrollTo(0, 0)
                    }}
                    className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                  >
                    <img
                      className='bg-[#EAEFFF] w-full h-48 object-cover'
                      src={doctor.image}
                      alt={doctor.name}
                    />
                    <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-green-500'>
                        <img className='w-4' src={assets.verified_icon} alt='verified' />
                        <p>Verified</p>
                      </div>
                      <p className='text-[#262626] text-lg font-medium mt-1'>{doctor.name}</p>
                      <p className='text-[#5C5C5C] text-sm'>{doctor.speciality}</p>
                      <p className='text-primary text-sm mt-2'>Book appointment →</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 text-sm'>
                No verified doctors are currently available for these specializations.
                Try browsing all doctors or check back later.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SymptomChecker
