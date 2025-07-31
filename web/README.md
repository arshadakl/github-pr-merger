# Web Interface for GitHub PR Merger

A browser-based interface for merging GitHub pull requests when command-line access isn't available.

## 🌐 Overview

The web interface provides the same functionality as the CLI tool but runs entirely in your browser. Perfect for:
- Mobile devices and tablets
- Computers where you can't install Node.js
- Quick access from any web browser
- Shared computers or restricted environments

## 🚀 Getting Started

### Simple Setup

1. **Open the file**: Simply open `index.html` in any modern web browser
2. **Enter token**: Input your GitHub Personal Access Token
3. **Authenticate**: Click "Authenticate" to verify your credentials
4. **Select repository**: Choose from your accessible private repositories
5. **Review PR**: View the latest pull request details
6. **Merge**: Click "Merge PR" to complete the merge

### No Installation Required

Unlike the CLI version, the web interface requires zero installation:
- No Node.js needed
- No package installation
- No environment setup
- Works offline once loaded

## 🔧 Features

### Core Functionality
- ✅ **Token-based Authentication** - Secure GitHub API access
- ✅ **Private Repository Listing** - Only shows repos you can merge to
- ✅ **Permission Verification** - Checks access before showing merge options
- ✅ **Latest PR Detection** - Automatically finds most recent open PR
- ✅ **One-click Merging** - Simple merge process with confirmation
- ✅ **Detailed Error Messages** - Clear guidance when issues occur

### User Interface
- 📱 **Mobile Responsive** - Works on phones and tablets
- 🎨 **Clean Design** - Focused on functionality over aesthetics
- 🔄 **Step-by-step Flow** - Guided process from authentication to merge
- 📊 **Real-time Feedback** - Loading states and status messages
- 🔒 **Secure Token Input** - Password field that doesn't store tokens

## 🛡️ Security

### Token Handling
- **Never Stored** - Tokens exist only in memory during session
- **No Persistence** - Cleared when you navigate away or refresh
- **No Transmission** - Only sent directly to GitHub's API
- **Secure Input** - Password field prevents shoulder surfing

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Usage

The web interface is optimized for mobile devices:

1. **Bookmark** the HTML file on your home screen
2. **Quick Access** - Launch like a native app
3. **Touch Friendly** - Large buttons and responsive design
4. **Offline Capable** - Works without internet after initial load (except API calls)

## 🔧 Technical Details

### No Server Required
- **Client-side Only** - Runs entirely in your browser
- **Direct API Calls** - Communicates directly with GitHub
- **Static File** - Can be hosted anywhere or run locally

### Dependencies
- **@octokit/rest** - Loaded via CDN for GitHub API interaction
- **No Build Process** - Plain HTML, CSS, and JavaScript
- **Modern ES6+** - Uses async/await, modules, and modern features

## 🚨 Troubleshooting

### Common Issues

**"Failed to load GitHub API"**
- Check internet connection
- Try refreshing the page
- Verify browser supports modern JavaScript

**"Authentication failed"**
- Double-check your GitHub token
- Ensure token has `repo` scope permissions
- Verify token hasn't expired

**"No repositories found"**
- Token might not have access to private repositories
- You might not have push access to any private repos
- Try refreshing the repository list

**Page not loading properly**
- Ensure you're using a modern browser
- Check developer console for errors
- Try opening in an incognito/private window

### Browser Developer Tools

If you encounter issues:

1. Open Developer Tools (F12)
2. Check the Console tab for errors
3. Look for network request failures
4. Common fixes:
   - Refresh the page
   - Clear browser cache
   - Try a different browser

## 💡 Use Cases

### Perfect for:
- **📱 Mobile Merging** - Merge PRs from your phone
- **🏖️ Vacation Access** - Handle urgent merges while traveling
- **💻 Shared Computers** - Use on any computer without installing software  
- **🚀 Quick Access** - Faster than setting up CLI environment
- **👥 Team Members** - Share with team members who don't have CLI setup

### When to Use CLI Instead:
- Regular daily usage (CLI is more efficient)
- Batch operations on multiple PRs
- Advanced Git operations beyond basic merging
- Automated scripting and CI/CD integration

## 🔗 Integration

### Bookmarklet (Advanced)
You can create a bookmarklet for even quicker access:

```javascript
javascript:(function(){window.open('path/to/your/index.html')})()
```

### Home Screen App (Mobile)
1. Open the HTML file in mobile browser
2. Use "Add to Home Screen" option
3. Access like a native app

## 📊 Comparison: Web vs CLI

| Feature | Web Interface | CLI Tool |
|---------|---------------|----------|
| Installation | None required | npm install |
| Mobile Support | ✅ Excellent | ❌ Limited |
| Ease of Use | ✅ Very easy | ✅ Easy |
| Speed | ✅ Fast | ✅ Very fast |
| Offline Usage | ⚠️ Partial | ✅ Full |
| Advanced Features | ❌ Basic | ✅ Full |
| Automation | ❌ No | ✅ Yes |

## 🤝 Contributing

To improve the web interface:

1. Edit `web/index.html` directly
2. Test across different browsers and devices
3. Ensure mobile responsiveness
4. Follow the existing code style
5. Submit pull requests with clear descriptions

---

*Access your GitHub PRs from anywhere, on any device! 🌍📱*
