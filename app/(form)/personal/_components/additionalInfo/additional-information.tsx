import { Control, useWatch } from "react-hook-form";

import { CandidatePersonalInfoInput, disabilityTypeEnum } from "@/lib/types";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStates } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { documentTypeEnum } from "@/lib/types";

export function AdditionalInformation({
  control,
}: {
  control: Control<CandidatePersonalInfoInput>;
}) {
  const states = getStates();

  const haveDisability = useWatch({
    control,
    name: "haveDisability",
  });

  console.log(haveDisability);

  return (
    <>
      <FormField
        control={control}
        name="domicileOfState"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Domicile of State</FormLabel>
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Domicile of State" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="domicileCertificateIssuingAuthority"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>
              Domicile Certificate Issuing Authority
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="domicileCertificateNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Domicile Certificate Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="domicileCertificateIssueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Domicile Certificate Issue Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentToUpload"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Document To Upload</FormLabel>
            <Select
              defaultValue={field.value}
              value={field.value}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Document" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {documentTypeEnum.options.map((document) => (
                  <SelectItem key={document} value={document}>
                    {document}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* <FormField
        control={control}
        name="haveDisability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>&nbsp;</FormLabel>
            <FormControl>
              <div className="flex flex-row items-start space-x-3">
                <Checkbox
                  checked={field.value ?? false}
                  onCheckedChange={field.onChange}
                />
                <FormLabel>Do you have Disability?</FormLabel>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      <FormField
        control={control}
        name="haveDisability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Do you have Disability?</FormLabel>
            {/* convert string to boolean */}
            <Select onValueChange={(val) => field.onChange(val === "true")}>
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Disability Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {haveDisability && (
        <FormField
          control={control}
          name="disabilityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disability Type</FormLabel>
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Disability Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {disabilityTypeEnum.options.map((disability) => (
                    <SelectItem key={disability} value={disability}>
                      {disability}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="markOfVisibleIdentification"
        render={({ field }) => (
          <FormItem>
            <FormLabel requiredLable>Mark of Visible Identification</FormLabel>
            <FormControl>
              <Input
                placeholder="Any visible mark"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
