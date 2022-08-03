export default function fetchData(url, setData) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    });
}
