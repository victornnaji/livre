const formatDate = date =>
  new Intl.DateTimeFormat('en-US', {month: 'short', day: '2-digit'}).format(
    date,
  )

export {formatDate}