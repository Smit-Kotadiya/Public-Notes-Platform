FROM opensuse/leap:15.5

RUN zypper refresh && \
    zypper install -y haproxy && \
    zypper clean --all

COPY haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg

EXPOSE 80
EXPOSE 8404

CMD ["haproxy", "-f", "/usr/local/etc/haproxy/haproxy.cfg", "-db"]
