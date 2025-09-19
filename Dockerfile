FROM php:8.3-apache

# set your user name, ex: user=marcia
ARG user=admin
ARG uid=1000

# 1. Atualizar pacotes e instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip curl libicu-dev libzip-dev zip \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev

# 2. Instalar extensões PHP básicas em blocos separados
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install intl
RUN docker-php-ext-install zip
RUN docker-php-ext-install sockets

# 3. Configurar e instalar GD
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# 4. Habilitar mod_rewrite do Apache
RUN a2enmod rewrite
# 5. Limpar cache do apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 6. Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user \
    && mkdir -p /home/$user/.composer \
    && chown -R $user:$user /home/$user

# 8. Set working directory
WORKDIR /var/www/html

# 9. Copy custom configurations PHP
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

# 10. Switch to the custom user
USER $user