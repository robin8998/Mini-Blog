import React from 'react'
import databaseService from '../appwrite/config'
import conf from '../conf/conf'

function Logo() {
  const logoId = conf.appwriteLogoId
  
  return (
    <div className="flex items-center justify-center h-10 w-auto overflow-hidden">
      <img 
        src={databaseService.logoPreview(logoId)} 
        alt="Logo" 
        className="h-full w-auto object-contain rounded-full"
      />
    </div>
  )
}

export default Logo