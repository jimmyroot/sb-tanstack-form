import React, { type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useForm,
  type AnyFieldApi,
  type StandardSchemaV1Issue,
} from "@tanstack/react-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertCircleIcon, LoaderCircleIcon } from "lucide-react";
import { validateUserName } from "@/api/user";
import * as z from "zod/v4";

// const UsernameSchema = z
//   .string()
//   .min(3, "Username must be at least 3 characters!");

const ZodSchema = z
  .object({
    username: z
      .string()
      .min(3, { error: "Should have more than 3 chars", abort: true })
      .refine(
        async (value) => {
          return await validateUserName(value);
        },
        { message: "Username not available" }
      ),
    password: z
      .string()
      .min(8, {
        error: "Password should be at least 8 characters",
        abort: true,
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).+$/,
        {
          message:
            "Password should contain at least one uppercase, lowercase, number and special character",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  // console.log(field.state.meta);
  // console.log(field.state.meta.isTouched, !field.state.meta.isValid);
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <div className="text-sm text-red-500 mt-1">
          {field.state.meta.errors.map((err) => err.message).join("")}
        </div>
      ) : null}
    </>
  );
};

function SignUp() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: ZodSchema,
      // onChange: ({ value }) => console.log(value),
      // onSubmit: ({ value }) => {
      //   // console.log(value.password.length);
      //   if (value.password.length < 12) {
      //     console.log("validation check failed");
      //     return "There's an error of some sort.";
      //   }
      // },
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create a form with <span className="font-bold">jimmyr00t</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <form.Field
            name="username"
            // validators={{
            //   onChangeAsyncDebounceMs: 500,
            //   // onChangeAsync: ({ value }) => validateUserName(value),
            //   // onChange: UsernameSchema,
            // }}
            children={(field) => (
              <div>
                <Label className="m-1" htmlFor="username">
                  ß Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.getMeta().isValidating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <LoaderCircleIcon className="animate-spin" />
                    </div>
                  )}
                </div>
                <FieldInfo field={field} />

                {/* {field.state.meta.errors.length > 0 && (
                  <div className="text-sm text-red-500 mt-1">
                    {field.state.meta.errors.map((err) => {
                      if ()
                    }.join('')}
                  </div>
                )} */}
              </div>
            )}
          ></form.Field>
          <form.Field
            name="password"
            // validators={{
            //   onChangeAsyncDebounceMs: 500,
            //   onChangeAsync: ({ value }) => {
            //     if (value.length < 6)
            //       return "Password must be at least 6 characters in length";
            //     if (!/[A-Z]/.test(value))
            //       return "Password must contain at least one upper case letter";
            //     if (!/[a-z]/.test(value))
            //       return "Password must contain at least one lower case letter";
            //     if (!/[0-9]/.test(value))
            //       return "Password must contain at least one number";
            //   },
            // }}
            children={(field) => (
              <div>
                <Label className="m-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* {field.state.meta.errors && (
                  <div className="text-sm text-red-500 mt-1">
                    {field.state.meta.errors}
                  </div>
                )} */}
                <FieldInfo field={field} />
              </div>
            )}
          ></form.Field>
          <form.Field
            name="confirmPassword"
            // validators={{
            //   onChangeListenTo: ["password"],
            //   onChange: ({ value, fieldApi }) =>
            //     value != fieldApi.form.getFieldValue("password") &&
            //     "Passwords do not match",
            // }}
            children={(field) => (
              <div>
                <Label className="m-1" htmlFor="confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {/* {field.state.meta.errors && (
                  <div className="text-sm text-red-500 mt-1">
                    {field.state.meta.errors}
                  </div>
                )} */}
                <FieldInfo field={field} />
              </div>
            )}
          ></form.Field>
          {/* Whole form validation output */}
          {/* <form.Subscribe
            selector={(state) => state.errors}
            children={(errors) =>
              errors.length > 0 && (
                <Alert variant={"destructive"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors}</AlertDescription>
                </Alert>
              )
            }
          /> */}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            form.reset();
          }}
        >
          Reset
        </Button>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isValidating]}
          children={([canSubmit, isValidating]) => {
            return (
              <Button
                onClick={form.handleSubmit}
                disabled={!canSubmit || isValidating}
              >
                Sign Up
              </Button>
            );
          }}
        />
        {/* 
        >>> Old button with no auto-disable
        <Button onClick={form.handleSubmit}>Sign Up</Button>
        */}
      </CardFooter>
    </Card>
  );
}

export default SignUp;
