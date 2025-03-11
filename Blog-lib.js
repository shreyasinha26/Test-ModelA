let blogArray = [];
let nextId = 1;  // Unique ID generator for each job

// Reset state function to clear jobArray and reset nextId
function resetState() {
  nextId = 1;  // Reset the job ID counter
  blogArray.length = 0;  // Clear the job array
  console.log("State reset. blogArray:", blogArray);
}

  
    // Add a new blog post
    addPost(title, authorName, authorEmail, content, tags) {
      const postId = this.posts.length + 1; // Simple auto-incremented ID based on the length of the posts
      const datePublished = new Date().toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
      const post = {
        id: postId,
        title: title,
        author: {
          name: authorName,
          email: authorEmail,
        },
        content: content,
        datePublished: datePublished,
        likes: 0, // Default likes to 0
        comments: [],
        tags: tags,
        updatedAt: datePublished, // Set initial updatedAt to the same as datePublished
      };
      this.posts.push(post);
      console.log(`Post '${title}' by ${authorName} added successfully!`);
    }
  
    // Get a specific blog post by ID
    getPost(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        return post;
      } else {
        return `Post with ID ${postId} not found.`;
      }
    }
  
    // Update an existing blog post
    updatePost(postId, title = null, content = null, tags = null) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        if (title) post.title = title;
        if (content) post.content = content;
        if (tags) post.tags = tags;
        post.updatedAt = new Date().toISOString().split('T')[0]; // Update the update timestamp
        console.log(`Post ${postId} updated successfully!`);
      } else {
        console.log(`Post with ID ${postId} not found.`);
      }
    }
  
    // Delete a blog post
    deletePost(postId) {
      const postIndex = this.posts.findIndex((p) => p.id === postId);
      if (postIndex !== -1) {
        this.posts.splice(postIndex, 1);
        console.log(`Post ${postId} deleted successfully!`);
      } else {
        console.log(`Post with ID ${postId} not found.`);
      }
    }
  
    // List all blog posts
    listPosts() {
      if (this.posts.length === 0) {
        return 'No posts available.';
      }
      return this.posts;
    }
  
    // Add a comment to a specific blog post
    addComment(postId, user, message) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        const comment = {
          user: user,
          message: message,
          date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
        };
        post.comments.push(comment);
        console.log(`Comment added to post ${postId}!`);
      } else {
        console.log(`Post with ID ${postId} not found.`);
      }
    }
  
    // Like a specific blog post
    likePost(postId) {
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        post.likes += 1;
        console.log(`Post ${postId} liked!`);
      } else {
        console.log(`Post with ID ${postId} not found.`);
      }
    }
  }
  
  // Example usage:
  
  // Initialize the blog management system
  const blogManager = new BlogManagement();
  
  // Add some posts with the new structure
  blogManager.addPost(
    'Understanding JavaScript Closures',
    'Jane Doe',
    'jane@example.com',
    'A closure is a function that has access to its own scope, the scope in which it was created, and the global scope.',
    ['JavaScript', 'Closures', 'Functions']
  );
  
  blogManager.addPost(
    'Intro to Python',
    'John Smith',
    'john@example.com',
    'Python is an easy-to-learn programming language with a large standard library.',
    ['Python', 'Programming', 'Tutorial']
  );
  
  // List all posts
  console.log(blogManager.listPosts());
  
  // Get a specific post
  console.log(blogManager.getPost(1));
  
  // Update a post (change the content)
  blogManager.updatePost(1, null, 'Updated content for JavaScript closures post.');
  
  // Add a comment to a post
  blogManager.addComment(1, 'John Doe', 'Great post! Very informative.');
  
  // Like a post
  blogManager.likePost(1);
  
  // List all posts again to see the updates
  console.log(blogManager.listPosts());
  
  // Delete a post
  blogManager.deletePost(2);
  
  // List all posts after deletion
  console.log(blogManager.listPosts());
  
  module.exports = {  addPost,
    getPost,
    updatePost,
    deletePost,
    resetState,
    blogArray };