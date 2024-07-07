const truncateAddress = (address: string): string => {
  const parts = address.split(' ')
  if (parts.length > 3) {
    return parts.slice(0, 3).join(' ')
  }
  return address
}

export default truncateAddress
