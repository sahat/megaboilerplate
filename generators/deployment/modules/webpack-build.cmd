
:: 4. Webpack build
IF EXIST "%DEPLOYMENT_TARGET%\webpack.config.js" (
  pushd "%DEPLOYMENT_TARGET%"
  echo "Installing Webpack"
  call :ExecuteCmd !NPM_CMD! install -g webpack
  echo "Building website using Webpack"
  call :ExecuteCmd webpack --config webpack.config.js --display-error-details
  if !ERRORLEVEL! NEQ 0 goto error
  popd
)
