normal:
	@echo "use calcium or ca20"

calcium:
	@rsync -uvr --delete calciumsite/ root@calciumchan.com:/var/www/calcium

ca20:
	@rsync -uvr --delete ca20/ root@ca20.ca:/var/www/ca20