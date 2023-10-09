import { Dashboard } from '../components/dashboard/Dashboard'
import { NewEditor } from '../components/editor/NewEditor'
import { FileUploader } from '../components/uploader/FileUploader'

export default function HomePage () {
  return (
    <Dashboard>
      <NewEditor />
      <FileUploader />
    </Dashboard>
  )
}
