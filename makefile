medianotesdir = $(shell cat makedata.json | jq -r .medianotesdir | sed "s/ /\\\ /g")

normal:
	@echo "use calcium or ca20"

media_notes:
	@-rm -r calciumsite/media/markdown
	@cp -r $(medianotesdir) calciumsite/media/markdown
	@python3 automation/medianotes.py calciumsite/media/

up_calcium:
	@rsync -uvr --delete calciumsite/ root@calciumchan.com:/var/www/calcium

up_ca20:
	@rsync -uvr --delete ca20/ root@ca20.ca:/var/www/ca20