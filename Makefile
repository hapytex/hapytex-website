jss = $(shell ls site/*.js)
csss = $(shell ls site/*.css)
outjss = $(jss:site/%=out_/%)
outcsss = $(csss:site/%=out_/%)


all: out_ out_/CNAME $(outjss) $(outcsss) index.html

out_ :
	mkdir -p out_

out_/%.js: site/%.js
	yui-compressor --type js "$<" >"$@" || ln -f "$<" "$@"

out_/%.css: site/%.css
	yui-compressor --type css "$<" >"$@" || ln -f "$<" "$@"

out/%.html: site/%.html:
	minify --type 'html' --html-keep-document-tags < "$<" > "$@" || ln -f "$<" "$@"

out_/sitemap.xml:
	git clone https://github.com/knyzorg/Sitemap-Generator-Crawler.git sitemap_
	php sitemap_/sitemap.php file="$@" site=https://www.hapytex.eu

out_/%.ico : media/%.ico
	ln "$<" "$@"

out_/%: site/%
	ln -f "$<" "$@"

out_/%:
	mkdir -p "$@"
