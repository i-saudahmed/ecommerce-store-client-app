"use client";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

interface RatingProps {
  value: number;
  className?: string;
}

const HalfRating = ({ value, className }: RatingProps) => {
  return (
    <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
  );
};

export default HalfRating;
