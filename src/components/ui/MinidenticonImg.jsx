import { minidenticon } from "minidenticons";
import { useMemo } from "react";

/**
 * @param {{ userId: string, username: string, saturation: number, lightness: number }} props}
 */

export const MinidenticonImg = ({
  userId,
  username,
  saturation,
  lightness,
  ...props
}) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        minidenticon(userId, saturation ?? 90, lightness ?? 50)
      ),
    [username, saturation, lightness]
  );
  return <img src={svgURI} alt={username} {...props} />;
};

export function generateMinidenticonImg(userId) {
  return (
    "data:image/svg+xml;utf8," +
    encodeURIComponent(minidenticon(userId, 90, 50))
  );
}
