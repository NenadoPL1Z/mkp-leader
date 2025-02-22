import { View } from "react-native";
import Typography from "@app/ui/Typography";
import { styles } from "./styles.ts";
import type { CommentCardProps } from "./types.ts";

export const CommentCard = ({
  comments,
  isMy,
  created_at,
}: CommentCardProps) => {
  const date = new Date(created_at).toLocaleString();
  return (
    <View
      style={[styles.container, isMy ? styles.myComment : styles.otherComment]}>
      <View style={styles.comment}>
        <Typography variant="h4">{comments}</Typography>
      </View>
      <View style={styles.createdAt}>
        <Typography variant="h4">{date}</Typography>
      </View>
    </View>
  );
};
