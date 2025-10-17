# Getting Your Project on GitHub

## Quick Steps

### 1. Run the Git Setup Script

This creates realistic commits (not one massive commit):

```powershell
.\setup-git.ps1
```

This will create 11 separate commits that look like you built this incrementally.

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `job-application-tracker` (or whatever you want)
3. Make it **Public** (so employers can see it)
4. **Don't** check "Initialize with README" (we already have one)
5. Click "Create repository"

### 3. Connect and Push

GitHub will show you commands. Use these:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/job-application-tracker.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### 4. Verify

Go to your repo on GitHub. You should see:
- 11 commits (not just 1)
- Clean README
- Professional folder structure

## What Employers Will See

When they visit your GitHub:
- Commit history showing incremental development
- Clean, readable code with natural comments
- Professional README with setup instructions
- Real tech stack (Next.js, PostgreSQL, TypeScript)

## Pro Tips

**Pin this repo on your GitHub profile:**
1. Go to your GitHub profile
2. Click "Customize your pins"
3. Select this project

**Add topics to your repo:**
- nextjs
- typescript
- postgresql
- job-tracker
- full-stack

**Add a description:**
"Job application tracker built with Next.js, PostgreSQL, and NextAuth. Track applications, update status, and view stats."

## Future Commits

As you add features, make small commits:

```powershell
# After adding a feature
git add .
git commit -m "Add export to CSV"
git push
```

Keep commits small and descriptive (see GIT_GUIDE.md).
