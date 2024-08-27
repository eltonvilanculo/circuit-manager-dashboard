import AppSwitch from "../AppSwitch";

type Props = {};

export default function SwitchField({}: Props) {
  return (
    <div className="flex flex-col w-full gap-2">
      <AppSwitch />
      <AppSwitch />
      <AppSwitch />
    </div>
  );
}
