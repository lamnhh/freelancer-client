let emptyJob = {
  id: 0,
  name: "",
  description: "",
  cv_url: "",
  type: "",
  username: "",
  fullname: "",
  price_list: [{ price: 0, description: "" }]
};

let emptyJobEmptyPriceList = {
  id: 0,
  name: "",
  description: "",
  cv_url: "",
  type: "",
  username: "",
  fullname: "",
  price_list: []
};

export default emptyJob;
export { emptyJobEmptyPriceList };
