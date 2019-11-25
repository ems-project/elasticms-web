#!/bin/bash

     if ! [ -z ${APACHE_ENVIRONMENTS+x} ]; then
        echo "Multiple environment aliases are defined: ${APACHE_ENVIRONMENTS}" | jq -c '.[]'
        echo "caution do not add an alias that exists somewhere in a ems route (i.e. admin)"

        cat >> /etc/apache2/conf.d/vhost.conf << EOL
            $(echo ${APACHE_ENVIRONMENTS} | jq -r 'map("Alias "+.alias+"/bundles/emsch_assets /opt/src/public/bundles/"+.env) | join("\n")')
            $(echo ${APACHE_ENVIRONMENTS} | jq -r 'map("Alias "+.alias+" /opt/src/public") | join("\n")')
            $(echo ${APACHE_ENVIRONMENTS} | jq -r 'map(["RewriteEngine on", "RewriteCond %{REQUEST_URI} !^"+.alias+"/index.php", "RewriteCond %{REQUEST_URI} !^"+.alias+"/bundles", "RewriteCond %{REQUEST_URI} !^"+.alias+"/favicon.ico$", "RewriteCond %{REQUEST_URI} !^"+.alias+"/apple-touch-icon.png$", "RewriteCond %{REQUEST_URI} !^"+.alias+"/robots.txt$", "RewriteRule ^"+.alias+" "+.alias+"/index.php$1 [PT]"])' | jq -r '.[] | join("\n")')
EOL
    fi
