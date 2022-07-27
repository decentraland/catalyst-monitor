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

// Cache the metadata from commits to avoid reaching the GH rate limit
let allCommitHashInfo = {}


function getCommitHashInfo(commitHash, repositoryName) {
  if (!commitHash) {
    return commitHash
  }
  if (!repositoryName) {
    return shortHash(commitHash)
  }
  const key = keyFrom(commitHash, repositoryName)
  if (!allCommitHashInfo[key]) {
    renderCommitHashInfo(commitHash, repositoryName)
  }
  return allCommitHashInfo[key]
}

function renderCommitHashInfo(commitHash, repositoryName) {
  fetch(`https://api.github.com/repos/decentraland/${repositoryName}/commits/${commitHash}`)
  .then((res) => res.json())
  .then((data) => {
    if (!data || !data.commit) {
      allCommitHashInfo[keyFrom(commitHash, repositoryName)] = shortHash(commitHash)
      return
    }
    
    const date =  new Date(data.commit.author.date)
    allCommitHashInfo[keyFrom(commitHash, repositoryName)] = `${shortHash(commitHash)} (${deltaTime(date)} ago)`
  })
  .catch(console.error)
}

function keyFrom(commitHash, repositoryName) {
  return `${repositoryName}-${commitHash}`
}

function toISOString(externalTime) {
  if (externalTime) {
    return externalTime.toISOString()
  }
  return "Unknown time"
}
