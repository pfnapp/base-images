#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ] || [ "$#" -gt 3 ]; then
  printf 'Usage: %s <body-file> <secret> [unix-timestamp]\n' "$0" >&2
  exit 2
fi

body_file=$1
secret=$2
timestamp=${3-$(date +%s)}

if [ ! -r "$body_file" ] || [ -z "$secret" ] || [[ ! "$timestamp" =~ ^[0-9]+$ ]]; then
  printf 'A readable body file, non-empty secret, and unix timestamp are required.\n' >&2
  exit 2
fi

{ printf '%s.' "$timestamp"; cat "$body_file"; } | openssl dgst -sha256 -hmac "$secret" -r | cut -d ' ' -f 1
