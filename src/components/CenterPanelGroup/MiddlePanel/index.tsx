import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UNNAMED_BOARD } from "@/consts";
import { BoardSchema, useBoard } from "@/stores/BoardStore";
import { ReactNode, useEffect, useState } from "react";
import { BoardForm, DraggablePopover } from "../LeftPanel";
import { usePosition } from "@/components/Draggable";
import { toast } from "sonner";

export const MiddlePanel = () => {
  const { boards } = useBoard();
  useEffect(() => console.log("boards changed: ", boards), [boards]);

  return (
    <ResizablePanel className="relative">
      <ScrollArea className="flex h-full w-full flex-col items-center justify-center">
        {boards
          ? boards.map((b) => (
              <Menu title={b.title || UNNAMED_BOARD} key={b.id} boardData={b}>
                <Card className="flex flex-col border-none shadow-none">
                  <CardHeader>
                    <CardTitle>{b.title || UNNAMED_BOARD}</CardTitle>
                    <CardDescription>{b.description || ""}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {false ? (
                      ""
                    ) : (
                      <div className="flex items-center justify-center p-5 text-muted-foreground">
                        No lanes yet... right click to add one!
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex w-full flex-col gap-5">
                    <p className="w-full whitespace-pre-wrap">{b.notes}</p>
                    <div className="flex w-full items-center justify-center">
                      <Separator className="w-5/6" />
                    </div>
                  </CardFooter>
                </Card>
              </Menu>
            ))
          : "No boards yet... start with a template? (coming soon lol)"}
      </ScrollArea>
    </ResizablePanel>
  );
};

const Menu = ({
  children,
  title,
  boardData,
}: {
  children: ReactNode;
  title: string;
  className?: string;
  boardData: BoardSchema;
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { setBoards, saveBoardsLocally } = useBoard();
  const { position } = usePosition();
  const handleCancel = () => {
    setBoards((prev) => {
      if (!prev) {
        toast.error("Application Error");
        console.error(
          "Boards stored state was undefined during an edit dialog. How did this happen???",
        );
        return prev;
      }
      return prev.filter((b) => b.id !== boardData.id);
    });
    saveBoardsLocally();
  };
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled className="font-semibold tracking-wide">
            {title}
          </ContextMenuItem>
          <ContextMenuItem>Add Lane</ContextMenuItem>
          <ContextMenuItem>Theme</ContextMenuItem>
          <ContextMenuItem onClick={() => setPopoverOpen((b) => !b)}>
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() =>
              setBoards((prev) => {
                const copyPrev = prev ? [...prev] : undefined;
                const id = boardData.id;
                // console.log("attempting delete on: ", id);
                const arr = copyPrev?.filter((b) => b.id !== id);
                saveBoardsLocally(arr);
                return arr;
              })
            }
          >
            Archive
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DraggablePopover
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
        position={position}
        // TODO fix this. It works but is sketch because I may have dragging of boards later which would break this
        handleCancel={handleCancel}
      >
        <BoardForm defaultData={boardData} />
      </DraggablePopover>
    </>
  );
};
