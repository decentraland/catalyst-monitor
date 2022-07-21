function shortHash(hash) {
  if (hash && hash.length > 7) {
    return hash.slice(0, 7)
  }
  return hash
}

function deltaTime(externalTime) {
  if (externalTime) {
    const deltaMillis = new Date() - externalTime
    return millisToHumanTime(deltaMillis)
  }
  return "Unknown time"
}

function millisToHumanTime(millis) {
  if (millis < 1000) {
    return `${millis} millis`
  }
  const seconds = millis / 1000
  if (seconds < 60) {
    return `${seconds.toFixed(2)} secs`
  }
  const minutes = seconds / 60
  if (minutes < 60) {
    return `${minutes.toFixed(2)} mins`
  }
  const hours = minutes / 60
  if (hours < 24) {
    return `${hours.toFixed(2)} hours`
  }
  const days = hours / 24
  return `${days.toFixed(2)} days`
}

function toISOString(externalTime) {
  if (externalTime) {
    return externalTime.toISOString()
  }
  return "Unknown time"
}