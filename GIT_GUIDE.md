# Git Workflow Tips

Use these commit messages as you build. Keep them short and direct.

## Initial Setup Commits

```bash
git init
git add .
git commit -m "Initial setup with Next.js and TypeScript"

git add prisma/
git commit -m "Add database schema"

git add app/api/auth/
git commit -m "Add authentication"

git add app/api/applications/
git commit -m "Add application API routes"

git add app/dashboard/
git commit -m "Build dashboard page"

git add app/login/ app/register/
git commit -m "Add login and register pages"
```

## Feature Commits (as you add more)

```bash
git commit -m "Add search filter"
git commit -m "Fix status update bug"
git commit -m "Add export to CSV"
git commit -m "Improve mobile layout"
git commit -m "Add email notifications"
```

## Tips for Natural Commits

- Commit small chunks of work, not everything at once
- Use present tense ("Add" not "Added")
- Be specific but brief
- Don't commit generated files (node_modules, .next, etc)
- Commit working code, not broken stuff

## Example Workflow

```bash
# Work on a feature
# Test it works
git add app/dashboard/
git commit -m "Add filters to dashboard"

# Work on another small thing
git add app/api/applications/
git commit -m "Fix date formatting"

# Push when ready
git push origin main
```

This makes your commit history look real and professional.
