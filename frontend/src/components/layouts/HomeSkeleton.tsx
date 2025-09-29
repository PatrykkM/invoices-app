"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <InvoiceFormSkeleton />
      <InvoicePreviewSkeleton />
    </div>
  );
}

function InvoiceFormSkeleton({ itemRows = 2 }: { itemRows?: number }) {
  return (
    <div className="flex flex-1 flex-col gap-10 border-r border-base200 p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-80" />
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          <div className="flex w-full max-w-[360px] flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex w-full max-w-[360px] flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex w-full max-w-[290px] flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex w-full max-w-[290px] flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl bg-base50 px-6 pt-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24 flex-[2]" />
            <Skeleton className="h-4 w-10 flex-1" />
            <Skeleton className="h-4 w-16 flex-1" />
            <Skeleton className="h-4 w-[90px]" />
          </div>

          {Array.from({ length: itemRows }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-9 flex-[2] border border-base300" />
              <Skeleton className="h-9 flex-1 border border-base300" />
              <Skeleton className="h-9 flex-1 border border-base300" />
              <Skeleton className="h-9 w-[90px]" />
            </div>
          ))}

          <div className="flex flex-col items-center gap-2 pb-4 pt-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-9 w-44" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvoicePreviewSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-24" />
      </div>

      <div className="rounded-xl border p-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="mb-2 grid grid-cols-3 gap-3">
          <Skeleton className="h-4 w-24" />
        </div>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="grid grid-cols-3 items-center gap-3 py-2">
            <Skeleton className="h-4 w-56" />
          </div>
        ))}

        <div className="mt-4 flex justify-end gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}
