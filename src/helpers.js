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
    .then(() => console.log('Inserted'));
  getData(dataURL, setData);
};

const updateData = async (dataURL, setData, updateURL, body) => {
  await fetch(updateURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .then(() => {
      console.log('Updated');
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
