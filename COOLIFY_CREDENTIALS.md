# Coolify Deployment Credentials

**IMPORTANT**: Keep this file secure. Do NOT commit to Git.

## Coolify Access

- **URL**: http://175.111.130.243:8000
- **Email**: kumarprashantvaishnav@gmail.com
- **Password**: `Prashant$$31$$`
  - Note: Password contains TWO dollar signs: `$$`
  - When entering: `Prashant$$31$$`

## GitHub Repository

- **Repo**: https://github.com/vastucartapps/vastustore
- **Branch**: main
- **Docker Compose File**: `docker-compose.production.yml`

## Domain

- **Domain**: store.vastucart.in (already configured in DNS)

## Environment Variables to Set in Coolify

Generate strong random strings for these:

```bash
# Database
POSTGRES_PASSWORD=<generate-32-char-password>

# Medusa Secrets
JWT_SECRET=<generate-random-32-chars>
COOKIE_SECRET=<generate-random-32-chars>
MEDUSA_ADMIN_API_KEY=<generate-admin-key>

# Domain Configuration
ADMIN_CORS=https://store.vastucart.in
STORE_CORS=https://store.vastucart.in
MEDUSA_BACKEND_URL=https://store.vastucart.in
NEXT_PUBLIC_APP_URL=https://store.vastucart.in

# AstroEngine (already configured)
NEXT_PUBLIC_ASTRO_API_URL=https://api.vastucart.in/api/v1
```

## Deployment Steps

1. Login to Coolify: http://175.111.130.243:8000
2. Create new project: "VastuCart Store"
3. Add Docker Compose service
4. Connect to GitHub: vastucartapps/vastustore
5. Select `docker-compose.production.yml`
6. Add all environment variables above
7. Set domain: store.vastucart.in
8. Deploy!

## Post-Deployment

After first deploy:

```bash
# SSH into Coolify frontend container
docker exec -it vastucart-frontend npm run seed

# Or use Coolify terminal to run seed script
```

## Architecture

- ✅ Single unified project
- ✅ Persistent PostgreSQL database
- ✅ Redis caching
- ✅ Medusa v2 backend
- ✅ Next.js 15 frontend
- ✅ Auto-deployments on git push

## Notes

- Database persists across deployments (volume: `postgres_data`)
- Redis persists across deployments (volume: `redis_data`)
- SSL certificates managed by Coolify
- Zero-downtime deployments
