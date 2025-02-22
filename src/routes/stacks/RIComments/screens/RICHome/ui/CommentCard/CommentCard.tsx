import { View } from "react-native";
import Typography from "@app/ui/Typography";
import AboutCard from "@app/components/AboutCard";
import { styles } from "./styles.ts";
import type { CommentCardProps } from "./types.ts";

export const CommentCard = ({
  comments,
  created_at,
  isMy,
}: CommentCardProps) => {
  const date = new Date(created_at).toLocaleString();
  const align = isMy ? styles.myComment : styles.otherComment;
  return (
    <View style={[styles.container, styles.shadow, align]}>
      <AboutCard
        title="test"
        subtitle="123"
        containerStyle={{ width: undefined }}
        isShadow={false}
        isPadding={false}
        avatar={{ name: "Test", phone: `+1` }}
      />
      <Typography
        style={styles.comment}
        fontSize={16}
        lineHeight={16}>
        {comments}
      </Typography>
      <Typography
        fontSize={12}
        lineHeight={12}>
        {date}
      </Typography>
    </View>
  );
};
