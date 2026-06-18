FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install Apache2
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends apache2 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable apache rewrite module for SPA routing
RUN a2enmod rewrite

# Configure Apache virtual host
COPY apache-vhost.conf /etc/apache2/sites-available/000-default.conf

# Add vscode user to www-data group for permissions
RUN usermod -aG www-data vscode
