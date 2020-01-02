let emptyJob = {
  id: 0,
  name: "",
  description: "",
  cv_url: "",
  type: "",
  username: "",
  fullname: "",
  user_bio: "",
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
  user_bio: "",
  price_list: []
};

export default emptyJob;
export { emptyJobEmptyPriceList };
