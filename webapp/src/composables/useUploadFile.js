import { ref, watch } from 'vue'

export function useUploadFile(params) {
  const fileData = ref('')
  const fileUrl = ref('')

  function clearFile() {
    fileData.value = ''
    fileUrl.value = ''
  }

  function onChangeFile(e) {
    const files = e.target.files || e.dataTransfer.files
    if (files.length === 0) {
      fileData.value = ''
      fileUrl.value = ''
      return
    }

    fileData.value = files[0]
  }

  watch(fileData, fileData => {
    if (!(fileData instanceof File)) {
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(fileData)
    reader.addEventListener('load', () => {
      fileUrl.value = reader.result
    })
  })

  return {
    fileData,
    fileUrl,
    clearFile,
    onChangeFile
  }
}