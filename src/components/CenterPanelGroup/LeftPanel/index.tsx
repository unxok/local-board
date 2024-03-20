import { Draggable, usePosition } from "@/components/Draggable";
import { ResizablePanelSpacer } from "@/components/ResizablePanelSpacer";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BoardSchema, boardSchema, useBoard } from "@/stores/BoardStore";
import { DndContext } from "@dnd-kit/core";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PopoverClose } from "@radix-ui/react-popover";

export const LeftPanel = () => {
  const { handleDragEnd, position } = usePosition();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { setBoards } = useBoard();

  return (
    <ResizablePanel defaultSize={15} minSize={5} collapsible collapsedSize={0}>
      <DndContext onDragEnd={handleDragEnd}>
        <ResizablePanelGroup
          id={"left-panel"}
          autoSaveId={"left-panel"}
          direction="vertical"
        >
          <ResizablePanelSpacer />
          <ResizableHandle className="bg-transparent" />
          <ResizablePanel className="flex flex-col items-center justify-start gap-5">
            <DraggablePopover
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              position={position}
              trigger={<Button>Add Board</Button>}
              // TODO fix this. It works but is sketch because I may have dragging of boards later which would break this
              handleCancel={() => setBoards((prev) => prev?.slice(0, -1))}
            >
              <BoardForm />
            </DraggablePopover>
            <Button variant={"secondary"}>Create view</Button>
          </ResizablePanel>
          <ResizableHandle className="bg-transparent" />
          <ResizablePanelSpacer />
        </ResizablePanelGroup>
      </DndContext>
    </ResizablePanel>
  );
};

export const BoardForm = ({ defaultData }: { defaultData?: BoardSchema }) => {
  const {
    setBoards,
    nextBoardId,
    incrementNextAvailableId,
    saveBoardsLocally,
  } = useBoard();
  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: defaultData || {
      id: nextBoardId,
      title: "",
      description: "",
      notes: "",
    },
  });

  const onChange = (inputName: string, value: string) => {
    const newFormValues = {
      ...form.getValues(),
      [inputName]: value,
    } as BoardSchema;

    console.log("form: ", newFormValues);

    setBoards((prev) => {
      const copyPrev = prev ? [...prev] : undefined;
      if (!copyPrev) {
        return [newFormValues];
      }
      const foundId = copyPrev.findIndex((b) => b.id === form.getValues().id);
      if (foundId === -1) {
        return [...copyPrev, newFormValues];
      }
      copyPrev[foundId] = newFormValues;
      return copyPrev;
    });
  };

  const onSubmit = (values: z.infer<typeof boardSchema>) => {
    console.log(values);
    saveBoardsLocally();
    incrementNextAvailableId();
  };

  // const handleCancel = () => {
  //   const { id } = form.getValues();
  //   setBoards((prev) => prev?.filter((b) => b.id !== id));
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h1 className="text-lg">
            {defaultData ? `Editing ${defaultData.title} board` : "New board"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {defaultData
              ? "Mistakes happen :)"
              : "You can set up lanes and cards after creating the board"}
          </p>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="My Tasks..."
                  {...field}
                  onChange={(e) => {
                    onChange("title", e.currentTarget.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>The title for your board</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="all my things to do..."
                  {...field}
                  onChange={(e) => {
                    onChange("description", e.currentTarget.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                A short description under the title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Using this board to help myself keep track of my things I need to do..."
                  {...field}
                  onChange={(e) => {
                    onChange("notes", e.currentTarget.value);
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>markdown support coming soon!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-end gap-3">
          <PopoverClose
            type="reset"
            className={
              buttonVariants({ variant: "ghost" }) + " text-destructive"
            }
            onClick={() =>
              setBoards((prev) => {
                const copyPrev = prev ? [...prev] : undefined;
                const id = form.getValues().id;
                // console.log("attempting delete on: ", id);
                const arr = copyPrev?.filter((b) => b.id !== id);
                saveBoardsLocally(arr);
                return arr;
              })
            }
          >
            Delete
          </PopoverClose>
          {/* <PopoverClose
            type="reset"
            className={buttonVariants({ variant: "ghost" })}
            // onClick={handleCancel}
          >
            Cancel
          </PopoverClose> */}
          <PopoverClose
            type="submit"
            onClick={() => onSubmit(form.getValues())}
            className={buttonVariants({ variant: "default" })}
          >
            Done
          </PopoverClose>
        </div>
      </form>
    </Form>
  );
};

export const DraggablePopover = ({
  popoverOpen,
  setPopoverOpen,
  // handleCancel,
  position,
  trigger,
  children,
}: {
  popoverOpen: boolean;
  setPopoverOpen: (b: boolean) => void;
  handleCancel: () => void;
  position: { x: number; y: number };
  trigger?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      {trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
      <PopoverContent
        asChild
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onFocusOutside={(e) => e.preventDefault()}
        // onEscapeKeyDown={handleCancel}
      >
        <Draggable id={"add-board-button"} position={position}>
          {children}
        </Draggable>
      </PopoverContent>
    </Popover>
  );
};
