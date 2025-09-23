const FilesSection = ({ uploadedFiles = [] }) => {
  return (
    <div className="files-section">
      <h2 className="files-title">Files</h2>
      <div className="files-grid">
        {uploadedFiles.map((file) => (
          <div key={file.id} className="file-card">
            <div className="file-icon">
              {file.type.includes("pdf") ? (
                <img class="pdf" src="/pdf-icon.png" alt="PDF" />
              ) : (
                <img class="img" src="/image-icon.png" alt="Image" />
              )}
            </div>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className={`file-status ${file.status}`}>{file.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilesSection
