import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import type { Comment } from "@shared/schema";

interface CommentSectionProps {
  cityId: number;
}

export function CommentSection({ cityId }: CommentSectionProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: [`/api/cities/${cityId}/comments`],
  });

  const mutation = useMutation({
    mutationFn: async (comment: { userName: string; content: string }) => {
      await apiRequest("POST", `/api/cities/${cityId}/comments`, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/cities/${cityId}/comments`] });
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
    <Card className="bg-white/80 backdrop-blur-sm border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4 mb-8"
        >
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/50 border-gray-200"
          />
          <Textarea
            placeholder="Share your thoughts about this city..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-white/50 border-gray-200 min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {mutation.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </motion.form>

        <div className="space-y-6">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : (
            comments?.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">{comment.userName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt!).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}