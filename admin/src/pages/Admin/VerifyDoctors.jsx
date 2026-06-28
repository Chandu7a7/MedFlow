import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const VerifyDoctors = () => {
  const { pendingDoctors, getPendingDoctors, approveDoctor, rejectDoctor, aToken } = useContext(AdminContext)
  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    if (aToken) {
      getPendingDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 w-full max-w-6xl'>
      <h1 className='text-xl font-semibold text-gray-800 mb-5'>Pending Doctor Verifications</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Pending List */}
        <div className='lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden'>
          <div className='p-4 border-b bg-gray-50'>
            <p className='font-semibold text-gray-700'>Application Requests ({pendingDoctors.length})</p>
          </div>
          
          {pendingDoctors.length === 0 ? (
            <div className='p-8 text-center text-gray-500'>
              No pending applications at the moment.
            </div>
          ) : (
            <div className='divide-y max-h-[70vh] overflow-y-auto'>
              {pendingDoctors.map((doc) => (
                <div 
                  key={doc._id} 
                  onClick={() => setSelectedDoctor(doc)}
                  className={`p-4 flex items-center justify-between hover:bg-blue-50/30 cursor-pointer transition-colors ${selectedDoctor?._id === doc._id ? 'bg-blue-50/50 border-l-4 border-primary' : ''}`}
                >
                  <div className='flex items-center gap-3'>
                    <img 
                      className='w-12 h-12 rounded-full object-cover border' 
                      src={doc.image || '/fallback-user.png'} 
                      alt={doc.name} 
                    />
                    <div>
                      <h3 className='font-medium text-gray-800'>{doc.name}</h3>
                      <p className='text-xs text-gray-500'>{doc.speciality} • {doc.experience} exp</p>
                      <p className='text-xs text-gray-400 mt-0.5'>{doc.email}</p>
                    </div>
                  </div>
                  
                  <span className='text-xs bg-yellow-100 text-yellow-800 px-2.5 py-1 rounded-full font-medium'>
                    Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className='bg-white border rounded-xl shadow-sm p-6 flex flex-col justify-between min-h-[400px]'>
          {selectedDoctor ? (
            <div className='flex flex-col gap-5 h-full justify-between'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4 border-b pb-4'>
                  <img 
                    className='w-16 h-16 rounded-full object-cover border' 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name} 
                  />
                  <div>
                    <h2 className='text-lg font-bold text-gray-800'>{selectedDoctor.name}</h2>
                    <p className='text-sm text-primary font-medium'>{selectedDoctor.speciality}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-y-3 gap-x-2 text-xs'>
                  <div>
                    <p className='text-gray-400 font-medium'>Email</p>
                    <p className='text-gray-800 font-semibold truncate'>{selectedDoctor.email}</p>
                  </div>
                  <div>
                    <p className='text-gray-400 font-medium'>Phone</p>
                    <p className='text-gray-800 font-semibold'>{selectedDoctor.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className='text-gray-400 font-medium'>Experience</p>
                    <p className='text-gray-800 font-semibold'>{selectedDoctor.experience}</p>
                  </div>
                  <div>
                    <p className='text-gray-400 font-medium'>License Number</p>
                    <p className='text-gray-800 font-semibold bg-gray-100 px-1.5 py-0.5 rounded inline-block'>{selectedDoctor.licenseNumber || 'N/A'}</p>
                  </div>
                  <div className='col-span-2'>
                    <p className='text-gray-400 font-medium'>Clinic / Hospital</p>
                    <p className='text-gray-800 font-semibold'>{selectedDoctor.clinicName || 'N/A'}</p>
                  </div>
                  <div className='col-span-2'>
                    <p className='text-gray-400 font-medium'>Address</p>
                    <p className='text-gray-800 font-semibold'>
                      {selectedDoctor.address?.line1 || 'N/A'}
                      {selectedDoctor.address?.line2 ? `, ${selectedDoctor.address.line2}` : ''}
                    </p>
                  </div>
                </div>

                {selectedDoctor.certificate && (
                  <div className='mt-2 border-t pt-4'>
                    <p className='text-xs text-gray-400 font-medium mb-1'>Medical Certificate</p>
                    <a 
                      href={selectedDoctor.certificate} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className='inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline'
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      View Certificate Document
                    </a>
                  </div>
                )}
              </div>

              <div className='flex gap-3 mt-6 border-t pt-4'>
                <button 
                  onClick={async () => {
                    await rejectDoctor(selectedDoctor._id)
                    setSelectedDoctor(null)
                  }}
                  className='flex-1 border border-red-500 text-red-500 py-2.5 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors'
                >
                  Reject
                </button>
                <button 
                  onClick={async () => {
                    await approveDoctor(selectedDoctor._id)
                    setSelectedDoctor(null)
                  }}
                  className='flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-opacity-95 hover:shadow-md transition-all'
                >
                  Approve & Verify
                </button>
              </div>
            </div>
          ) : (
            <div className='h-full flex flex-col items-center justify-center text-center text-gray-400 py-20'>
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p className='text-sm'>Select a pending doctor from the list to view full details and verification status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyDoctors
