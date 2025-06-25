"use client";

import { SwitchProps, useSwitch } from "@heroui/switch";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useState } from "react";

import type { loader } from "app/root";
import { MoonFilledIcon, SunFilledIcon } from "components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const data = useRouteLoaderData<typeof loader>("root");
  const fetcher = useFetcher();

  // Initialize state based on the server-rendered theme, if available.
  const [theme, setTheme] = useState(data?.theme);

  // After the component mounts, sync the state with the actual class on the
  // <html> element, which is the ultimate source of truth, set by our script.
  useEffect(() => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(currentTheme);
  }, []);

  const onChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    // Optimistically update the DOM for instant feedback
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);

    fetcher.submit(
      { theme: newTheme },
      { method: "post", action: "/action/set-theme" },
    );
  };

  const {
    Component,
    slots,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light",
    "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {theme === "light" ? (
          <SunFilledIcon size={22} />
        ) : (
          <MoonFilledIcon size={22} />
        )}
      </div>
    </Component>
  );
};
