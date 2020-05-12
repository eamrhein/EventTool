let defaultFormState = {
  title: "",
  locationType: "",
  category: "Category",
  subcategory: "subcategory",
  organization: "",
  locations: [],
  type: "Type",
  summary: "",
  description: "",
  start: {
    date: new Date().toISOString(),
    time: "",
  },
  end: {
    date: new Date().toISOString(),
    time: "",
  },
  series: false,
  recurrence: {
    times: 1,
    occurs: "Daily",
  },
  tickets: [],
};


export { defaultFormState}