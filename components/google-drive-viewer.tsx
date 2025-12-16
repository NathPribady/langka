interface GoogleDriveViewerProps {
  fileId: string
}

export function GoogleDriveViewer({ fileId }: GoogleDriveViewerProps) {
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`

  return (
    <div className="w-full h-full">
      <iframe src={embedUrl} className="w-full h-full border-0" allow="autoplay" allowFullScreen></iframe>
    </div>
  )
}
