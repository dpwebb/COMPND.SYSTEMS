# COMPND.SYSTEMS
        
build a visually appealing website for  https://compnd.systems in the Star Trek LCARS fashion. COMPND.SYSTEMS  a high functioning, global, software development  company. 

Made with Floot.

# Instructions

For security reasons, the `env.json` file is not pre-populated — you will need to generate or retrieve the values yourself.  

For **JWT secrets**, generate a value with:  

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then paste the generated value into the appropriate field.  

For the **Floot Database**, download your database content as a pg_dump from the cog icon in the database view (right pane -> data -> floot data base -> cog icon on the left of the name), upload it to your own PostgreSQL database, and then fill in the connection string value.  

**Note:** Floot OAuth will not work in self-hosted environments.  

For other external services, retrieve your API keys and fill in the corresponding values.  

Once everything is configured, you can build and start the service with:  

```
npm install -g pnpm
pnpm install
pnpm vite build
pnpm tsx server.ts
```

## Production Readiness

This project is not yet approved for public production at scale. Use [docs/production-readiness.md](docs/production-readiness.md) as the current release gate checklist.

Minimum validation before promotion:

```
pnpm install --frozen-lockfile
pnpm run build
pnpm audit --audit-level high
pnpm smoke:prod
```

Container build:

```
docker build -t compnd-systems:local .
docker run --rm -p 3336:3336 -e NODE_ENV=production -e COMPND_ENABLE_ADMIN_AUTONOMY=false compnd-systems:local
```
