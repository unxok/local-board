import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResizablePanel } from "@/components/ui/resizable";
import { useBoard } from "@/stores/BoardStore";

export const MiddlePanel = () => {
  const { boards } = useBoard();

  return (
    <ResizablePanel className="relative">
      {boards
        ? boards.map((b) => (
            <Card key={b.id}>
              <CardHeader>
                <CardTitle>{b.title || "Unnamed Board"}</CardTitle>
                <CardDescription>{b.description || ""}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{b.notes || ""}</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          ))
        : "No boards yet... start with a template? (coming soon lol)"}
    </ResizablePanel>
  );
};
