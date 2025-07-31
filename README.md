# GitHub PR Merger Tool

A convenient command-line and web-based tool for merging GitHub pull requests from anywhere, anytime.

## 🎯 Inspiration

During my vacation, I noticed deployments were getting delayed due to my absence when pull requests needed merging. This tool was born out of the need to merge PRs remotely and efficiently - whether I'm at the beach, traveling, or just away from my development setup. Now I can quickly merge PRs from any device with just a GitHub token, keeping the development workflow smooth even when I'm not at my desk.

## ✨ Features

- 🔐 **Secure Authentication** - Uses GitHub Personal Access Tokens
- 🏠 **Private Repository Focus** - Lists only private repositories with proper access
- 🔍 **Permission Verification** - Checks push/admin access before attempting merges
- 📋 **Latest PR Detection** - Automatically finds the most recently updated open PR
- ⚡ **Quick Merge** - One-click merge with confirmation
- 🛡️ **Error Handling** - Detailed error messages and troubleshooting guidance
- 🌍 **Cross-Platform** - Works on Windows, macOS, and Linux

## 🚀 Quick Start

### Prerequisites

- Node.js 14.0.0 or higher
- GitHub Personal Access Token with `repo` scope

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arshadakl/github-pr-merger.git
cd github-pr-merger
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your GitHub token to `.env`:
```
GITHUB_TOKEN=your_github_personal_access_token_here
```

### Usage

#### CLI Tool (Recommended)

Run the command-line interface:
```bash
npm start
```

Or install globally:
```bash
npm install -g .
merge-pr
```

#### Web Interface

For situations where CLI isn't available, use the web interface:

1. Open `web/index.html` in any modern browser
2. Enter your GitHub Personal Access Token
3. Select repository and merge PRs

See [Web Interface Documentation](web/README.md) for detailed instructions.

## 🔧 How It Works

1. **Authentication** - Verifies your GitHub token and user permissions
2. **Repository Discovery** - Fetches all private repositories you have access to
3. **Access Filtering** - Only shows repositories where you have push/admin permissions
4. **PR Detection** - Finds the latest open pull request for selected repository
5. **Permission Check** - Verifies merge permissions before attempting merge
6. **Safe Merge** - Executes merge with comprehensive error handling

## 🛡️ Security

- Tokens are never stored or logged
- Only requires minimum necessary permissions (`repo` scope)
- Validates permissions before any destructive operations
- Works only with repositories you have legitimate access to

## 📝 Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (Full control of private repositories)
4. Copy token to your `.env` file

## 🚨 Troubleshooting

### Common Issues

**"Authentication failed"**
- Verify your token has `repo` scope
- Check token hasn't expired
- Ensure token is correctly set in `.env`

**"No repositories found"**
- Token might not have access to private repositories
- You might not have push/admin access to any private repos

**"Pull request is not mergeable"**
- Check for merge conflicts
- Verify required status checks are passing
- Ensure required reviews are completed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [@octokit/rest](https://github.com/octokit/rest.js) for GitHub API interactions
- Uses [inquirer](https://github.com/SBoudrias/Inquirer.js) for interactive CLI
- Styled with [chalk](https://github.com/chalk/chalk) for colorful terminal output

## 💡 Use Cases

- **Remote Work** - Merge PRs while working from anywhere
- **Vacation/Travel** - Keep deployments moving without being tied to your development machine
- **Quick Fixes** - Rapidly merge hotfixes from mobile devices or tablets
- **Team Coordination** - Enable team members to merge when primary maintainers are unavailable
- **Emergency Deployments** - Handle urgent merges from any location

---

*Never let location be a barrier to keeping your development workflow smooth!* 🌍✈️
