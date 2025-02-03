#!/bin/sh

# Function to check if an environment variable is not null or empty
check_env() {
  VAR_NAME="$1"
  VAR_VALUE=$(eval echo \$$VAR_NAME)

  if [ -z "$VAR_VALUE" ] || [ "$VAR_VALUE" = "null" ]; then
    echo ":: OAB :: Error: Environment variable $VAR_NAME is either empty or set to 'null'."
    exit 1
  fi
}

# List of required environment variables to check
REQUIRED_ENV_VARS="token guildId clientId"

for VAR in $REQUIRED_ENV_VARS; do
  check_env "$VAR"
done

echo ":: OAB :: All environment variables are set correctly."
exec "yarn node index.js"
