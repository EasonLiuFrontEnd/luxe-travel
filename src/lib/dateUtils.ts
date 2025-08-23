export function formatDateForDisplay(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  // 檢查日期是否有效
  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

export function formatDateForInput(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)

  // 檢查日期是否有效
  if (isNaN(date.getTime())) return ''

  // 返回 YYYY-MM-DD 格式
  return date.toISOString().split('T')[0]
}
