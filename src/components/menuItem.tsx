import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip
} from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import { IPhasesInfo } from "../model/phases";

interface IMenuItem {
  phases: IPhasesInfo[];
  handleName: (e: any) => void;
  classes: any;
}

const MenuItemComponent: React.FC<IMenuItem> = (props: IMenuItem) => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      }
    }
  };
  const theme = useTheme();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhase(event.target.value as string[]);
    props.handleName(event.target.value as string[]);
  };
  const [phase, setPhase] = React.useState<string[]>([]);
  const getStyles = (name: string, personName: string[], theme: Theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  };
  return (
    <div>
      <FormControl className={props.classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Phases</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={phase}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={props.classes.chips}>
              {(selected as string[]).map(value => (
                <Chip
                  key={value}
                  label={value}
                  className={props.classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.phases.map((prop, key) => (
            <MenuItem
              key={prop.name}
              value={prop.name}
              style={getStyles(prop.name, phase, theme)}
            >
              {prop.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default MenuItemComponent;
