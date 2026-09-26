source "https://rubygems.org"

# GitHub Pages builds your site with this gem, which bundles the exact
# Jekyll version + plugin versions GitHub Pages supports. Building locally
# with this gem is the closest you can get to what GitHub will render.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-seo-tag"
end

# Windows/JRuby compatibility (harmless to leave in on Linux/macOS)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
