import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");

  const handleChange = (name: string, event: any) => {
    if (name === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else if (name === "name") {
      const newName = event.currentTarget.value;
      setName(newName);
      dispatch(updateFilter({ name: newName }));
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            m="sm"
            radius="lg"
            className="align"
            variant="outline"
            autoContrast
            color="brightSun.4"
          >
            {opened ? "Close" : "Filters"}
          </Button>
        )}

        <Collapse in={opened || !matches}>
          <div className="px-5 py-8 flex flex-wrap gap-4 items-center !text-mine-shaft-100">
            {/* Talent Name Search */}
            <div className="flex items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xs-mx:w-full">
              <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2">
                <IconUserCircle size={20} />
              </div>
              <Input
                value={name}
                onChange={(e) => handleChange("name", e)}
                className="[&_input]:!placeholder-mine-shaft-300"
                variant="unstyled"
                placeholder="Talent Name"
              />
            </div>

            {/* Dynamic Filters */}
            {searchFields.map((item, index) => (
              <div
                key={index}
                className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full flex items-center"
              >
                <MultiInput {...item} />
                <Divider
                  className="hidden sm:block ml-2"
                  size="xs"
                  orientation="vertical"
                />
              </div>
            ))}

            {/* Experience Range */}
            <div className="w-1/5 xs-mx:w-full sm:w-1/2 md:w-1/3 lg:w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
              <div className="flex text-sm justify-between mb-2">
                <span>Experience (Years)</span>
                <span>
                  {value[0]} Years - {value[1]} Years
                </span>
              </div>
              <RangeSlider
                size="xs"
                color="brightSun.4"
                value={value}
                onChange={setValue}
                minRange={1}
                min={0}
                max={50}
                onChangeEnd={(val) => handleChange("exp", val)}
                labelTransitionProps={{
                  transition: "skew-down",
                  duration: 150,
                  timingFunction: "linear",
                }}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default SearchBar;
