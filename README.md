
###build and push the images
	docker rmi elasticms-skeleton-web
	docker build -t webcontent-elasticms-skeleton-web -f box-web/Dockerfile .

	docker rmi elasticms-skeleton-php
	docker build -t webcontent-elasticms-skeleton-php -f box-php/Dockerfile .

	docker tag elasticms-skeleton-web container-snapshot.smals.be/webcontent-elasticms-skeleton-web:snapshot 
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-web:snapshot
	docker tag elasticms-skeleton-web container-snapshot.smals.be/webcontent-elasticms-skeleton-web:tst
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-web:tst
	docker tag elasticms-skeleton-php container-snapshot.smals.be/webcontent-elasticms-skeleton-php:snapshot
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-php:snapshot
	docker tag elasticms-skeleton-php container-snapshot.smals.be/webcontent-elasticms-skeleton-php:tst
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-php:tst

	
###Tag snapshot as test	
	docker pull container-snapshot.smals.be/webcontent-elasticms-skeleton-web:snapshot
	docker pull container-snapshot.smals.be/webcontent-elasticms-skeleton-php:snapshot
	
	docker tag -f container-snapshot.smals.be/webcontent-elasticms-skeleton-web:snapshot container-snapshot.smals.be/webcontent-elasticms-skeleton-web:test
	docker tag -f container-snapshot.smals.be/webcontent-elasticms-skeleton-php:snapshot container-snapshot.smals.be/webcontent-elasticms-skeleton-php:test
	
	
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-web:test
	docker push container-snapshot.smals.be/webcontent-elasticms-skeleton-php:test
	