import { Draggable, usePosition } from "@/components/Draggable";
import { ResizablePanelSpacer } from "@/components/ResizablePanelSpacer";
import { Button } from "@/components/ui/button";
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
import { boardSchema, useBoard } from "@/stores/BoardStore";
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

export const LeftPanel = () => {
  const { handleDragEnd, position } = usePosition();
  const [popoverOpen, setPopoverOpen] = useState(false);
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

const BoardForm = () => {
  const { setBoards, nextAvailableId } = useBoard();
  const form = useForm<z.infer<typeof boardSchema>>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      id: nextAvailableId,
    },
  });

  // TODO it looks like it's not retaining previous boards here
  const onChange = (inputName: string, value: string) => {
    const newFormValues = {
      ...form.getValues(),
      [inputName]: value,
    };
    setBoards((prev) => prev);
    setBoards((prev) => {
      const copyPrev = prev.boards ? [...prev.boards] : undefined;
      if (!copyPrev) {
        return {
          ...prev,
          boards: [newFormValues],
        };
      }
      const foundId = copyPrev.findIndex((b) => b.id === nextAvailableId);
      if (foundId === -1) {
        return {
          ...prev,
          boards: [newFormValues],
        };
      }
      copyPrev[foundId] = newFormValues;
      return {
        prev,
        boards: copyPrev,
      };
    });
  };

  const onSubmit = (values: z.infer<typeof boardSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h1 className="text-lg">New board</h1>
          <p className="text-sm text-muted-foreground">
            You can set up lanes and cards after creating the board
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
          <Button type="reset" variant={"ghost"}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmit(form.getValues())}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const DraggablePopover = ({
  popoverOpen,
  setPopoverOpen,
  position,
  children,
}: {
  popoverOpen: boolean;
  setPopoverOpen: (b: boolean) => void;
  position: { x: number; y: number };
  children: ReactNode;
}) => (
  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
    <PopoverTrigger asChild>
      <Button>Add board</Button>
    </PopoverTrigger>
    <PopoverContent
      asChild
      onFocusOutside={(e) => e.preventDefault()}
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <Draggable id={"add-board-button"} position={position}>
        {children}
      </Draggable>
    </PopoverContent>
  </Popover>
);
