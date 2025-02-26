import { View } from "react-native";
import Typography from "@app/ui/Typography";
import AboutCard from "@app/components/AboutCard";
import BadgeUI from "@app/ui/BadgeUI";
import { styles } from "./styles.ts";
import { getCommentAuthor } from "./helpers.ts";
import type { CommentCardProps } from "./types.ts";

export const CommentCard = (props: CommentCardProps) => {
  const { user_role, user_phone, comments, created_at } = props.comment;

  const { name, subtitle, avatarName } = getCommentAuthor(props);

  const localeDate = new Date(created_at).toLocaleString();
  return (
    <View style={[styles.container, styles.shadow]}>
      <AboutCard
        title={name}
        subtitle={subtitle}
        isShadow={false}
        isPadding={false}
        containerStyle={{
          alignItems: "flex-start",
        }}
        titleProps={{
          numberOfLines: 2,
          lineHeight: 18,
          style: { marginBottom: 5 },
        }}
        avatar={{
          name: avatarName,
          phone: user_phone,
          isDefault: user_role !== "executor",
        }}>
        <View style={styles.badge}>
          <BadgeUI count={props.count} />
        </View>
      </AboutCard>
      <Typography
        style={styles.comment}
        fontSize={16}
        lineHeight={16}>
        {comments}
      </Typography>
      <Typography
        fontSize={12}
        lineHeight={12}>
        {localeDate}
      </Typography>
    </View>
  );
};
