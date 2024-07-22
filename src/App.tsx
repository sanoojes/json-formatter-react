import JsonOutput from "@/components/JsonOutput";
import RawJsonInput from "@/components/RawJsonInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const { toast } = useToast();

  const [jsonInput, setJsonInput] = useState<string>("");
  const [parsedJson, setParsedJson] = useState<string | null>("");
  const [parsedJsonString, setParsedJsonString] = useState<string>("");
  const [isFormated, setIsFormatted] = useState<boolean>(false);
  const [isFormattingError, setIsFormattingError] = useState(false);
  const [formattingErrorMessage, setFormattingErrorMessage] = useState<
    string | null
  >(null);

  /* Parsing Customizations Need to implement them*/
  const indentationLevel = 4;

  function handleError(error: unknown) {
    setIsFormattingError(true);
    setIsFormatted(false);
    if (error instanceof SyntaxError) {
      setFormattingErrorMessage(`Syntax Error: ${error.message}`);
    } else {
      setFormattingErrorMessage(
        `Error: ${
          error instanceof Error ? error.message : "An unknown error occurred."
        }`
      );
    }

    toast({
      title: "Invalid JSON",
      description:
        "The input is not valid JSON. Please check for errors and try again.",
      variant: "destructive",
    });
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(jsonInput);
      setIsFormatted(true);
      setParsedJson(parsed);
      setParsedJsonString(JSON.stringify(parsed, null, indentationLevel));

      toast({
        title: "JSON Formated!",
        description: "The data has been successfully formated.",
        variant: "default",
      });

      setIsFormattingError(false);
      setFormattingErrorMessage(null);
    } catch (error) {
      handleError(error);
    }
  }

  function handleCopyFormated() {
    if (!isFormated) handleFormat();

    if (!isFormattingError) {
      navigator.clipboard
        .writeText(parsedJsonString)
        .then(() => {
          toast({
            title: "JSON Copied!",
            description:
              "The data has been successfully copied to your clipboard.",
            variant: "default",
          });
        })
        .catch((err) => {
          console.error("Clipboard copy error:", err);
          toast({
            title: "Oops, Couldn't Copy!",
            description:
              "Something went wrong while copying to the clipboard. Please try again.",
            variant: "destructive",
          });
        });
    }
  }

  function getOutputPlaceholder(): string {
    return isFormattingError
      ? formattingErrorMessage || "Formatting Error"
      : "Formatted JSON Goes Here...";
  }

  function handleReset() {
    if (confirm("Do you want to reset.")) {
      setJsonInput("");
      setParsedJson(null);
      setIsFormattingError(false);
      setFormattingErrorMessage(null);
    }
  }

  return (
    <main className='px-6 py-3'>
      <section className='w-full h-full space-y-3'>
        <div className='bg-card flex px-6 py-3 border border-border rounded-lg justify-center'>
          <h1 className='text-2xl font-bold'>Json Formatter</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <RawJsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />
          <div className='flex flex-col flex-1 gap-2 w-full'>
            <Button onClick={handleFormat}>Format Json</Button>
            <Button onClick={handleCopyFormated}>Copy Formated Json</Button>
            <Button variant={"default"} onClick={handleReset}>
              Reset
            </Button>
          </div>
          <JsonOutput
            parsedJson={
              isFormated
                ? JSON.stringify(parsedJson, null, indentationLevel)
                : ""
            }
            placeHolder={getOutputPlaceholder()}
          />
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default App;

