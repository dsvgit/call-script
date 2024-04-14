import { buttonVariants } from "@/components/ui/button.tsx";
import { useCallStore } from "@/store.ts";

export const UploadScriptButton = () => {
  const setScript = useCallStore((state) => state.setScript);

  return (
    <form>
      <label
        htmlFor="upload-script"
        className={buttonVariants({
          variant: "default",
          size: "sm",
          className: "ml-auto gap-1.5 text-sm cursor-pointer",
        })}
      >
        <span className="text-sm">Загрузить скрипт</span>
      </label>
      <input
        id="upload-script"
        type="file"
        className="opacity-0 absolute -z-10"
        accept=".drawio,.xml"
        onChange={async (event) => {
          const file = event.target.files?.item(0);
          if (file != null) {
            const content = await file?.text();
            setScript(content);
          }

          event.target.value = "";
        }}
      />
    </form>
  );
};
