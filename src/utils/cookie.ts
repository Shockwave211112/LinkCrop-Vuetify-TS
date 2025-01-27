export const setCookie = (name: string, value: string, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((row) => row.startsWith(name + '='));
  return cookie ? cookie.split('=')[1] : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};
