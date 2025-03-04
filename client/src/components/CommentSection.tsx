import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Comment } from "@shared/schema";

interface CommentSectionProps {
  cityId: number;
}

export function CommentSection({ cityId }: CommentSectionProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: [`/api/cities/${cityId}/comments`],
  });

  const mutation = useMutation({
    mutationFn: async (comment: { userName: string; content: string }) => {
      await apiRequest("POST", `/api/cities/${cityId}/comments`, comment);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      await mutation.mutateAsync({ userName: name, content });
      setContent("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="submit" disabled={mutation.isPending}>
            Post Comment
          </Button>
        </form>

        <div className="space-y-4">
          {isLoading ? (
            <p>Loading comments...</p>
          ) : (
            comments?.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <p className="font-semibold">{comment.userName}</p>
                <p className="text-sm text-gray-600">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
