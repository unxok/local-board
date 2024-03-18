import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ImportDataButton = () => {
  //
  //   const importFromFile = () => {
  //     const inp = document.createElement("input");
  //     const reader = new FileReader();
  //     inp.type = "file";

  //     inp.addEventListener("change", () => {
  //       const file = inp?.files?.[0];
  //       if (!file) {
  //         toast.error("Import save data failed! \nNo data was provided");
  //         return;
  //       }
  //       reader.readAsText(file);
  //     });

  //     reader.addEventListener("load", () => {
  //       if (!(typeof reader.result === "string")) {
  //         toast.error("Import save data failed!\nUnexpected file contents");
  //         return;
  //       }
  //       try {
  //         const json = JSON.parse(reader.result);
  //         Object.keys(json).forEach((k) => localStorage.setItem(k, json[k]));
  //         window.location.reload();
  //         return;
  //       } catch (e) {
  //         toast.error(
  //           "Import save data failed! \nCheck console for more information",
  //         );
  //         console.error(
  //           "Error occured when attempting to parse JSON from text provided. ",
  //           e,
  //         );
  //         return;
  //       }
  //     });

  //     inp.click();
  //   };

  const handleImportFromClipboard = () => {
    const text = window.prompt("Please paste your save data below");
    if (!text) {
      toast.error("Import save data failed! \nNo data was provided");
      return;
    }
    try {
      const json = JSON.parse(text);
      Object.keys(json).forEach((k) => localStorage.setItem(k, json[k]));
      window.location.reload();
      return;
    } catch (e) {
      toast.error(
        "Import save data failed! \nCheck console for more information",
      );
      console.error(
        "Error occured when attempting to parse JSON from text provided. ",
        e,
      );
      return;
    }
  };

  return (
    <>
      <Button onClick={handleImportFromClipboard}>Import Data</Button>
    </>
  );
};
