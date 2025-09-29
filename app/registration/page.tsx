import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full  rounded-2xl shadow-md">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fatherFullName">Father Full Name</Label>
          <Input
            id="fatherFullName"
            placeholder="Your Father Full Name"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input id="phoneNumber" type="number" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
      </form>
    </div>
  );
}
