import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import "@/app/components/forms/input-text/input-text.css";

export default function InputOptions(props: {
  hint: string;
  options: string[]; // Opciones para el Dropdown
  id: string;
  handleInput: any[];
  value?: string;
}) {
    const [selectedOption, setSelectedOption] = useState<string | unknown>(
        props.value || ""
      );

  useEffect(() => {
    if (props.value != null) {
      setSelectedOption(props.value);
    }
  }, [props.value]);

  const handleOptionSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedOption(event.target.value as string);
    props.handleInput[0](
      event.target.value as string,
      props.handleInput[1],
      props.handleInput[2]
    );
  };

  return (
    <FormControl>
      <InputLabel>{props.hint}</InputLabel>
      <Select
        label={props.hint}
        id={props.id}
        value={selectedOption}
        onChange={handleOptionSelect}
      >
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}