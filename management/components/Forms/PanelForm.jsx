"use client";

import { UserValidation } from "@/lib/Validate";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import CustomField from "../CustomFormFields";
import { Icons } from "../constants/icons";
import SubmitBtn from "../SubmitBtn"

const PanelForm = () => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      adminName: "",
      email: "",
      devID: "",
    },
  });

  const onSubmit = () => {
    console.log("yep");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="my-12 space-y-4">
          <h1 className="header  ">Welcome... </h1>
          <p className="text-dark-700">Get started</p>
        </section>
        <CustomField
          fieldType="input"
          control={form.control}
          name="adminName"
          label="Admin Name"
          placeholder="Amanda Hudson"
          register={form.register}
          icon={Icons.IconUser}
        />
        <CustomField
          fieldType="input"
          control={form.control}
          name="email"
          label="Email Address"
          placeholder="amanda@gmail.com"
          register={form.register}
          icon={Icons.IconEmail}
        />
        <CustomField
          fieldType="input"
          control={form.control}
          name="devID"
          label="Development ID"
          placeholder="433_034C9A334"
          register={form.register}
          icon={Icons.IconDataBase}
        />
        <SubmitBtn>Proceed</SubmitBtn>
      </form>
    </Form>
  );
};

export default PanelForm;
