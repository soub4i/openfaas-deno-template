FROM --platform=${TARGETPLATFORM:-linux/amd64} ghcr.io/openfaas/classic-watchdog:0.2.0 as watchdog
FROM --platform=${TARGETPLATFORM:-linux/amd64} denoland/deno:1.10.3 as ship

ARG TARGETPLATFORM
ARG BUILDPLATFORM

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog


WORKDIR /app

# Turn down the verbosity to default level.
ENV DENO_LOGLEVEL debug

# Copy outer function handler
COPY index.ts ./
COPY function ./function

# Copy in additional function files and folders
COPY --chown=deno:deno function/ .tion


# chmod for tmp is for a buildkit issue (@alexellis)
RUN  chmod +rx -R ./function \
    && chown deno:deno -R /app \
    && chmod 777 /tmp

USER deno

ENV cgi_headers="true"
ENV fprocess="deno run -L ${DENO_LOGLEVEL} run index.ts --allow-read"
EXPOSE 8080

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
