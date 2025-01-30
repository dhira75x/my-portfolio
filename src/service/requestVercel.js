const token = import.meta.env.VERCEL_TOKEN;

fetch("https://my-portfolio-two-xi-26.vercel.app/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
