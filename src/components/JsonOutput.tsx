import { Textarea } from "@/components/ui/textarea";

type JsonOutputProps = {
  parsedJson: string;
  placeHolder: string;
};

const JsonOutput = ({ placeHolder, parsedJson = "" }: JsonOutputProps) => {
  return (
    <div className='w-full relative'>
      <Textarea
        className='min-h-[85vh] md:min-h-[80vh]'
        placeholder={placeHolder}
        value={parsedJson}
      />
    </div>
  );
};

export default JsonOutput;
