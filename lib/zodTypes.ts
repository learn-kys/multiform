import * as z from "zod";

// Name fields with common validation
export const createNameField = (
  fieldName: string,
  options: {
    minLength?: number;
    maxLength?: number;
    optional?: boolean;
  } = {},
) => {
  const { minLength = 3, maxLength = 20, optional = false } = options;

  let schema = z.string().trim();

  if (!optional) {
    schema = schema
      .min(1, { message: `${fieldName} is required` })
      .min(minLength, { message: `${fieldName} is too short` });
  } else {
    // For optional fields, only validate if not empty
    schema = schema.refine((val) => val === "" || val.length >= minLength, {
      message: `${fieldName} is too short`,
    });
  }

  schema = schema
    .max(maxLength, { message: `${fieldName} is too long` })
    .regex(/^[A-Za-z ]*$/, { message: `${fieldName} can only contain letters` })
    .toUpperCase();

  if (optional) {
    return schema.transform((val) => (val === "" ? null : val)).nullable();
  }

  return schema;
};

export const dateOfBirthField = z
  .string()
  .min(1, { error: "Date of birth is required" })
  .refine((val) => !isNaN(Date.parse(val)), {
    error: "Invalid date format",
  })
  .refine((val) => new Date(val) <= new Date(), {
    error: "Date of birth cannot be in the future",
  });

export const passwordField = (minLength = 8) =>
  z
    .string()
    .min(1, { error: "Password is required" })
    .min(minLength, {
      error: `Password must be at least ${minLength} characters`,
    });

export const emailField = z
  .email({ error: "Invalid email address" })
  .trim()
  .toLowerCase();

// Indian phone number validation
export const indianPhoneField = z
  .string()
  .trim()
  .min(1, { error: "Phone number is required" })
  .regex(/^[6-9]\d{9}$/, { error: "Invalid phone number" });

export const genderEnum = z.enum(["Male", "Female", "Prefer Not to Say"], {
  error: "Invalid gender",
});
export const nationalityEnum = z.enum(["Indian", "Other"], {
  error: "Invalid selection",
});
export const maritalStatusEnum = z.enum(["Married", "Unmarried"], {
  error: "Invalid selection",
});

// Basic personal info
export const basicPersonalInfo = {
  firstName: createNameField("First name"),
  middleName: createNameField("Middle name", { optional: true }),
  lastName: createNameField("Last name"),
  fatherFullName: createNameField("Father's name"),
  dateOfBirth: dateOfBirthField,
};

// Extended personal info
export const extendedPersonalInfo = {
  ...basicPersonalInfo,
  motherFullName: createNameField("Mother's name"),
  gender: genderEnum,
  maritalStatus: maritalStatusEnum,
  nationality: nationalityEnum,
};
