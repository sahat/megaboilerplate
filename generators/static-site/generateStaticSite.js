import { set } from 'lodash';
import { getModule, templateReplaceMemory } from '../../generators/utils';

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
            '.gitkeep': await getModule('static-site/jekyll/assets/images/.gitkeep')
          },
          javascripts: {
            'jquery.min.js': await getModule('static-site/jekyll/assets/javascripts/jquery.min.js'),
            'main.js': await getModule('static-site/jekyll/assets/javascripts/main.js')
          }
        },
        content: {
          images: {
            '.gitkeep': await getModule('static-site/jekyll/content/images/.gitkeep')
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
      params.build = {
        source: {
          images: {
            '.gitkeep': await getModule('static-site/middleman/source/images/.gitkeep')
          },
          javascripts: {
            'jquery.min.js': await getModule('static-site/middleman/source/javascripts/jquery.min.js'),
            'main.js': await getModule('static-site/middleman/source/javascripts/main.js'),
            'semantic.min.js': await getModule('static-site/middleman/source/javascripts/semantic.min.js')
          },
          layouts: {
            'layout.erb': await getModule('static-site/middleman/source/layouts/layout.erb')
          },
          stylesheets: {
            themes: {
              basic: {
                assets: {
                  fonts: {
                    'icons.eot': await getModule('static-site/middleman/source/stylesheets/themes/basic/assets/fonts/icons.eot'),
                    'icons.svg': await getModule('static-site/middleman/source/stylesheets/themes/basic/assets/fonts/icons.svg'),
                    'icons.ttf': await getModule('static-site/middleman/source/stylesheets/themes/basic/assets/fonts/icons.ttf'),
                    'icons.woff': await getModule('static-site/middleman/source/stylesheets/themes/basic/assets/fonts/icons.woff')
                  }
                }
              },
              default: {
                assets: {
                  fonts: {
                    'icons.eot': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.eot'),
                    'icons.otf': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.otf'),
                    'icons.svg': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.svg'),
                    'icons.ttf': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.ttf'),
                    'icons.woff': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.woff'),
                    'icons.woff2': await getModule('static-site/middleman/source/stylesheets/themes/default/assets/fonts/icons.woff2')
                  }
                }
              }
            },
            'semantic.min.css': await getModule('static-site/middleman/source/stylesheets/semantic.min.css'),
            'site.css.scss': await getModule('static-site/middleman/source/stylesheets/site.css.scss')
          },
          'index.html.erb': await getModule('static-site/middleman/source/index.html.erb')
        },
        '.gitignore': await getModule('static-site/middleman/.gitignore'),
        'config.rb': await getModule('static-site/middleman/config.rb'),
        'config.ru': await getModule('static-site/middleman/config.ru'),
        'Gemfile': await getModule('static-site/middleman/Gemfile'),
        'Gemfile.lock': await getModule('static-site/middleman/Gemfile.lock')
      };
      break;
    default:
  }


  // Add README.md
  set(params, ['build', 'README.md'], await getModule('readme/readme-static-site.md'));

  templateReplaceMemory(params, 'README.md', {
    staticSiteGenerator: params.staticSiteGenerator
  });
}

export default generateStaticSite;
