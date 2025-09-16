"use client"

import { createContext, useContext, useState, useEffect } from "react"

const FilesContext = createContext()

export const useFiles = () => {
  const context = useContext(FilesContext)
  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider")
  }
  return context
}

export const FilesProvider = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState([])

  useEffect(() => {
    const savedFiles = sessionStorage.getItem("uploadedFiles")
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles)
        setUploadedFiles(parsedFiles)
      } catch (error) {
        console.error("Error loading saved files:", error)
        sessionStorage.removeItem("uploadedFiles")
      }
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles))
  }, [uploadedFiles])

  const addFile = (fileData) => {
    setUploadedFiles((prev) => [...prev, fileData])
  }

  const updateFile = (fileId, updates) => {
    setUploadedFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, ...updates } : file)))
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const clearAllFiles = () => {
    setUploadedFiles([])
    sessionStorage.removeItem("uploadedFiles")
  }

  const value = {
    uploadedFiles,
    addFile,
    updateFile,
    removeFile,
    clearAllFiles,
  }

  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
}
