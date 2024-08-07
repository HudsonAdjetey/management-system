import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { managementUserValidation } from "@/lib/Validate";
import { Form, FormControl } from "../ui/form";
import CustomField from "../CustomFormFields";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import listings from "../constants/data.js";
import UploadFile from "@/components/RegisterForm/UploadFIle";
import SubmitBtn from "../SubmitBtn";
import { registerFormKeys } from "@/components/constants/index";
import { snackFn } from "@/components/snackbar/index";
import {
  acceptFile,
  convertFileToUrl,
  ErrorFunc,
  getFileSizeInMb,
  readFileAsBase64,
} from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/dataFetch";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterForm = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const search = searchParams.get("userID");

  const toastConfig = snackFn;
  const [dateSelect, setDateSelect] = useState(new Date());
  const [image, setImage] = useState("");
  const [errorWatch, setErrorWatch] = useState(false);
  const form = useForm({
    resolver: zodResolver(managementUserValidation),
    defaultValues: {
      ...registerFormKeys,
    },
  });

  const organizationType = useWatch({
    control: form.control,
    name: "organizationTypes",
  });
  const managementSize = useWatch({
    control: form.control,
    name: "managementSize",
  });
  const organizationPrivatePublic = useWatch({
    control: form.control,
    name: "organizationPrivatePublic",
  });
  const organizationSize = useWatch({
    control: form.control,
    name: "organizationSize",
  });
  const educationLevel = useWatch({
    control: form.control,
    name: "educationLevel",
  });
  const userRole = useWatch({
    control: form.control,
    name: "userRole",
  });
  let organizationLogo = useWatch({
    control: form.control,
    name: "organizationLogo",
  });
  const password = useWatch({
    control: form.control,
    name: "password",
  });
  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
  });
  useEffect(() => {
    const hasErrors = Object.keys(form.formState.errors).length > 0;
    if (hasErrors) {
      setErrorWatch(true);
    } else {
      setErrorWatch(false);
    }
  }, [form]);

  const useMutateUpload = useMutation({
    queryKey: ["register, organization"],
    mutationFn: async (values) => {
      return await api.post("user/delete-temp/user-create", values);
    },
    // enabled when errorwatch is falsy
    // enabled: !errorWatch,
  });

  const submit = async (values) => {
    // if there is error Watch
    if (confirmPassword !== password) {
      errorMap.validationError;
      return;
    }

    if (password === "") {
      errorMap.requiredFields;
      return;
    }
    // get errors obje
    const errorMap = ErrorFunc(toast, toastConfig);
    const formValues = form.getValues();
    const fileI = convertFileToUrl(organizationLogo[0]);
    const splitImg = fileI.split("blob:")[1];
    const insertImage = splitImg;
    console.log("insertImage", insertImage);
    // check for the file type and size
    try {
      console.log("formValues", formValues);
      const organization = {
        organizationTypes: values.organizationTypes,
        organizationName: values.organizationName,
        organizationEmail: values.organizationEmail,
        organizationPhoneNumber: values.organizationPhoneNumber,
        organizationAddress: values.organizationAddress,
        educationlevel: values.educationLevel,
        churchLevel: values.churchLevel,
        salesAndMarketing: values.salesAndMarketing,
        userRole: userRole,
        managementSize: values.managementSize,
        password: password,
        confirmPassword: confirmPassword,
        organizationPrivatePublic: values.organizationPrivatePublic,
        organizationLogo: organizationLogo ? insertImage : undefined,
        establishmentDate: values.establishmentDate,
        username: formValues.username,
        userAddress: values.userAddress,
        phoneNumber: values.phoneNumber,
        organizationSize: values.organizationSize,
        organizationDescription: values.organizationDescription,
        email: formValues.email,
        devID: "66a76100d16c4336df15927f",
      };

      // call mutation function
      console.log("organization", organization);
      const result = await useMutateUpload.mutateAsync(organization);
      toast(
        toastConfig(
          "Form submitted successfully",
          "Your registration has been submitted successfully.",
          "",
          "success"
        )
      );
      console.log("result", result);
      // router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast(toastConfig("Submission error", error.message, "", "error"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <section className="my-12 space-y-4">
          <h1 className="header">Welcome... </h1>
          <p className="text-dark-700">
            Please fill out the form below to register as a new management user.
          </p>
        </section>
        <div>
          <h1 className="space-y-4 my-7">Basic Information</h1>
          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Select Organization Type"
            label="Select Organization Type"
            name="organizationTypes"
          >
            {listings?.organizations?.map((org) => (
              <SelectItem
                disabled={org.type !== "Education"}
                key={org.id}
                value={org.type}
              >
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={org.image}
                    width={32}
                    height={32}
                    alt={org.type}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{org.type}</p>
                </div>
              </SelectItem>
            ))}
          </CustomField>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="organizationName"
              label="Organization Name"
              control={form.control}
              register={form.register}
              placeholder="Horizon Media"
            />
            <CustomField
              fieldType="input"
              type="email"
              name="organizationEmail"
              label="Organization Email Address"
              control={form.control}
              register={form.register}
              placeholder="horizon@org.com"
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="organizationAddress"
              label="Organization Address"
              control={form.control}
              register={form.register}
              placeholder="Accra, Spintex"
            />
            <CustomField
              fieldType="phoneInput"
              name="organizationPhoneNumber"
              label="Organization Contact"
              control={form.control}
              register={form.register}
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="select"
              name="managementSize"
              placeholder="Management Size"
              label="Management Size"
              control={form.control}
              register={form.register}
            >
              <SelectItem value="5 - 20">5 - 20</SelectItem>
              <SelectItem value="50 - 100">50 - 100</SelectItem>
              <SelectItem value="200 - 500">200 - 500</SelectItem>
              <SelectItem value="1000 - 2000">1000 - 2000</SelectItem>
            </CustomField>

            {organizationType === "Education" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Education Level"
                label="Select Education Level"
                name="educationLevel"
              >
                {listings?.EducationLevels?.map((edu) => (
                  <SelectItem key={edu.id} value={edu.level}>
                    <p>{edu.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : organizationType === "Church" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Church Level"
                label="Select Church Level"
                name="churchLevel"
              >
                {listings?.churchLevels?.map((edu) => (
                  <SelectItem key={edu.id} value={edu.level}>
                    <p>{edu.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : organizationType === "Healthcare" ? (
              <CustomField
                fieldType="select"
                control={form.control}
                register={form.register}
                placeholder="Select Health Care Level"
                label="Select Health Care Level"
                name="healthCareLevel"
              >
                {listings?.hospitalLevels?.map((health) => (
                  <SelectItem key={health.id} value={health.level}>
                    <p>{health.level}</p>
                  </SelectItem>
                ))}
              </CustomField>
            ) : (
              organizationType === "Sales and Marketing" && (
                <CustomField
                  fieldType="select"
                  control={form.control}
                  register={form.register}
                  placeholder="Select Health Care Level"
                  label="Select Health Care Level"
                  name="salesAndMarketing"
                >
                  {listings?.hospitalLevels?.map((health) => (
                    <SelectItem key={health.id} value={health.level}>
                      <p>{health.level}</p>
                    </SelectItem>
                  ))}
                </CustomField>
              )
            )}
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="username"
              label="Username"
              control={form.control}
              register={form.register}
              placeholder="Hannah Baah"
            />
            <CustomField
              fieldType="select"
              control={form.control}
              register={form.register}
              placeholder="Select user role"
              label="User Role"
              name="userRole"
            >
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager" disabled>
                Manager
              </SelectItem>
              <SelectItem value="Developer" disabled>
                Developer
              </SelectItem>
              <SelectItem value="User" disabled>
                User
              </SelectItem>
            </CustomField>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="email"
              label="Email Address"
              control={form.control}
              register={form.register}
              placeholder="user@gmail.com"
              type="email"
            />
            <CustomField
              fieldType="phoneInput"
              control={form.control}
              register={form.register}
              placeholder="Select user role"
              label="Contact"
              name="phoneNumber"
            />
          </div>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="input"
              name="password"
              label="Password"
              control={form.control}
              register={form.register}
              placeholder="Enter Password"
              type="password"
            />
            <CustomField
              fieldType="input"
              name="confirmPassword"
              label="Confirm password"
              control={form.control}
              register={form.register}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
        </div>

        <div>
          <h1 className="space-y-4 my-7">Specific Information</h1>
          <CustomField
            fieldType="select"
            control={form.control}
            register={form.register}
            placeholder="Organization Status type"
            label="State Of Organization"
            name="organizationPrivatePublic"
          >
            <SelectItem value="Private">Private</SelectItem>
            <SelectItem value="Public">Public</SelectItem>
            <SelectItem value="NGO">NGO</SelectItem>
          </CustomField>

          <div className="flex flex-col xl:flex-row gap-6">
            <CustomField
              fieldType="datePicker"
              name="establishmentDate"
              label="Establishment Date"
              control={form.control}
              register={form.register}
              placeholder="Establishment Date"
            />
            <CustomField
              fieldType="select"
              name="organizationSize"
              label="Organization Size"
              control={form.control}
              register={form.register}
              placeholder="Organization Size"
            >
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Large">Large</SelectItem>
              <SelectItem value="Extra Large">Extra Large</SelectItem>
            </CustomField>
          </div>

          <CustomField
            fieldType="textarea"
            control={form.control}
            register={form.register}
            label="Describe your organization/institution"
            name="organizationDescription"
            type="text"
          />
        </div>

        <CustomField
          fieldType="skeleton"
          name="organizationLogo"
          label="Organization Logo"
          control={form.control}
          renderSkeleton={(field) => {
            return (
              <FormControl>
                <UploadFile files={field.value} onChange={field.onChange} />
              </FormControl>
            );
          }}
        />

        <SubmitBtn>Submit</SubmitBtn>
      </form>
    </Form>
  );
};

export default RegisterForm;
