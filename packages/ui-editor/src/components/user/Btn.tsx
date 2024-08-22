'use client';
import { useNode } from '@craftjs/core';
import { MButton, MButtonProps } from '@matsugov/ui';

export type ButtonProps = {
  // size?: ButtonOwnProps['size'];
  // variant?: ButtonOwnProps['variant'];
  color?: MButtonProps['color'];
  children: React.ReactNode;
};

export const Btn = ({
  // size,
  // variant = 'contained',
  color,
  children,
}: ButtonProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <MButton
      ref={(ref) => (ref ? connect(drag(ref)) : undefined)}
      color={color}
    >
      {children}
    </MButton>
  );
};

// const BtnSettings = () => {
//   const {
//     actions: { setProp },
//     props,
//   } = useNode<{ props: ButtonProps }>((node) => ({
//     props: node.data.props as ButtonProps,
//   }));

//   const editSize: RadioGroupProps['onChange'] = (e) => {
//     setProp((props: ButtonProps) => (props.size = e.target.value as ButtonProps['size']));
//   };

//   const editVariant: RadioGroupProps['onChange'] = (e) => {
//     setProp((props: ButtonProps) => (props.variant = e.target.value as ButtonProps['variant']));
//   };

//   const editColor: RadioGroupProps['onChange'] = (e) => {
//     setProp((props: ButtonProps) => (props.color = e.target.value as ButtonProps['color']));
//   };

//   return (
//     <div>
//       <FormControl size="small" component="fieldset">
//         <FormLabel component="legend">Size</FormLabel>
//         <RadioGroup defaultValue={props.size} onChange={editSize}>
//           <FormControlLabel
//             label="Small"
//             value="small"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Medium"
//             value="medium"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Large"
//             value="large"
//             control={<Radio size="small" color="primary" />}
//           />
//         </RadioGroup>
//       </FormControl>
//       <FormControl size="small" component="fieldset">
//         <FormLabel component="legend">Variant</FormLabel>
//         <RadioGroup defaultValue={props.variant} onChange={editVariant}>
//           <FormControlLabel
//             label="Text"
//             value="text"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Outlined"
//             value="outlined"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Contained"
//             value="contained"
//             control={<Radio size="small" color="primary" />}
//           />
//         </RadioGroup>
//       </FormControl>
//       <FormControl size="small" component="fieldset">
//         <FormLabel component="legend">Color</FormLabel>
//         <RadioGroup defaultValue={props.variant} onChange={editColor}>
//           <FormControlLabel
//             label="Default"
//             value="default"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Primary"
//             value="primary"
//             control={<Radio size="small" color="primary" />}
//           />
//           <FormControlLabel
//             label="Secondary"
//             value="secondary"
//             control={<Radio size="small" color="primary" />}
//           />
//         </RadioGroup>
//       </FormControl>
//     </div>
//   );
// };

Btn.craft = {
  props: {
    size: 'small',
    variant: 'contained',
    color: 'primary',
    text: 'Click me',
  },
  // related: {
  //   settings: BtnSettings,
  // },
};
