const BlogManager = require('./Blog-lib'); // Adjust the path to where your BlogManager class is located

describe('BlogManager Tests', () => {
  let blogManager;

  beforeEach(() => {
    blogManager = new BlogManager(); // Create a new BlogManager instance before each test
  });

  test('should add a post successfully', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function that has access to its own scope, the scope in which it was created, and the global scope.',
      ['JavaScript', 'Closures', 'Functions']
    );
    const posts = blogManager.listPosts();
    expect(posts.length).toBe(1);
    expect(posts[0].title).toBe('Understanding JavaScript Closures');
  });

  test('should not add a post with missing required fields', () => {
    expect(() => {
      blogManager.addPost(
        '', // Missing title
        'Jane Doe',
        'jane@example.com',
        'Content without a title.',
        ['JavaScript']
      );
    }).toThrow('Title is required');
  });

  test('should handle duplicate posts correctly', () => {
    blogManager.addPost(
      'Understanding JavaScript Closures',
      'Jane Doe',
      'jane@example.com',
      'A closure is a function that has access to its own scope, the scope in which it was created, and the global scope.',
      ['JavaScript', 'Closures', 'Functions']
    );
    blogManager.addPost(
      'Understanding JavaScript Closures', // Same title as the first one
      'Jane Doe',
      'jane@example.com',
      'Duplicate post content.',
      ['JavaScript', 'Closures']
    );
    const posts = blogManager.listPosts();
    expect(posts.length).toBe(2); // Allow duplicates for now, but you could add logic to prevent it.
  });

  test('should get a specific post by ID', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    const post = blogManager.getPost(1); // Get post by ID
    expect(post.title).toBe('Intro to Python');
    expect(post.author.name).toBe('John Smith');
  });

  test('should return an error if post ID does not exist', () => {
    const result = blogManager.getPost(99); // Non-existent post ID
    expect(result).toBe('Post with ID 99 not found.');
  });

  test('should update a post correctly', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    blogManager.updatePost(1, 'Updated Python Post', 'Updated content.', ['Python', 'Tutorial']);
    const updatedPost = blogManager.getPost(1);
    expect(updatedPost.title).toBe('Updated Python Post');
    expect(updatedPost.content).toBe('Updated content.');
  });

  test('should not update a post with invalid ID', () => {
    expect(() => {
      blogManager.updatePost(99, 'Invalid Post', 'Invalid content.');
    }).toThrow('Post with ID 99 not found.');
  });

  test('should delete a post successfully', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    blogManager.deletePost(1);
    const posts = blogManager.listPosts();
    expect(posts.length).toBe(0);
  });

  test('should not delete a post with invalid ID', () => {
    expect(() => {
      blogManager.deletePost(99);
    }).toThrow('Post with ID 99 not found.');
  });

  test('should add a comment to a post', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    blogManager.addComment(1, 'Alice', 'Great post!');
    const post = blogManager.getPost(1);
    expect(post.comments.length).toBe(1);
    expect(post.comments[0].message).toBe('Great post!');
  });

  test('should not add a comment to a non-existent post', () => {
    expect(() => {
      blogManager.addComment(99, 'Alice', 'Great post!');
    }).toThrow('Post with ID 99 not found.');
  });

  test('should like a post successfully', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    blogManager.likePost(1);
    const post = blogManager.getPost(1);
    expect(post.likes).toBe(1);
  });

  test('should not like a non-existent post', () => {
    expect(() => {
      blogManager.likePost(99);
    }).toThrow('Post with ID 99 not found.');
  });

  test('should reset the state correctly', () => {
    blogManager.addPost(
      'Intro to Python',
      'John Smith',
      'john@example.com',
      'Python is an easy-to-learn programming language.',
      ['Python', 'Programming']
    );
    blogManager.resetState();
    const posts = blogManager.listPosts();
    expect(posts.length).toBe(0);
  });

  test('should handle missing fields when adding a post', () => {
    expect(() => {
      blogManager.addPost('', 'Jane', '', 'Content missing title and email.', []);
    }).toThrow('Title is required');
  });
});

