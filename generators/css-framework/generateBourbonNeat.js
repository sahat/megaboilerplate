import { join } from 'path';
import { copy, replaceCode } from '../utils';

async function generateCssFrameworkBourbonNeat(params) {
  const bourbonNeatDir = join(__base, 'modules', 'css-framework', 'bourbon-neat');
  const publicDir = join(__base, 'build', params.uuid, 'public');

  // Copy Bourbon + Neat files
  await copy(join(bourbonNeatDir, 'main.scss'), join(publicDir, 'css', 'main.scss'));
  await copy(join(bourbonNeatDir, 'bourbon'), join(publicDir, 'css', 'vendor', 'bourbon'));
  await copy(join(bourbonNeatDir, 'neat'), join(publicDir, 'css', 'vendor', 'neat'));
}

export default generateCssFrameworkBourbonNeat;
