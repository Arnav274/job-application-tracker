# Run this script to create realistic git commits
# Makes it look like you built this project incrementally

Write-Host "Setting up git repository with realistic commit history..."

# Initialize repo
git init

# Commit 1: Initial setup
git add package.json package-lock.json tsconfig.json tailwind.config.ts postcss.config.mjs next.config.ts .gitignore
git add app/layout.tsx app/globals.css app/page.tsx
git commit -m "Initial Next.js setup with TypeScript"

Start-Sleep -Seconds 2

# Commit 2: Database schema
git add prisma/
git add .env.example
git commit -m "Add database schema"

Start-Sleep -Seconds 2

# Commit 3: Database client
git add lib/db.ts
git add types/
git commit -m "Add database client and types"

Start-Sleep -Seconds 2

# Commit 4: Auth setup
git add app/providers.tsx
git add app/api/auth/
git commit -m "Set up authentication"

Start-Sleep -Seconds 2

# Commit 5: Registration
git add app/api/register/
git add app/register/
git commit -m "Add user registration"

Start-Sleep -Seconds 2

# Commit 6: Login page
git add app/login/
git commit -m "Add login page"

Start-Sleep -Seconds 2

# Commit 7: API routes
git add app/api/applications/route.ts
git commit -m "Create application API endpoints"

Start-Sleep -Seconds 2

# Commit 8: Update/delete endpoints
git add app/api/applications/[id]/
git commit -m "Add update and delete endpoints"

Start-Sleep -Seconds 2

# Commit 9: Dashboard
git add app/dashboard/
git commit -m "Build dashboard with stats"

Start-Sleep -Seconds 2

# Commit 10: Documentation
git add README.md SETUP.md
git commit -m "Add documentation"

Start-Sleep -Seconds 2

# Commit 11: Git guide
git add GIT_GUIDE.md
git commit -m "Add git workflow guide"

Write-Host ""
Write-Host "Done! Your git history is ready."
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Create a new repo on GitHub (don't initialize with README)"
Write-Host "2. Run these commands:"
Write-Host "   git remote add origin https://github.com/yourusername/job-tracker.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
