import { Divider, Input, RangeSlider } from "@mantine/core";
import React, { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 50]);
  const [name, setName] = useState("");

  const handleChange = (name: string, event: any) => {
    if (name === "exp") {
      // Experience slider
      dispatch(updateFilter({ exp: event }));
    } else if (name === "name") {
      // Text input
      const newName = event.currentTarget.value;
      setName(newName);
      dispatch(updateFilter({ name: newName })); // ✅ wrap in object
    }
  };

  return (
    <div className="px-5 py-8 flex items-center !text-mine-shaft-100">
      {/* Talent Name Search */}
      <div className="flex items-center mr-4">
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
        <React.Fragment key={index}>
          <div className="w-1/5">
            <MultiInput {...item} />
          </div>
          <Divider size="xs" mr="xs" orientation="vertical" />
        </React.Fragment>
      ))}

      {/* Experience Range */}
      <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
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
          max={50} // slider ends at 50 years
          onChangeEnd={(val) => handleChange("exp", val)}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
