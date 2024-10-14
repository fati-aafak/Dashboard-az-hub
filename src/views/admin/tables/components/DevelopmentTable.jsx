import React, { useState } from "react";
import Card from "components/card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { BASE_URL } from "constants/config";
import httpClient from "utils/httpClient";

// Ajout du composant Dropdown
function useOutsideAlerter(ref, setX) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = (props) => {
  const { button, children, classNames, animation } = props;
  const wrapperRef = React.useRef(null);
  const [openWrapper, setOpenWrapper] = React.useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  eventDate: yup.date().required("Event date is required"),
  category: yup.string().required("Category is required"),
});

const API_BASE_URL = BASE_URL;
const createActualite = async (formData) => {
  try {
    const response = await httpClient.post(`/actualite`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const PageMag = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const categories = [
    { value: "actualite", label: "Actualité" },
    { value: "evenement", label: "Évènement" },
  ];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", selectedCategory);
      formData.append("image", data.image);
      formData.append("eventDate", data.eventDate.toISOString());

      const response = await createActualite(formData);
      console.log("Actualite created:", response);
      setSubmitStatus({
        type: "success",
        message: "Actualité créée avec succès!",
      });
      reset();
      setImagePreview("");
      setEventDate(null);
      setSelectedCategory("");
    } catch (error) {
      console.error("Error creating actualite:", error);
      setSubmitStatus({
        type: "error",
        message: "Erreur lors de la création de l'actualité.",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleEventDateChange = (date) => {
    setEventDate(date);
    setValue("eventDate", date);
  };

  return (
    <Card extra="w-[70rem] p-4">
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Acutalité Management
        </div>
      </div>
      {submitStatus && (
        <div
          className={`mt-4 rounded p-2 ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-700"
          >
            Event Date
          </label>
          <DatePicker
            selected={eventDate}
            onChange={handleEventDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            dateFormat="MMMM d, yyyy"
          />
          {errors.eventDate && (
            <p className="mt-1 text-xs text-red-500">
              {errors.eventDate.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Dropdown
            button={
              <button
                type="button"
                className="w-full rounded-md border px-4 py-2 text-left"
              >
                {selectedCategory
                  ? categories.find((cat) => cat.value === selectedCategory)
                      .label
                  : "Select a category"}
              </button>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            classNames="top-full mt-2 w-full bg-white border rounded-md shadow-lg"
          >
            <div className="py-1">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setValue("category", category.value);
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Dropdown>
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-gray-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-full rounded-md shadow-sm"
            />
          )}
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="rounded bg-[#662483] px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PageMag;
