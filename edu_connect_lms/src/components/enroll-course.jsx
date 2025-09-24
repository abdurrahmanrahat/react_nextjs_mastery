"use client";

import { cn } from "@/lib/utils";
import { createCheckoutSession } from "@/services/actions/stripe";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";

export const EnrolledCourse = ({ course, asLink }) => {
  const formAction = async (data) => {
    // call server action from here
    const { url } = await createCheckoutSession(data);

    window.location.assign(url);
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="courseId" value={course?.id} />
      {/* <input type="hidden" name="courseName" value={course?.title} />
      <input type="hidden" name="coursePrice" value={course?.price} /> */}
      {/* it's unusual, user can change the price from inspect */}

      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1"
        >
          Enroll
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button href="" className={cn(buttonVariants({ size: "lg" }))}>
          Enroll Now
        </Button>
      )}
    </form>
  );
};
