import { join } from 'path';
import { copy } from '../../generators/utils';

async function generateStaticSite(params) {
  switch (params.staticSiteGenerator) {
    case 'jekyll':
      await copy(
        join(__dirname, 'modules', 'jekyll'),
        join(__base, 'build', params.uuid)
      );
      break;
    case 'middleman':
      await copy(
        join(__dirname, 'modules', 'middleman'),
        join(__base, 'build', params.uuid)
      );
      break;
    default:
  }
}

export default generateStaticSite;
