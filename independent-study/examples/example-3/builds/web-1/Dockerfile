FROM php:7.4.4-apache

RUN docker-php-ext-install \
    pdo \
    pdo_mysql

RUN a2enmod rewrite
COPY ./is-1.test.conf /etc/apache2/sites-available/000-default.conf