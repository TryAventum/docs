export default activeClassName => {
  const isApiActive = ({ location }) => {
    return location.pathname.startsWith("/docs/api")
      ? { className: activeClassName }
      : {}
  }

  const isDocsActive = ({ location }) => {
    return !location.pathname.startsWith("/docs/api") &&
      location.pathname.startsWith("/docs")
      ? { className: activeClassName }
      : {}
  }

  return {
    isDocsActive,
    isApiActive,
  }
}
