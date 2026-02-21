# 🚀 FleetFlow Git Workflow Guide

Welcome to the FleetFlow project! This guide explains how to manage your code using Git and sync it with GitHub.

---

## 🛠 One-Time Setup (ALREADY DONE)
I have already performed these steps for you:
1. `git init` - Initialized the local repo.
2. `git add .` - Staged your files.
3. `git commit -m "..."` - Created the first commit.
4. `git branch -M main` - Set the branch name.
5. `git remote add origin https://github.com/nayan4472/LJ_CODERS_ODOO_HACKTHON.git` - Linked to GitHub.
6. `git push -u origin main` - Pushed the code live.

---

## 🔄 Daily Workflow (How to Sync Your Code)

Follow these **3 steps** whenever you make changes to your code:

### 1. Stage Your Changes
This tells Git which files you want to include in your next "save point".
```powershell
git add .
```

### 2. Create a Save Point (Commit)
This saves your changes locally with a descriptive message.
```powershell
git commit -m "Describe what you changed"
```

### 3. Push to GitHub
This sends your local "save points" to the online repository.
```powershell
git push
```

---

## 🔍 Useful Commands

| Command | Purpose |
| :--- | :--- |
| `git status` | Check which files are changed/staged. |
| `git log --oneline` | View your recent commit history. |
| `git diff` | See exactly what lines you changed. |
| `git pull` | Download changes from GitHub (if multiple people are working). |

---

## ⚠️ Common Errors & Fixes

### "nothing to commit, working tree clean"
**Meaning**: You haven't made any changes to your files since the last commit, or you forgot to save your files in your editor.
**Fix**: Edit a file, save it, and try `git add .` again.

### "remote origin already exists"
**Meaning**: You tried to run `git remote add origin` again.
**Fix**: You don't need to run this anymore! Your project is already linked.

### "Everything up-to-date"
**Meaning**: Your local code and GitHub code are identical.
**Fix**: No action needed!

---

**Happy Coding! 🚀**
