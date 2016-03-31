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
      break;
    case 'none':
      break;
    default:
  }
}

export default generateStaticSite;
