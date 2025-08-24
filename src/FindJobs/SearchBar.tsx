import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdownData } from "../Data/JobsData";
import MultiInput from "./MultiInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery('(max-width: 475px)');
   const [opened, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 300]);

  const handleChange = (range: [number, number]) => {
    dispatch(updateFilter({ salary: range }));
  };

  return (
  <div className="flex justify-end">
{matches && <Button onClick={toggle} m="sm" radius="lg" className="align" 
variant="outline" autoContrast color="brightSun.4">{opened?"Close":"Filters"}
</Button>}
  
    <Collapse in={(opened || !matches)}>
        
    <div className="flex px-5 lg-mx:!flex-wrap py-8 items-center !text-mine-shaft-100">
      {dropdownData.map((item, index) => (
        <>
          <div key={index} className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%]">
            <MultiInput {...item} />
          </div>
          <Divider className="sm-mx:hidden" size="xs" mr="xs" orientation="vertical" />
        </>
      ))}
      <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] [&_.mantine-Slider-label]:!translate-y-10">
        <div className="flex text-sm justify-between">
          <div>Salary</div>
          <div>
            &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
          </div>
        </div>
        <RangeSlider
          size="xs"
          color="brightSun.4"
          value={value}
          min={0}
          max={300}
          onChangeEnd={handleChange}
          labelTransitionProps={{
            transition: "skew-down",
            duration: 150,
            timingFunction: "linear",
          }}
          onChange={setValue}
        />
      </div>
    </div>
    
    
      </Collapse>
      </div>
  );
};

export default SearchBar;
