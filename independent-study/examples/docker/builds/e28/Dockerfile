FROM php:7.3.15-apache

RUN apt-get update && \
    apt-get upgrade -y

RUN pecl install mongodb xdebug

RUN apt-get install -y --force-yes \
    curl \
    git \
    gnupg \
    libgd-dev \
    libxml2-dev \
    libzip-dev \
    nano \
    unzip \
    vim \
    zip \
    zlib1g-dev

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    soap \
    zip \
    && docker-php-ext-enable mongodb xdebug

RUN docker-php-ext-configure gd --with-freetype-dir=/usr/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/  &&  \
    docker-php-ext-install gd

# Install latest node and npm
RUN apt-get update -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq

# Install composer
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    printf "\nPATH=\"~/.composer/vendor/bin:\$PATH\"\n" | tee -a ~/.bashrc

# Install deployer
RUN curl -LO https://deployer.org/deployer.phar && \
    mv deployer.phar /usr/local/bin/dep && \
    chmod +x /usr/local/bin/dep

RUN npm install -g @vue/cli

RUN a2enmod rewrite
COPY ./e28.test.conf /etc/apache2/sites-available/e28.test.conf
COPY ./e28p1.test.conf /etc/apache2/sites-available/e28p1.test.conf
COPY ./e28p2.test.conf /etc/apache2/sites-available/e28p2.test.conf
COPY ./zipfoods.test.conf /etc/apache2/sites-available/zipfoods.test.conf
RUN a2ensite e28.test.conf && a2ensite e28p1.test.conf && a2ensite e28p2.test.conf && a2ensite zipfoods.test.conf