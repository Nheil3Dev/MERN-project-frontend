import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview,
  type ExtFile
} from '@dropzone-ui/react'
import { useState } from 'react'

const BASE_URL = 'http://localhost:8000/api/uploadFile'

export function FileUploader () {
  const [files, setFiles] = useState<ExtFile[]>([])
  const [imageSrc, setImageSrc] = useState<string | undefined>()
  const [videoSrc, setVideoSrc] = useState<string | File | undefined>()
  const updateFiles = (incommingFiles: ExtFile[]) => {
    setFiles(incommingFiles)
  }

  const handleSee = (imageSource: string | undefined) => {
    setImageSrc(imageSource)
  }

  const handleWatch = (videoSource: string | File | undefined) => {
    setVideoSrc(videoSource)
  }

  const removeFile = (id: number | string | undefined) => {
    setFiles(files.filter(x => x.id !== id))
  }
  return (
    <>
    <Dropzone
      value={files}
      onChange={updateFiles}
      maxFiles={5}
      maxFileSize={2998000}
      uploadConfig={{
        // autoUpload: true
        url: BASE_URL + '/file',
        cleanOnUpload: true
      }}
      label="Drag'n drop files here or click to browse"
      actionButtons={{
        position: 'after',
        abortButton: {},
        deleteButton: {},
        uploadButton: {}
      }}
      >
      {files.map((file) => (
        <FileMosaic
        key={file.id}
        {...file}
        onDelete={removeFile}
        onSee={handleSee}
        onWatch={handleWatch}
        preview
        />
      ))}
    </Dropzone>
    <FullScreen
    open={imageSrc !== undefined}
    onClose={() => setImageSrc(undefined)}
    >
    <ImagePreview src={imageSrc} />
  </FullScreen>
  <FullScreen
    open={videoSrc !== undefined}
    onClose={() => setVideoSrc(undefined)}
    >
    <VideoPreview src={videoSrc} autoPlay controls />
  </FullScreen>
  </>
  )
}