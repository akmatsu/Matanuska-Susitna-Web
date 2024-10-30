export type MdEditorProps = {
  /** String of markdown text */
  initialValue?: string;

  /** Called whenever the markdown content changes */
  onChange?: (value: string | null) => void;
};
