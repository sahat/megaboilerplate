import generateTestingMocha from './generateTestingMocha';
import generateTestingJasmine from './generateTestingJasmine';

async function generateTesting(params) {
  switch (params.testing) {
    case 'mocha':
      await generateTestingMocha(params);
      break;
    case 'jasmine':
      await generateTestingJasmine(params);
      break;
    case 'none':
      break;
    default:
  }
}

export default generateTesting;
