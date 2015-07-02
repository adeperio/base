#!/bin/bash
if [ ! -d "certs" ] ; then
  # Control will enter here if certs exists.

    if [ ! -z "$1" ] ; then
        FQDN=$1


        # make directories to work from
        mkdir -p certs/{server,client,ca,tmp}

        # Create your very own Root Certificate Authority
        openssl genrsa \
          -out certs/ca/my-root-ca.key.pem \
          2048

        # Self-sign your Root Certificate Authority
        # Since this is private, the details can be as bogus as you like
        # Country param needs to be 2 characters max
        openssl req \
          -x509 \
          -new \
          -nodes \
          -key certs/ca/my-root-ca.key.pem \
          -days 1024 \
          -out certs/ca/my-root-ca.crt.pem \
          -subj "/C=AU/ST=Vic/L=Mel/O=Joan/CN=${FQDN}"

        # Create a Device Certificate for each domain,
        # such as example.com, *.example.com, awesome.example.com
        # NOTE: You MUST match CN to the domain name or ip address you want to use
        openssl genrsa \
          -out certs/server/my-server.key.pem \
          2048

        # Create a request from your Device, which your Root CA will sign
        # Country param needs to be 2 characters max
        openssl req -new \
          -key certs/server/my-server.key.pem \
          -out certs/tmp/my-server.csr.pem \
          -subj "/C=AU/ST=VIC/L=Mel/O=Joan/CN=${FQDN}"

        # Sign the request from Device with your Root CA
        # -CAserial certs/ca/my-root-ca.srl
        openssl x509 \
          -req -in certs/tmp/my-server.csr.pem \
          -CA certs/ca/my-root-ca.crt.pem \
          -CAkey certs/ca/my-root-ca.key.pem \
          -CAcreateserial \
          -out certs/server/my-server.crt.pem \
          -days 500

        # Create a public key, for funzies
        # see https://gist.github.com/coolaj86/f6f36efce2821dfb046d
        openssl rsa \
          -in certs/server/my-server.key.pem \
          -pubout -out certs/client/my-server.pub

        # Put things in their proper place
        rsync -a certs/ca/my-root-ca.crt.pem certs/server/
        rsync -a certs/ca/my-root-ca.crt.pem certs/client/
    else
      echo "WARNING: Missing -d parameter for app domain"
    fi
else
  echo "self-signed certs already exist"
fi
