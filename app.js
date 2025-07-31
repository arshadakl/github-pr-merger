import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import 'dotenv/config';
import inquirer from 'inquirer';

if (!process.env.GITHUB_TOKEN) {
  console.error(chalk.red('Error: GITHUB_TOKEN is not set in your .env file'));
  process.exit(1);
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getUserInfo() {
  try {
    const { data } = await octokit.users.getAuthenticated();
    console.log(chalk.green(`Authenticated as ${chalk.bold(data.login)}`));
    return data.login;
  } catch (error) {
    console.error(chalk.red('Authentication Error:'), error.message);
    process.exit(1);
  }
}

async function hasRepositoryAccess(repo) {
  // First check if permissions are directly available
  if (repo.permissions && (repo.permissions.push || repo.permissions.admin)) {
    return true;
  }
  
  // Fallback: Try to verify access by attempting API calls
  try {
    await octokit.repos.get({
      owner: repo.owner.login,
      repo: repo.name
    });
    
    // Try to list collaborators - this requires push access
    await octokit.repos.listCollaborators({
      owner: repo.owner.login,
      repo: repo.name,
      per_page: 1
    });
    
    return true;
  } catch {
    // If any API call fails, we don't have sufficient access
    return false;
  }
}

async function filterAccessibleRepositories(repositories) {
  const accessibleRepos = [];
  
  console.log(chalk.blue('Filtering repositories with sufficient permissions...'));
  
  for (const repo of repositories) {
    const hasAccess = await hasRepositoryAccess(repo);
    
    if (hasAccess) {
      accessibleRepos.push({
        name: `${repo.full_name} (${repo.private ? 'Private' : 'Public'})`,
        value: {
          owner: repo.owner.login,
          repo: repo.name,
          full_name: repo.full_name
        }
      });
    } else {
      console.log(chalk.dim(`Skipping ${repo.full_name} - insufficient permissions`));
    }
  }
  
  return accessibleRepos;
}

async function listRepositories() {
  try {
    console.log(chalk.blue('Fetching repositories...'));
    
    const { data } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 100,
      visibility: 'private'  // Only fetch private repositories
    });
    
    if (data.length === 0) {
      console.log(chalk.yellow('No private repositories found.'));
      process.exit(0);
    }
    
    console.log(chalk.blue(`Found ${data.length} private repositories.`));
    
    const accessibleRepos = await filterAccessibleRepositories(data);
    
    if (accessibleRepos.length === 0) {
      console.log(chalk.yellow('No private repositories found with sufficient permissions (push/admin access required).'));
      process.exit(0);
    }
    
    console.log(chalk.green(`Found ${accessibleRepos.length} accessible private repositories out of ${data.length} total private repositories.`));
    
    return accessibleRepos;
  } catch (error) {
    console.error(chalk.red('Error fetching repositories:'), error.message);
    process.exit(1);
  }
}

async function getLatestPR(owner, repo) {
  try {
    console.log(chalk.blue(`Fetching latest PR for ${owner}/${repo}...`));
    
    const { data } = await octokit.pulls.list({
      owner,
      repo,
      state: 'open',
      sort: 'updated',
      direction: 'desc',
      per_page: 1
    });
    
    if (data.length === 0) {
      console.log(chalk.yellow('No open pull requests found for this repository.'));
      return null;
    }
    
    return data[0];
  } catch (error) {
    console.error(chalk.red('Error fetching pull requests:'), error.message);
    return null;
  }
}

async function mergePR(owner, repo, pull_number, title) {
  try {
    console.log(chalk.blue(`Merging PR #${pull_number}: ${title}...`));
    
    const { data } = await octokit.pulls.merge({
      owner,
      repo,
      pull_number,
      merge_method: 'merge'
    });
    
    console.log(chalk.green('Pull request successfully merged!'));
    console.log(chalk.green(`SHA: ${data.sha}`));
    return true;
  } catch (error) {
    console.error(chalk.red('Error merging pull request:'), error.message);
    
    // Provide more specific error guidance
    if (error.message.includes('Resource not accessible by personal access token')) {
      console.log(chalk.yellow('\nPossible solutions:'));
      console.log(chalk.yellow('1. Check that your GitHub token has "repo" scope permissions'));
      console.log(chalk.yellow('2. Verify you have write/admin access to this repository'));
      console.log(chalk.yellow('3. Check if branch protection rules are blocking the merge'));
      console.log(chalk.yellow('4. Ensure the PR meets all repository requirements (reviews, status checks, etc.)'));
    } else if (error.message.includes('Pull request is not mergeable')) {
      console.log(chalk.yellow('\nThe pull request cannot be merged:'));
      console.log(chalk.yellow('- There might be merge conflicts'));
      console.log(chalk.yellow('- Required status checks may be failing'));
      console.log(chalk.yellow('- Required reviews may be missing'));
    }
    
    return false;
  }
}

async function checkMergePermissions(owner, repo) {
  try {
    // Check if we can access repository details and permissions
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    
    if (!repoData.permissions || (!repoData.permissions.push && !repoData.permissions.admin)) {
      console.log(chalk.yellow('Warning: Limited repository permissions detected'));
      console.log(chalk.yellow('You may not be able to merge pull requests in this repository'));
      return false;
    }
    
    return true;
  } catch (error) {
    console.log(chalk.yellow('Warning: Unable to verify merge permissions'));
    console.log(chalk.dim(`Reason: ${error.message}`));
    return false;
  }
}

async function main() {
  try {
    // Verify authentication
    await getUserInfo();
    
    // Get list of repositories
    const repositories = await listRepositories();
    
    // Ask user to select a repository
    const { selectedRepo } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedRepo',
        message: 'Select a repository:',
        choices: repositories,
        pageSize: 15
      }
    ]);
    
    // Get latest PR for the selected repository
    const latestPR = await getLatestPR(selectedRepo.owner, selectedRepo.repo);
    
    if (!latestPR) {
      return;
    }
    
    // Check merge permissions before proceeding
    await checkMergePermissions(selectedRepo.owner, selectedRepo.repo);
    
    // Display PR details
    console.log(chalk.cyan('\nLatest Pull Request:'));
    console.log(chalk.cyan('Title: ') + latestPR.title);
    console.log(chalk.cyan('Number: ') + `#${latestPR.number}`);
    console.log(chalk.cyan('Created by: ') + latestPR.user.login);
    console.log(chalk.cyan('URL: ') + latestPR.html_url);
    console.log(chalk.cyan('Created at: ') + new Date(latestPR.created_at).toLocaleString());
    console.log(chalk.cyan('Updated at: ') + new Date(latestPR.updated_at).toLocaleString());
    
    // Ask for confirmation to merge
    const { confirmMerge } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmMerge',
        message: `Do you want to merge PR #${latestPR.number} into ${latestPR.base.ref}?`,
        default: false
      }
    ]);
    
    if (confirmMerge) {
      // Check merge permissions before attempting to merge
      const hasMergePermissions = await checkMergePermissions(selectedRepo.owner, selectedRepo.repo);
      
      if (hasMergePermissions) {
        // Merge the PR
        await mergePR(
          selectedRepo.owner,
          selectedRepo.repo,
          latestPR.number,
          latestPR.title
        );
      } else {
        console.log(chalk.yellow('Insufficient permissions to merge this pull request'));
      }
    } else {
      console.log(chalk.yellow('Merge cancelled.'));
    }
  } catch (error) {
    console.error(chalk.red('An unexpected error occurred:'), error.message);
  }
}

main();