"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components1/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const BreadCrumb = () => {
  const pathname = usePathname();
  //   console.log(pathname);   // /Men/123
  // This line splits the URL path into segments and removes empty strings
  // For example: "/Men/123" becomes ["Men", "123"]
  const paths = pathname.split("/").filter((path) => path !== "");
  console.log(paths); // create array of paths

  const formatPath = (path: string) => {
    // Check if path is a MongoDB ObjectId (24 character hex string)
    if (path.match(/^[0-9a-fA-F]{24}$/)) {
      return "Product Details";
    }
    return path;
  };

  return (
    <div className="px-[10%] pb-2  sticky z-50 top-16 bg-white">
      {/* This creates a breadcrumb navigation component */}
      <Breadcrumb>
        <BreadcrumbList>
          {/* First item is always the Home link */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <FontAwesomeIcon icon={faHouse} />
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Map through each path segment from the URL path */}
          {/* For example, if URL is /Men/123, paths will be ["Men", "123"] */}
          {paths.map((path, index) => {
            // For each path segment, build its full URL path
            // Example: For /Men/123
            // When index=0: paths.slice(0,1) = ["Men"] -> href = "/Men"
            // When index=1: paths.slice(0,2) = ["Men","123"] -> href = "/Men/123"
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            console.log(href);

            // Check if this is the last segment in the path
            const isLast = index === paths.length - 1;

            return (
              // Use Fragment to group separator and item
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {/* If last item, show as current page (not clickable) */}
                  {/* Otherwise, show as clickable link */}
                  {isLast ? (
                    <BreadcrumbPage>{formatPath(path)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {formatPath(path)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
