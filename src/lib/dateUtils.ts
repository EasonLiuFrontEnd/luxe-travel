export const formatDateForDisplay = (dateString: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

const formatDateForInput = (dateString: string) => {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (isNaN(date.getTime())) return ''

  return date.toISOString().split('T')[0]
}
