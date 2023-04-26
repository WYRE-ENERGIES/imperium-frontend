# !/bin/sh
set -e
set -o pipefail

# Build the docker image
docker build --tag imperium .

# Run the docker image
docker run -p 3000:3000 -d imperium
