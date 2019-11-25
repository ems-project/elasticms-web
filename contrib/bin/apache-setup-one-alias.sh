#!/bin/bash

    if ! [ -z ${ENVIRONMENT_ALIAS+x} ]; then
        echo "An environment alias is defined: ${ENVIRONMENT_ALIAS}"

        cat >> /etc/apache2/conf.d/vhost.conf << EOL
        Alias /bundles/emsch_assets /opt/src/public/bundles/$ENVIRONMENT_ALIAS
EOL

    fi


    if ! [ -z ${ALIAS+x} ]; then
        if ! [ -z ${ENVIRONMENT_ALIAS+x} ]; then
            echo "An environment alias and an alias are defined!"

            cat >> /etc/apache2/conf.d/vhost.conf << EOL
            Alias $ALIAS/bundles/emsch_assets /opt/src/public/bundles/$ENVIRONMENT_ALIAS
EOL
        fi


        echo "An alias is defined: ${ALIAS}"
        echo "caution do not add an alias that exists somewhere in a ems route (i.e. admin)"
        cat >> /etc/apache2/conf.d/vhost.conf << EOL
        Alias $ALIAS /opt/src/public

        RewriteEngine  on
        RewriteCond %{REQUEST_URI} !^$ALIAS/index.php
        RewriteCond %{REQUEST_URI} !^$ALIAS/bundles
        RewriteCond %{REQUEST_URI} !^$ALIAS/favicon.ico\$
        RewriteCond %{REQUEST_URI} !^$ALIAS/apple-touch-icon.png\$
        RewriteCond %{REQUEST_URI} !^$ALIAS/robots.txt\$
        RewriteRule "^$ALIAS" "$ALIAS/index.php\$1" [PT]
EOL
    fi
