FROM docker.io/sissbruecker/linkding:1.47.0
RUN apt-get update && \
    apt-get dist-upgrade -y --no-install-recommends && \
    pip --python /etc/linkding/.venv/bin/python install --no-cache-dir --upgrade \
        'Django>=6.0.8,<6.1' \
        'PyJWT>=2.14.0' \
        'djangorestframework>=3.18.2,<3.19' \
        'soupsieve>=3.0.2' \
        'urllib3>=2.8.0' \
        'certifi>=2026.10.18' && \
    apt-get purge -y --auto-remove libssl-dev || true && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /root/.cache
