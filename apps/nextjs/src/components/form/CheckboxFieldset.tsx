interface CheckboxFieldsetProps {
  label: string;
  checked: boolean;
  onChangeValue: (value: boolean) => void;
}

export default function CheckboxFieldset({
  label,
  checked,
  onChangeValue,
}: CheckboxFieldsetProps) {
  return (
    <fieldset className="fieldset w-[clamp(3rem,20rem,100%)]">
      <label className="label h-10 text-sm text-current">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={checked}
          onChange={(event) => {
            onChangeValue(event.currentTarget.checked);
          }}
        />
        {label}
      </label>
    </fieldset>
  );
}
