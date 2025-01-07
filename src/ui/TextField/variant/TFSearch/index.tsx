import React, { forwardRef } from "react";
import TextField from "@app/ui/TextField";
import SearchIcon from "@app/assets/icons/dist/Search";
import { Colors } from "@app/theme/colors";
import type { TextFieldRef } from "@app/types/general";
import type { TextFieldProps } from "@app/ui/TextField/types";

type Props = TextFieldProps & { onClear: () => void };

const TFSearch = forwardRef<TextFieldRef, Props>((props, ref) => {
  return (
    <TextField
      variant="contained"
      left={{
        activeOpacity: 0,
        disabled: true,
        Icon: SearchIcon,
        iconProps: { color: Colors.GRAY_FIVE },
      }}
      {...props}
      ref={ref}
    />
  );
});

TFSearch.displayName = "TFSearch";

export default React.memo(TFSearch);
