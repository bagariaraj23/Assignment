"use client";

import useUploadModal from "@/app/hooks/useUploadModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  IMAGES = 0,
  DESCRIPTION = 1,
}

const UploadModal = () => {
  const router = useRouter();
  const UploadModal = useUploadModal();

  const [step, setStep] = useState(STEPS.IMAGES);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      imagesSrc: [],
      adharImagesSrc: [],
      panImagesSrc: [],
      title: "",
      description: "",
    },
  });

  const imagesSrc = watch("imagesSrc");
  const adharImagesSrc = watch("adharImagesSrc");
  const panImagesSrc = watch("panImagesSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.IMAGES);
        UploadModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return undefined;
    }

    return "Back";
  }, [step]);

    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Adhaar" subtitle="Add Adhaar Card Papers" />
        <ImageUpload
          value={adharImagesSrc}
          onChange={(value) => setCustomValue("docImagesSrc", value)}
        />
        <hr />
        <Heading
          title="PAN"
          subtitle="Add PAN Card Papers"
        />
        <ImageUpload
          value={panImagesSrc}
          onChange={(value) => setCustomValue("panImagesSrc", value)}
        />
        <hr />
      </div>
    );
  
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Description"
          subtitle="Add description of yourself"
        />
        <Input
          id="title"
          label="Name"
          placeholder="John Doe"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          placeholder="Add details about yourself"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Heading
          title="Add some of your images"
        />
        <ImageUpload
          value={imagesSrc}
          onChange={(value) => setCustomValue("imagesSrc", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={UploadModal.isOpen}
      onClose={UploadModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.IMAGES ? undefined : onBack}
      title="Upload Details of yourself"
      body={bodyContent}
    />
  );
};

export default UploadModal;
