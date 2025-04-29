"use Client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./LabelProps";
import { Input } from "./InputProps";
import axios from "axios";
import { Button } from "./ButtonProps";
import useApiStore from "@/Zustand/Store";
import { useToast } from "@/hooks/use-toast";

const DialogForm = () => {
  const { setHasUpdated } = useApiStore();
  const { toast } = useToast();

  const user = JSON.parse(localStorage?.getItem("accessData") || "{}");
  console.log("user localstorage ", user);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    mobileNumber: user.mobileNumber || "",
    email: user.email || "",
    userId: user.userId,
  });

  //   const userId = user.userId;
  //   console.log(userId);
  console.log(formData.userId, "state user id");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await axios.put(
        `http://localhost:8000/update/${formData.userId}`,
        formData
      );
      console.log("Form data send using put method ", response.data);
      if (response.status === 200) {
        console.log("data successfully updated ", response.data);
        localStorage.setItem("accessData", JSON.stringify(formData));
        setHasUpdated(false);
        toast({
          title: "Success",
          description: "Your data has been updated successfully",
        });
      } else {
        console.error("failed to update data", response.data);
        toast({
          title: "Error",
          description: "Failed to update data.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("error while sending data to backend", error);
      toast({
        title: "Error",
        description: "An error occurred while updating your data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center text-center mt-4">
      <Dialog>
        <DialogTrigger>
          <Button>Edit Data</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-xl font-bold">Update Data</h2>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={false}
                placeholder="Enter your First name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={false}
                placeholder="Enter your Last name"
              />
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                disabled={false}
                placeholder="Enter your Mobile Number"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                disabled={true}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogForm;
