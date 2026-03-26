### What makes a good commit message?

- A concise but informative description that conveys what was achieved or done in that iteration/update.

### How does a clear commit message help in team collaboration?

- Others can easily tell what was contributed or done within a commit without having to spent time delving through the code/file itself, or spending time going through and understanding elaborate commit descriptions.

### How can poor commit messages cause issues later?

- They can lead to inefficiencies such as other developers having to read through updates manually to validate function or relevance if the commit itself doesn't provide enough info. It can also make it hard to tell where a particular change was made within the history of a project if it needs to be reverted.

 ### What does git bisect do?
- Git bisect helps to narrow down the source of errors or bugs in commit history in a procedural manner. The latest commit with the error is assigned a 'bad' tag, while earliest tag known to be 'good' is After the source is discovered and verified, it is removed from the commit history.

### When would you use it in a real-world debugging situation?

- When I'm unable to pinpoint the source of errors in a file, or the file itself is completely unusable. It'd also be of much use in repositories where multiple people work on the same branch with frequent commits.

### How does it compare to manually reviewing commits?

- It can save a lot of time looking for the source, especially in projects with larger commit histories. However, it does not actually delete the error-causing commit, so the commit responsible and the offending change should be noted before exiting the bisected commit tree.
