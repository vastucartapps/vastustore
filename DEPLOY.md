# VastuCart Store - Coolify Deployment Guide

## Architecture

Single unified project containing:
- **Frontend**: Next.js 15 (port 3000)
- **Backend**: Medusa v2 (port 9000)
- **Database**: PostgreSQL 15 (persistent volume)
- **Cache**: Redis 7

## Coolify Setup

### 1. Create New Project in Coolify

1. Login to Coolify: http://175.111.130.243:8000
2. Create new project: "VastuCart Store"
3. Add service: Docker Compose

### 2. Configure Git Repository

- **Repository**: https://github.com/vastucartapps/vastustore
- **Branch**: main
- **Docker Compose File**: docker-compose.production.yml

### 3. Set Environment Variables in Coolify

```bash
# Database (generate strong password)
POSTGRES_PASSWORD=<generate-strong-password>

# Medusa Secrets (32+ character random strings)
JWT_SECRET=<generate-random-32-chars>
COOKIE_SECRET=<generate-random-32-chars>
MEDUSA_ADMIN_API_KEY=<generate-admin-key>

# Domain (Coolify will handle)
ADMIN_CORS=https://store.vastucart.in
STORE_CORS=https://store.vastucart.in
MEDUSA_BACKEND_URL=https://store.vastucart.in
NEXT_PUBLIC_APP_URL=https://store.vastucart.in

# AstroEngine (already configured)
NEXT_PUBLIC_ASTRO_API_URL=https://api.vastucart.in/api/v1

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 4. Domain Configuration

- **Domain**: store.vastucart.in
- **Port Mapping**:
  - Frontend: 3000 → 80/443 (HTTPS)
  - Backend API: 9000 (internal only)

### 5. Persistent Volumes

**IMPORTANT**: These volumes must persist across deployments:
- `postgres_data` → PostgreSQL database
- `redis_data` → Redis cache

Coolify will automatically create and maintain these volumes.

### 6. Deploy

1. Click "Deploy" in Coolify
2. Monitor logs for:
   - PostgreSQL health check ✓
   - Redis health check ✓
   - Medusa migrations ✓
   - Frontend build ✓

## Post-Deployment

### Access Points

- **Storefront**: https://store.vastucart.in
- **Admin Panel**: https://store.vastucart.in/admin
- **Medusa API**: Internal (http://medusa:9000)

### Initial Setup

1. **Seed Sample Data**:
   ```bash
   # SSH into Coolify container
   docker exec -it vastucart-frontend npm run seed
   ```

2. **Create Admin User** (if needed):
   ```bash
   docker exec -it vastucart-medusa medusa user -e admin@vastucart.in -p <password>
   ```

## Deployment Notes

- Database is **persistent** - survives redeployments
- Each push to `main` branch triggers auto-deployment
- Zero-downtime deployment via Coolify
- SSL certificates auto-managed by Coolify

## Troubleshooting

### Database Connection Issues
```bash
docker logs vastucart-postgres
docker exec -it vastucart-postgres psql -U postgres -d vastucart_db
```

### Medusa Backend Issues
```bash
docker logs vastucart-medusa
docker exec -it vastucart-medusa medusa migrations run
```

### Frontend Issues
```bash
docker logs vastucart-frontend
docker exec -it vastucart-frontend npx prisma migrate deploy
```

## Architecture Clarification

- **AstroAPI** (api.vastucart.in): User authentication ONLY
- **Medusa Backend**: Products, cart, orders, categories
- **PostgreSQL**: Both Medusa data + Next.js app data (Prisma)
- **This Project**: Handles all ecommerce functionality except user auth
