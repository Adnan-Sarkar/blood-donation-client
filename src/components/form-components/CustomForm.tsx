"use client";

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, unknown>;
};

type TCustomFormProps = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFormConfig;

const CustomForm = ({ children, onSubmit, defaultValues, resolver }: TCustomFormProps) => {
  const methods = useForm({ resolver, defaultValues });

  const submitHandler: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
    </Form>
  );
};

export default CustomForm;
