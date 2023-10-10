import { useState } from 'react'
import { Dashboard } from '../components/dashboard/Dashboard'
import { NewEditor } from '../components/editor/NewEditor'
import { FileUploader } from '../components/uploader/FileUploader'

export default function HomePage () {
  const [code, setCode] = useState('')
  console.log(code)
  return (
    <Dashboard>
      <NewEditor setCodeOut={setCode} />
      <FileUploader />
    </Dashboard>
  )
}
