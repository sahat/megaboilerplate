import { join } from 'path';
import { replaceCode, appendFile, addNpmPackage } from '../utils';

async function generateVkAuthenticationExpress(params) {
  const build = join(__base, 'build', params.uuid);
  const server = join(build, 'server.js');
  const env = join(build, '.env');
  const config = join(build, 'config', 'passport.js');
  const userController = join(build, 'controllers', 'user.js');
  const strategyRequire = join(__dirname, 'modules', 'vk', 'passport-require.js');
  const passportRoutes = join(__dirname, 'modules', 'vk', 'passport-routes.js');
  const jwtRoutes = join(__dirname, 'modules', 'vk', 'jwt-routes.js');

  if (params.jsFramework) {
    await replaceCode(server, 'VK_ROUTES', jwtRoutes);
    await replaceCode(userController, 'AUTH_VK_JWT', join(__dirname, 'modules', 'vk', 'vk-jwt.js'));
  } else {
    await replaceCode(server, 'VK_ROUTES', passportRoutes);
    await replaceCode(config, 'PASSPORT_VK_REQUIRE', strategyRequire);

    await addNpmPackage('passport-vkontakte', params);
  }
  
  switch (params.database) {
    case 'mongodb':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_VK_JWT_DB', join(__dirname, 'modules', 'vk', 'vk-jwt-mongodb.js'), { indentLevel: 3 });
      } else {
        const mongodbStrategy = join(__dirname, 'modules', 'vk', 'vk-strategy-mongodb.js');
        await replaceCode(config, 'PASSPORT_VK_STRATEGY', mongodbStrategy);
      }
      break;

    case 'mysql':
    case 'sqlite':
    case 'postgresql':
      if (params.jsFramework) {
        await replaceCode(userController, 'AUTH_VK_JWT_DB', join(__dirname, 'modules', 'vk', 'vk-jwt-sql.js'), { indentLevel: 3 });
      } else {
        const sqlStrategy = join(__dirname, 'modules', 'vk', 'vk-strategy-sql.js');
        await replaceCode(config, 'PASSPORT_VK_STRATEGY', sqlStrategy);
      }
      break;
    
    default:
      break;
  }

  await appendFile(env, '\nVKONTAKTE_ID=5389715');
  await appendFile(env, '\nVKONTAKTE_SECRET=W4MvuGuWZDqmDravgesY\n');
}

export default generateVkAuthenticationExpress;
