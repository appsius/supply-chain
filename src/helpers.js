const getData = async (dataURL, setData) => {
  await fetch(dataURL)
    .then((res) => res.json())
    .then(({ result }) => {
      return setData(result.items);
    })
    .catch((err) => console.log(err));
};

const createData = async (dataURL, setData, createURL, body) => {
  await fetch(createURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  getData(dataURL, setData);
};

const updateData = async (dataURL, setData, deleteURL) => {
  await fetch(deleteURL + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.state.singledata),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
  getData(dataURL, setData);
};

const deleteData = async (dataURL, setData, deleteURL) => {
  await fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then(() => {
      console.log('Deleted');
    });
  getData(dataURL, setData);
};

export { getData, createData, updateData, deleteData };
