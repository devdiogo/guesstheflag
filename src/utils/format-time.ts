export const formatTime = (sec: number, includeHours = false) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)
  const seconds = sec - hours * 3600 - minutes * 60
  return `${includeHours ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ''}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`
}
