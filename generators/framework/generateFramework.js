import generateFrameworkExpress from '../../generators/framework/generateFrameworkExpress';
import generateFrameworkHapi from '../../generators/framework/generateFrameworkHapi';
import generateFrameworkMeteor from '../../generators/framework/generateFrameworkMeteor';

async function generateFramework(params) {
  switch (params.framework) {
    case 'express':
      await generateFrameworkExpress(params);
      break;
    case 'hapi':
      await generateFrameworkHapi(params);
      break;
    case 'meteor':
      await generateFrameworkMeteor(params);
      break;
    default:
      break;
  }
}

export default generateFramework;
