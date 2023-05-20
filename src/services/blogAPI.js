import { json } from 'react-router-dom';

export default class BlogAPI {
  url = 'https://blog.kata.academy/api';

  registerUser = async (user) => {
    const body = JSON.stringify({ user: user });

    try {
      const path = this.url + '/users';
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: body,
      });
      return response;
    } catch (err) {
      throw new Error('Ошибка регистрации');
    }
  };

  loginUser = async (user) => {
    const body = JSON.stringify({ user: user });
    try {
      const path = this.url + '/users/login';
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: body,
      });
      return response;
    } catch (err) {
      throw new Error('Ошибка авторизации');
    }
  };

  getArticles = async (limit = 5, offset = 0) => {
    try {
      const path = this.url + '/articles?' + new URLSearchParams({ limit, offset });
      const response = await fetch(path);
      if (!response.ok) throw new Error();

      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('Ошибка получения постов');
    }
  };

  getArticle = async (slug) => {
    try {
      const path = this.url + `/articles/${slug}`;
      const response = await fetch(path);
      if (!response.ok) throw new Error();

      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('Ошибка получения постов');
    }
  };
}

export const blogAPI = new BlogAPI();
