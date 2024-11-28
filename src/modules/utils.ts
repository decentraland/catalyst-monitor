const shortHash = (hash?: string) => {
  if (hash && hash.length > 7) {
    return hash.slice(0, 7)
  }
  return hash
}

const getHealthLabel = (healthy: boolean) => {
  return healthy ? "Healthy" : "Down"
}

export { shortHash, getHealthLabel }
