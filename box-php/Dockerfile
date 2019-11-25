FROM container-gcloud.smals.be/base-php7-fpm:3.8

MAINTAINER WCMtech <wcmtech@smals.be>

# Environment variables used in application config files.
# The 'setup.sh' script is responsible to replace this variables by her content.
# If secret is used, then the content of variables are filled from secret files.
#ENV MYSQL_USERNAME ${MYSQL_USERNAME}
#ENV MYSQL_PASSWORD ${MYSQL_PASSWORD}
#ENV MYSQL_TCP_ADDR lpssbdbs002a.ssb.dom
#ENV MYSQL_TCP_PORT 3002
#ENV MYSQL_DB_NAME symfony

WORKDIR /

USER root

# Ensure that we can write in /opt/src/var
RUN mkdir -p /opt/src/var/cache /opt/src/var/log /opt/src/var/sessions /opt/src/var/assets && \
    chown -Rf 1001:0 /opt/src/var/cache /opt/src/var/log /opt/src/var/sessions /opt/src/var/assets && \
    chmod a+rwx /opt/src/var/cache /opt/src/var/log /opt/src/var/sessions /opt/src/var/assets

# Ensure that generated files can be write ( docker build failed if this files does not exists )
#RUN chown 1001:0 /opt/src/app/config /opt/src/app/config/parameters.yml /opt/src/var/bootstrap.php.cache && \
#    chmod a+rwx /opt/src/app/config /opt/src/app/config/parameters.yml /opt/src/var/bootstrap.php.cache

# Add starting shell script.
#ADD contrib/bin/common.sh /opt/bin/common.sh
#ADD contrib/bin/cron.sh /opt/bin/cron.sh
#ADD contrib/bin/dump.sh /opt/bin/dump.sh
#ADD contrib/bin/liveness.sh /opt/bin/liveness.sh
#ADD contrib/bin/setenv.sh /opt/bin/setenv.sh
ADD contrib/bin/setup.sh /opt/bin/setup.sh
#ADD contrib/bin/sql.sh /opt/bin/sql.sh
#RUN chown 1001:0 /opt/bin/common.sh && \
#    chmod +x /opt/bin/common.sh  && \
#    chown 1001:0 /opt/bin/cron.sh && \
#    chmod +x /opt/bin/cron.sh  && \
#    chown 1001:0 /opt/bin/dump.sh && \
#    chmod +x /opt/bin/dump.sh  && \
#    chown 1001:0 /opt/bin/liveness.sh && \
#    chmod +x /opt/bin/liveness.sh  && \
#    chown 1001:0 /opt/bin/setenv.sh && \
#    chmod +x /opt/bin/setenv.sh && \
#    chown 1001:0 /opt/bin/sql.sh && \
#    chmod +x /opt/bin/sql.sh && \
#    chown 1001:0 /opt/bin/setup.sh && \
#    chmod +x /opt/bin/setup.sh && \
#    touch /var/log/php-fpm/fpm-error.log && \
#    touch /var/log/php-fpm/fpm-access.log && \
#    ln -sf /dev/stdout /var/log/php-fpm/fpm-access.log && \
#    ln -sf /dev/stderr /var/log/php-fpm/fpm-error.log

RUN chown 1001:0 /opt/bin/setup.sh && \
    chmod +x /opt/bin/setup.sh && \
    touch /var/log/php-fpm/fpm-error.log && \
    touch /var/log/php-fpm/fpm-access.log && \
    ln -sf /dev/stdout /var/log/php-fpm/fpm-access.log && \
    ln -sf /dev/stderr /var/log/php-fpm/fpm-error.log

#ln -sf /dev/stdout /opt/src/var/log/prod.log && \
#RUN apk --update add php-ldap
#RUN apk --update add mysql-client

USER 1001

CMD ["setup.sh"]
