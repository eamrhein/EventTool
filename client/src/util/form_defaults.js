import * as Yup from "yup";

const defaultFormState = {
  title: "",
  type: "",
  category: "",
  subcategory: "",
  organization: "",
  locationType: "Venue",
  locations: [],
  series: false,
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  times: 1,
  occurs: "Daily",
  summary: "",
  description: "",
  tickets: [],
};

const validationShape = {
  title: Yup.string()
    .min(2, "too short")
    .max(70, "Too Long")
    .required("event title is required"),
  category: Yup.string().required("category selection is required"),
  subcategory: Yup.string().required("subcategory selection is required"),
  type: Yup.string().required("event type is required"),
  times: Yup.number().min(1, "Event must occur at least once"),
  start_date: Yup.date().required("must select at least one date"),
  start_time: Yup.string().required("select a event start time"),
  end_time: Yup.string().required("select a event end time"),
  description: Yup.string().required("please add a description"),
  tickets: Yup.array().required("please add a ticket"),
};

export { defaultFormState, validationShape };
