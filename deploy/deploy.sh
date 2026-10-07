#!/bin/bash
set -e

APP_USER="${USER:-ifiruled}"
BACKUP_DIR="/var/backups/${APP_USER}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SNAPSHOT_FILE="$BACKUP_DIR/pre_deploy_${TIMESTAMP}.sql.gz"

git config --global --add safe.directory "$PWD" 2>/dev/null || true

echo "=== [1/6] Pulling latest git changes ==="
if [ -d ".git" ]; then
    git fetch origin main || true
    git reset --hard origin/main || true
fi

echo "=== [2/6] Creating Automated Pre-Deploy Database Snapshot ==="
mkdir -p "$BACKUP_DIR"
if docker compose ps db 2>/dev/null | grep -q "Up"; then
    echo ">>> Taking database snapshot before migration..."
    docker compose exec -T db mysqldump -u "${DB_USERNAME:-ifiruled_user}" -p"${DB_PASSWORD}" "${DB_DATABASE:-if_i_ruled}" 2>/dev/null | gzip > "$SNAPSHOT_FILE" || true
    if [ -s "$SNAPSHOT_FILE" ]; then
        echo ">>> Database snapshot verified: $SNAPSHOT_FILE"
        ls -t "$BACKUP_DIR"/pre_deploy_*.sql.gz 2>/dev/null | tail -n +6 | xargs -r rm -f || true
    else
        rm -f "$SNAPSHOT_FILE"
    fi
fi

echo "=== [3/6] Building and launching containers ==="
docker compose up -d --build --remove-orphans

echo "=== [4/6] Waiting for database service to be fully responsive ==="
if docker compose ps db 2>/dev/null | grep -q "Up"; then
    for i in $(seq 1 30); do
        if docker compose exec -T db mysqladmin ping -h 127.0.0.1 -u "${DB_USERNAME:-ifiruled_user}" -p"${DB_PASSWORD}" --silent 2>/dev/null; then
            echo ">>> Database is fully responsive!"
            break
        fi
        sleep 1
    done
fi

echo "=== [5/6] Executing Safe Production Migrations (Non-Destructive) ==="
if docker compose ps backend 2>/dev/null | grep -q "Up"; then
    echo ">>> Running Laravel migrations..."
    docker compose exec -T backend php artisan migrate --force
    docker compose exec -T backend php artisan config:cache
    docker compose exec -T backend php artisan route:cache
    docker compose exec -T backend php artisan view:cache
fi

echo "=== [6/6] Reloading central Caddy gateway & verifying health ==="
docker image prune -f
docker exec caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile 2>/dev/null || true
docker compose ps

echo "=== [SUCCESS] Deployment completed successfully! ==="
