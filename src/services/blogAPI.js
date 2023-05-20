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

  removeArticle = async (slug, token) => {
    try {
      const path = this.url + `/articles/${slug}`;
      const auth = 'Bearer ' + token;
      const response = await fetch(path, {
        method: 'DELETE',
        headers: { Authorization: auth },
      });
      if (!response.ok) throw new Error();

      const json = await response.json();
      return json;
    } catch (err) {
      throw new Error('Ошибка удаления');
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

  putUserProfile = async (token, user) => {
    const body = JSON.stringify({ user: user });
    console.log(body);

    try {
      const path = this.url + '/user';
      const auth = 'Bearer ' + token;
      const response = await fetch(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: auth },
        body: body,
      });

      return response;
    } catch (err) {
      throw new Error('Ошибка обновления профиля');
    }
  };

  createArticle = async (article, token) => {
    const body = JSON.stringify({ article: article });

    try {
      const path = this.url + '/articles';
      const auth = 'Bearer ' + token;
      const response = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: auth },
        body: body,
      });

      return response;
    } catch (err) {
      throw new Error('Ошибка создания поста');
    }
  };
}

export const blogAPI = new BlogAPI();
