import { test, expect} from "@playwright/test";

test('GET all posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const firstPost = posts[0];
    console.log(response); // print response 
    console.log('-------------');
    console.log(response.status()); // print status
    console.log('-------------');
    // console.log(posts); // print var 'posts' = print response in json
    console.log('-------------');
    expect(response.status()).toBe(200);
    expect(posts).toHaveLength(100);
    // expect(firstPost.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');

})

test('POST create new post', async ({ request }) => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1,        
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', { data: newPost });
    const createPost = await response.json();
    expect(response.status()).toBe(201);
    expect(createPost.title).toBe(newPost.title);
    expect(createPost.body).toBe(newPost.body);
    expect(createPost.userId).toBe(newPost.userId);
})

test('PUT update existed post', async ({ request }) => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1,        
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/5', { data: newPost });
    const updatedPost = await response.json();
    expect(response.status()).toBe(200);
    expect(updatedPost.title).toBe(newPost.title);
    expect(updatedPost.body).toBe(newPost.body);
    expect(updatedPost.userId).toBe(newPost.userId);
})

test('DELETE delete existed post', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/5');
    expect(response.status()).toBe(200);
})



