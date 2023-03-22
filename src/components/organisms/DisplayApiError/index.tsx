type TProps = {
  error: TObject;
};
/**
 * DisplayApiError
 * @param error
 */
export default function DisplayApiError({ error }: TProps) {
  // TODO: Create UI for this common DisplayApiError
  if (!error) return null;
  return <h3>Some errors has occured!</h3>;
}
