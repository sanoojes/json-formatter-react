import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction } from "react";

export type RawJsonInputProps = {
  jsonInput: string;
  setJsonInput: Dispatch<SetStateAction<string>>;
};

const RawJsonInput = ({ jsonInput, setJsonInput }: RawJsonInputProps) => {
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    e.stopPropagation();

    const json = e.target.value;
    setJsonInput(json);
  }

  return (
    <div className='w-full relative'>
      <Textarea
        className='min-h-[68vh] md:min-h-[80vh]'
        onChange={(e) => handleInputChange(e)}
        value={jsonInput}
        placeholder='Raw Json Goes Here...'
      />
    </div>
  );
};

export default RawJsonInput;
