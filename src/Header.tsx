import { buttonVariants } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { UploadScriptButton } from "@/components/UploadScriptButton.tsx";

export const HeaderComponent = () => {
  return (
    <header className="sticky z-10 top-0 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between h-16 gap-4">
        <div className="overflow-hidden">
          <h1 className="text-2xl tracking-tight truncate">
            Прием на работу в продажи
          </h1>
        </div>
        <div className="flex gap-3 flex-1 justify-end">
          <UploadScriptButton />
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-sm",
              })}
            >
              Другие действия...
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="https://app.diagrams.net/?lang=ru" target="_blank">
                  Создать скрипт
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a
                  href="https://drive.google.com/drive/folders/1SCmnfjPMHsaVob5kD1ahDuUZKbHKc0Ww?usp=sharing"
                  target="_blank"
                >
                  Хранилище скриптов
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
