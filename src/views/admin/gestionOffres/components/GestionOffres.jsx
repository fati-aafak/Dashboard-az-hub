import React, { useState } from "react";
import Card from "components/card";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "constants/config";
import httpClient from "utils/httpClient";

// Dropdown component
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
  title: yup
    .string()
    .required("Title is required")
    .max(64, "Title must be at most 64 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(1024, "Description must be at most 1024 characters"),
  missions: yup
    .array()
    .of(yup.string())
    .min(1, "At least one mission is required"),
  location: yup.string().required("Location is required"),
  departement: yup.string().required("Departement is required"),
  contract: yup.string().required("Contract is required"),
  education: yup.string(),
  type: yup.string().required("Type is required"),
  Qualifications: yup
    .array()
    .of(yup.string())
    .min(1, "At least one qualification is required"),
});

const API_BASE_URL = BASE_URL;
const createOffre = async (formData) => {
  try {
    const response = await httpClient.post(`/offre`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const PageMag = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedDepartement, setSelectedDepartement] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      missions: [""],
      Qualifications: [""],
    },
  });

  const {
    fields: missionFields,
    append: appendMission,
    remove: removeMission,
  } = useFieldArray({
    control,
    name: "missions",
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control,
    name: "Qualifications",
  });

  const departements = [
    { value: "Développement web", label: "Développement Web et Mobile" },
    { value: "Communication", label: "Communication" },
    { value: "Bureau d'étude", label: "Bureau d'étude" },
    { value: "Centre Commercial", label: "Centre Commercial" },
    { value: "Support fonctionnel", label: "Support fonctionnel" },
  ];

  const contrats = [
    { value: "CDI", label: "CDI" },
    { value: "CDD", label: "CDD" },
    { value: "Stage", label: "Stage" },
    { value: "Alternance", label: "Alternance" },
    { value: "Freelance", label: "Freelance" },
  ];

  const types = [
    { value: "Temps plein", label: "Temps plein" },
    { value: "Temps partiel", label: "Temps partiel" },
    { value: "Freelance", label: "Freelance" },
    { value: "Stage", label: "Stage" },
    { value: "Alternance", label: "Alternance" },
  ];

  const onSubmit = async (data) => {
    try {
      // Filter out any empty mission and qualification fields
      data.missions = data.missions.filter((mission) => mission.trim() !== "");
      data.Qualifications = data.Qualifications.filter(
        (qualification) => qualification.trim() !== ""
      );

      const response = await createOffre(data);
      console.log("Offre created:", response);
      setSubmitStatus({ type: "success", message: "Offre créée avec succès!" });
      reset();
      setSelectedDepartement("");
      setSelectedContract("");
      setSelectedType("");
    } catch (error) {
      console.error("Error creating Offre:", error);
      setSubmitStatus({
        type: "error",
        message: error.error || "Erreur lors de la création de l'offre.",
      });
    }
  };

  return (
    <Card extra="w-[70rem] p-4">
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Offres Management
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
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            {...register("title")}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mt-8">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            {...register("location")}
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <label
            htmlFor="education"
            className="block text-sm font-medium text-gray-700"
          >
            Education
          </label>
          <input
            type="text"
            id="education"
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
            {...register("education")}
          />
          {errors.education && (
            <p className="mt-1 text-xs text-red-500">
              {errors.education.message}
            </p>
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
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
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
            htmlFor="missions"
            className="block text-sm font-medium text-gray-700"
          >
            Missions
          </label>
          {missionFields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-2">
              <input
                type="text"
                {...register(`missions.${index}`)}
                className="block w-full mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                placeholder="Enter a mission"
              />
              <button
                type="button"
                onClick={() => removeMission(index)}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendMission("")}
            className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Ajouter Mission
          </button>
          {errors.missions && (
            <p className="mt-1 text-xs text-red-500">
              {errors.missions.message}
            </p>
          )}
        </div>
        {/* Qualifications section */}
        <div className="mt-4">
          <label
            htmlFor="Qualifications"
            className="block text-sm font-medium text-gray-700"
          >
            Qualifications
          </label>
          {qualificationFields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-2">
              <input
                type="text"
                {...register(`Qualifications.${index}`)}
                className="block w-full mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                placeholder="Enter a qualification"
              />
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendQualification("")}
            className="px-4 py-2 mt-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Ajouter Qualification
          </button>
          {errors.Qualifications && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Qualifications.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="departement"
            className="block text-sm font-medium text-gray-700"
          >
            Departement
          </label>
          <Dropdown
            button={
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-md"
              >
                {selectedDepartement
                  ? departements.find(
                      (cat) => cat.value === selectedDepartement
                    ).label
                  : "Sélectionnez le département"}
              </button>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            classNames="top-full mt-2 w-full bg-white border rounded-md shadow-lg"
          >
            <div className="py-1">
              {departements.map((departement) => (
                <button
                  key={departement.value}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelectedDepartement(departement.value);
                    setValue("departement", departement.value);
                  }}
                >
                  {departement.label}
                </button>
              ))}
            </div>
          </Dropdown>
          {errors.departement && (
            <p className="mt-1 text-xs text-red-500">
              {errors.departement.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="contract"
            className="block text-sm font-medium text-gray-700"
          >
            Type de Contrat
          </label>
          <Dropdown
            button={
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-md"
              >
                {selectedContract
                  ? contrats.find((cat) => cat.value === selectedContract).label
                  : "Sélectionnez un type de contrat"}
              </button>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            classNames="top-full mt-2 w-full bg-white border rounded-md shadow-lg"
          >
            <div className="py-1">
              {contrats.map((contrat) => (
                <button
                  key={contrat.value}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelectedContract(contrat.value);
                    setValue("contract", contrat.value);
                  }}
                >
                  {contrat.label}
                </button>
              ))}
            </div>
          </Dropdown>
          {errors.contract && (
            <p className="mt-1 text-xs text-red-500">
              {errors.contract.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type de travail
          </label>
          <Dropdown
            button={
              <button
                type="button"
                className="w-full px-4 py-2 text-left border rounded-md"
              >
                {selectedType
                  ? types.find((cat) => cat.value === selectedType).label
                  : "Sélectionnez le type de travail"}
              </button>
            }
            animation="origin-top-right transition-all duration-300 ease-in-out"
            classNames="top-full mt-2 w-full bg-white border rounded-md shadow-lg"
          >
            <div className="py-1">
              {types.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setSelectedType(type.value);
                    setValue("type", type.value);
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </Dropdown>
          {errors.type && (
            <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
          )}
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="rounded bg-[#f06739] px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PageMag;
