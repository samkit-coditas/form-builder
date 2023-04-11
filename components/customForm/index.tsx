import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import styles from "./customForm.module.scss";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: any[];
}

interface FormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  schema: any;
}

const CustomForm: React.FC<FormProps> = ({ fields, onSubmit, schema }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "0",
      border: "1px solid #ced4da",
      "&:hover": {
        borderColor: "#80bdff",
        boxShadow: "none",
      },
    }),
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["custom-form-container"]}
    >
      {fields.map((formField, index) => (
        <Form.Group key={index} className={styles["form"]}>
          {formField.type !== "checkbox" && (
            <Form.Label>{formField.label}</Form.Label>
          )}
          <Controller
            name={formField.name}
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              switch (formField.type) {
                case "text":
                  return (
                    <Form.Control
                      className={styles["form-control"]}
                      type="text"
                      {...field}
                      // onBlur={() => trigger()}
                    />
                  );
                case "select":
                  return (
                    <Select
                      className={styles["react-select__control"]}
                      options={formField.options}
                      styles={customStyles}
                      {...field}
                    />
                  );
                case "checkbox":
                  return (
                    <Form.Check
                      className={styles["form-check"]}
                      type="checkbox"
                      label={formField.label}
                      {...field}
                    />
                  );
                case "button-group":
                  return (
                    <ButtonGroup className={styles["btn-group"]}>
                      {formField.options?.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => field.onChange(option.value)}
                          className={
                            option.value === field.value ? styles.active : ""
                          }
                        >
                          {option.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                  );
                case "textarea":
                  return (
                    <Form.Control
                      className={styles["form-control"]}
                      as="textarea"
                      rows={3}
                      {...field}
                    />
                  );
                default:
                  return <></>;
              }
            }}
          />
          {errors && errors[formField.name] && (
            <div className={styles.error}>
              {errors[formField.name]?.message as string}
            </div>
          )}
        </Form.Group>
      ))}
      <Button className={styles.button} type="submit" onClick={() => {}}>
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
