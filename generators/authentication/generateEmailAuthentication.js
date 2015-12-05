

function generateEmailAuthentication(params) {
  switch (params.framework) {
    case 'express':
      return generateEmailAuthenticationExpress(params);
      break;
    case 'hapi':
      // TODO: not implemented
      return Promise.resolve();
      break;
    case 'sails':
      // TODO: not implemented
      return Promise.resolve();
      break;
    default:
      return Promise.reject('Unsupported Framework');
  }
}

function cleanupEmailAuthenticationString(params) {
  if (params.framework === 'express') {
    let appFile = path.join(__dirname, 'build', params.uuid, 'app.js');

    return removeCode(appFile, 'EXPRESS_TEMPLATE_ENGINE_CONFIG');
  } else if (params.framework === 'hapi') {
    // TODO: not implemented
  } else if (params.framework === 'sails') {
    // TODO: not implemented
  }
}

module.exports = generateEmailAuthentication;
