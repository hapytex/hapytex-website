jss = $(shell ls static/*.js)
csss = $(shell ls static/*.css)
htmls = $(shell ls static/*.html)
svgs = $(shell ls static/*.svg)
pngs = $(shell ls static/*.png)

outjss = $(jss:static/%=out_/%)
outcsss = $(csss:static/%=out_/%)
outhtmls = $(htmls:static/%=out_/%)
outsvgs = $(svgs:static/%=out_/%)
outpngs = $(pngs:static/%=out_/%)

all: out_ out_/CNAME /var/www/hapytex/ $(outjss) $(outcsss) $(outhtmls) $(outsvgs) $(outpngs)
	cp -r out_/* /var/www/hapytex/

install: /var/www/hapytex/

/var/www/hapytex/:
	sudo mkdir -p /var/www/hapytex
	sudo chown :www-data /var/www/hapytex/
	sudo sudo chmod o+rwx /var/www/hapytex/

out_ :
	mkdir -p out_

out_/%.js: static/%.js
	yui-compressor --type js "$<" >"$@" || ln -f "$<" "$@"

out_/%.css: static/%.css
	yui-compressor --type css "$<" >"$@" || ln -f "$<" "$@"

out_/%.html: static/%.html
	minify --type 'html' --html-keep-document-tags < "$<" > "$@" || ln -f "$<" "$@"

out_/%.svg: static/%.svg
	minify --type 'svg' < "$<" > "$@" || ln -f "$<" "$@"

out_/sitemap.xml:
	git clone https://github.com/knyzorg/Sitemap-Generator-Crawler.git sitemap_
	php sitemap_/sitemap.php file="$@" site=https://www.hapytex.eu

out_/%.ico: media/%.ico
	ln "$<" "$@"

out_/%: static/%
	ln -f "$<" "$@"

out_/%:
	mkdir -p "$@"

clean:
	rm -r out_
