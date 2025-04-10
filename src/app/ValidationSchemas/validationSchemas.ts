import * as Yup from "yup";

export const GEORGIAN_LATIN_REGEX = /^[a-zA-Z\u10A0-\u10FF\s']+$/;

export const nameValidation = Yup.string()
  .min(2, "მინიმუმ 2 სიმბოლო")
  .max(255, "მაქსიმუმ 255 სიმბოლო")
  .matches(GEORGIAN_LATIN_REGEX, "მხოლოდ ქართული და ლათინური სიმბოლოები");
