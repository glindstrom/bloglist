const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
  })
})
describe('add blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new blog title',
      author: 'blog author',
      url: 'http://localhost',
      likes: 666
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)

    const blogTitles = blogsAfterPost.map(blog => blog.title)

    expect(blogTitles).toContain('new blog title')
  })
  test('likes are set to zero if omitted', async () => {
    const newBlog = {
      title: 'new blog title',
      author: 'blog author',
      url: 'http://localhost'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
