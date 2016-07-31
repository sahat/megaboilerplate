compose(
  applyMiddleware(thunk, promise, logger),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)
