import { join } from 'path';
import { getModule } from '../../generators/utils';

async function generateStaticSite(params) {
  switch (params.staticSiteGenerator) {
    case 'jekyll':
      params.build = {
        _includes: {
          'footer.html': await getModule('static-site/jekyll/_includes/footer.html'),
          'head.html': await getModule('static-site/jekyll/_includes/head.html'),
          'header.html': await getModule('static-site/jekyll/_includes/header.html'),
          'pagination.html': await getModule('static-site/jekyll/_includes/pagination.html')
        },
        _layouts: {
          'default.html': await getModule('static-site/jekyll/_layouts/default.html'),
          'page.html': await getModule('static-site/jekyll/_layouts/page.html'),
          'post.html': await getModule('static-site/jekyll/_layouts/post.html')
        },
        _posts: {
          '2016-03-30-style-test.md': await getModule('static-site/jekyll/_posts/2016-03-30-style-test.md')
        },
        _sass: {
          '_base.scss': await getModule('static-site/jekyll/_sass/_base.scss'),
          '_syntax-highlighting.scss': await getModule('static-site/jekyll/_sass/_syntax-highlighting.scss')
        },
        assets: {
          fonts: {
            'pictos_custom.eot': await getModule('static-site/jekyll/assets/fonts/pictos_custom.eot'),
            'pictos_custom.ttf': await getModule('static-site/jekyll/assets/fonts/pictos_custom.ttf'),
            'pictos_custom.woff': await getModule('static-site/jekyll/assets/fonts/pictos_custom.woff')
          },
          images: {
            'logo.png': await getModule('static-site/jekyll/assets/images/logo.png')
          },
          javascripts: {
            'jquery.min.js': await getModule('static-site/jekyll/assets/javascripts/jquery.min.js'),
            'main.js': await getModule('static-site/jekyll/assets/javascripts/main.js')
          }
        },
        content: {
          images: {
            'header.jpg': await getModule('static-site/jekyll/content/images/header.jpg'),
            'joon-big.jpg': await getModule('static-site/jekyll/content/images/joon-big.jpg'),
            'joon-small.jpg': await getModule('static-site/jekyll/content/images/joon-small.jpg'),
            'roon3.jpeg': await getModule('static-site/jekyll/content/images/roon3.jpeg')
          }
        },
        css: {
          'main.scss':  await getModule('static-site/jekyll/css/main.scss')
        },
        '.gitignore': await getModule('static-site/jekyll/.gitignore'),
        '_config.yml': await getModule('static-site/jekyll/_config.yml'),
        'about.md': await getModule('static-site/jekyll/about.md'),
        'feed.xml': await getModule('static-site/jekyll/feed.xml'),
        'index.html': await getModule('static-site/jekyll/index.html')
      };
      break;
    case 'middleman':
      
      break;
    default:
  }
}

export default generateStaticSite;
