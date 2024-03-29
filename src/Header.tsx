import { Button, buttonVariants } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export const HeaderComponent = () => {
  return (
    <header className="sticky z-10 top-0 border-b bg-background">
      <div className="container mx-auto flex items-center justify-between h-16 gap-4">
        <div className="overflow-hidden">
          <h1 className="text-2xl tracking-tight truncate">
            Прием на работу в продажи
          </h1>
        </div>
        <div className="flex gap-3 flex-1">
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
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5 text-sm"
              >
                ...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="https://app.diagrams.net/?lang=ru" target="_blank">
                  Создать скрипт
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
