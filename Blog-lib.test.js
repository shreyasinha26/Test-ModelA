const{
  addPost,
  getPost,
  updatePost,
  deletePost,
  resetState,
  blogArray

}= require('./Blog-lib'); // Import the BlogManagement class


beforeEach(() => {
  resetState();
});

  // Test for adding a post
  test('should add a post with correct data', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function that has access to its own scope, the scope in which it was created, and the global scope.',
      ['JavaScript', 'Closures', 'Functions']
    );

    const posts = blogManager.listPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Understanding JavaScript Closures');
    expect(posts[0].author.name).toBe('Jane Doe');
    expect(posts[0].likes).toBe(0);
    expect(posts[0].comments).toEqual([]);
    expect(posts[0].tags).toEqual(['JavaScript', 'Closures', 'Functions']);
  });

  // Edge case: Add a post with missing required fields
  test('should not add a post with missing required fields', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      '',
      'jane@example.com',
      'A closure is a function that has access to its own scope, the scope in which it was created, and the global scope.',
      ['JavaScript', 'Closures', 'Functions']
    );

    const posts = blogManager.listPosts();
    expect(posts).toHaveLength(0); // Ensure no post was added due to missing author
  });

  // Test for duplicate post ID (this won't happen with our current auto-ID mechanism, but it's still important to check if we add duplicate titles or authors)
  test('should handle duplicate post titles correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'John Smith',
      'john@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );

    const posts = blogManager.listPosts();
    expect(posts).toHaveLength(2); // Ensure both posts are added
  });

  // Test for updating a post
  test('should update a post correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );

    const postId = 1;
    blogManager.updatePost(postId, 'Updated title', 'Updated content', ['Updated', 'JavaScript']);

    const updatedPost = blogManager.getPost(postId);
    expect(updatedPost.title).toBe('Updated title');
    expect(updatedPost.content).toBe('Updated content');
    expect(updatedPost.tags).toEqual(['Updated', 'JavaScript']);
  });

  // Edge case: Try updating a non-existing post
  test('should handle updating a non-existing post gracefully', () => {
    const result = blogManager.updatePost(999, 'New title', 'New content', ['New', 'Tags']);
    expect(result).toBeUndefined(); // As the post with ID 999 doesn't exist
  });

  // Test for deleting a post
  test('should delete a post correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );

    const postId = 1;
    blogManager.deletePost(postId);
    const posts = blogManager.listPosts();
    expect(posts).toHaveLength(0); // Ensure the post was deleted
  });

  // Edge case: Try deleting a non-existing post
  test('should handle deleting a non-existing post gracefully', () => {
    const result = blogManager.deletePost(999); // Post with ID 999 doesn't exist
    expect(result).toBeUndefined(); // Expect undefined or some appropriate error handling
  });

  // Test for adding a comment to a post
  test('should add a comment to a post correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );

    const postId = 1;
    blogManager.addComment(postId, 'John Doe', 'Great post!');
    const post = blogManager.getPost(postId);
    expect(post.comments).toHaveLength(1);
    expect(post.comments[0].message).toBe('Great post!');
  });

  // Edge case: Add a comment to a non-existing post
  test('should handle adding a comment to a non-existing post gracefully', () => {
    const result = blogManager.addComment(999, 'John Doe', 'Great post!');
    expect(result).toBeUndefined(); // As post with ID 999 does not exist
  });

  // Test for liking a post
  test('should like a post correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function...',
      ['JavaScript', 'Closures']
    );

    const postId = 1;
    blogManager.likePost(postId);
    const post = blogManager.getPost(postId);
    expect(post.likes).toBe(1); // Ensure likes count is incremented correctly
  });

  // Edge case: Like a non-existing post
  test('should handle liking a non-existing post gracefully', () => {
    const result = blogManager.likePost(999); // Post with ID 999 does not exist
    expect(result).toBeUndefined(); // Expect undefined or some appropriate error handling
  });
});
